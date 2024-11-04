import Container from "typedi";
import initLogger, { LoggerContext } from "../logging";
import { defaults } from "./utils.helpers";
import SettingsManager from "../../managers/settings-manager";
import { PARCEL_STATUSES_GROUPED } from "../../constants/parcels.constants";

const logger = initLogger(LoggerContext.UTILITY, "calculators");

export const calculateClassicParcelReturnFees = ({
  delivery_fees,
  delivery_fees_payment_mode,
}: {
  delivery_fees: number;
  delivery_fees_payment_mode: Levelup.V2.Payment.Entity.TPaymentMode;
}) => {
  const result: {
    delivery_fees: number;
    delivery_fees_paid: boolean;
    return_fees: number;
    amount_to_collect: number;
  } = {
    delivery_fees: 0,
    delivery_fees_paid: true,
    return_fees: 0,
    amount_to_collect: 0,
  };

  result.delivery_fees = delivery_fees;
  result.delivery_fees_paid =
    delivery_fees_payment_mode === "prepaid" ? true : false;
  result.return_fees = result.delivery_fees * 0.5;
  result.return_fees = result.delivery_fees * 0; // update by Yassine
  result.amount_to_collect =
    result.return_fees + (result.delivery_fees_paid ? 0 : result.delivery_fees);

  return result;
};

export const calculateOverWeight = (params: {
  volume: { width: number; height: number; length: number };
  weight: number;
  maxFreeWeight: number;
  zone: number;
  unitPrice: number;
}) => {
  params = defaults(params, {
    volume: { width: 0, height: 0, length: 0 },
    weight: 0,
    maxFreeWeight: 5,
    zone: 0,
    unitPrice: 50,
  });
  const volumeWeight =
    params.volume.width * params.volume.height * params.volume.length * 0.0002;
  const overweight =
    params.weight > volumeWeight
      ? params.weight - params.maxFreeWeight
      : volumeWeight - params.maxFreeWeight;
  let result = overweight > 0 ? overweight * params.unitPrice : 0;
  if (params.zone >= 4) result = result * 2;
  return result;
};

export const calculateDeliveryFees = (params: {
  accountSettings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>;
  starting_state_code: Levelup.V2.Utils.Common.LocationAdministrativeCode;
  destination_state_code: Levelup.V2.Utils.Common.LocationAdministrativeCode;
  destination_city_code: Levelup.V2.Utils.Common.LocationAdministrativeCode;
  shipment_to: Levelup.V2.Shipping.Entity.TShipmentTo;
  shipment_type: Levelup.V2.Shipping.Entity.TShipmentType;
  account_type: Levelup.V2.Shipping.Entity.TParcelOwnerAccountType;
}) => {
  try {
    const {
      accountSettings,
      starting_state_code,
      destination_state_code,
      destination_city_code,
      shipment_to,
      shipment_type,
      account_type,
    } = params;

    const settingsManager = Container.get(SettingsManager);
    const { state_zone, city_zone } = settingsManager.getDeliveryZones({
      accountSettings,
      starting_state_code,
      destination_state_code,
      destination_city_code,
    });

    switch (account_type) {
      case "classic":
        return (
          (state_zone?.pricing.classic[shipment_to] || 0) +
          (city_zone?.pricing.classic[shipment_to] || 0)
        );
      case "ecommerce_enterprise":
        return (
          (state_zone?.pricing.enterprise[shipment_type][shipment_to] || 0) +
          (city_zone?.pricing.enterprise[shipment_type][shipment_to] || 0)
        );
      case "ecommerce_particular":
        return (
          (state_zone?.pricing.particular[shipment_type][shipment_to] || 0) +
          (city_zone?.pricing.particular[shipment_type][shipment_to] || 0)
        );
      case "b2b":
        return (
          (state_zone?.pricing.b2b[shipment_to] || 0) +
          (city_zone?.pricing.b2b[shipment_to] || 0)
        );
      case "internal":
        return 0;

      default:
        break;
    }
  } catch (error: any) {
    logger.error("calculateDeliveryFees", error.message, params, error);
    return undefined;
  }
};

export const calculateParcelNetToRecoverFromCustomer = (
  parcel: Partial<Levelup.V2.Shipping.Entity.Parcel>
) => {
  if (parcel.type === "internal") return 0;
  if (parcel.sub_type === "acknowledgement") return 0;
  if (parcel.sub_type === "exchange") return 0;
  const is_delivery_fees_recovered_from_customer =
    parcel.fees?.delivery_fees_payment_mode !== "prepaid" &&
    !parcel.fees?.is_free_shipping;

  const delivery_fees_to_recover_from_customer =
    is_delivery_fees_recovered_from_customer
      ? parcel.fees?.delivery_fees || 0
      : 0;
  const tax_overweight_to_recover_from_customer =
    parcel.fees?.overweight_fees_payment_mode === "by_customer"
      ? parcel.fees?.overweight_fees
      : 0;

  const net_to_recover =
    (parcel.type === "classic" ? 0 : parcel.fees?.price || 0) +
    delivery_fees_to_recover_from_customer +
    (tax_overweight_to_recover_from_customer || 0);

  return net_to_recover;
};


/**
 * Update : Added
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-06-2024 13:22:32
 */
export const calculateParcelStoreNetPayable = (
  parcel: Partial<Levelup.V2.Shipping.Entity.Parcel>
) => {
  if (parcel.type === "internal") return 0;
  if (parcel.type === "classic") return 0;
  if (parcel.sub_type === "acknowledgement") return 0;
  if (parcel.sub_type === "exchange") return 0;

  let store_net_payable = 0;

  const tax_overweight_to_recover_from_seller =
    parcel.fees?.overweight_fees_payment_mode === "by_seller"
      ? parcel.fees?.overweight_fees
      : 0;

  if (parcel.last_status === "delivered") {
    /* -------------------------------- DELIVERED ------------------------------- */
    store_net_payable =
      (parcel.fees?.price || 0) -
      (parcel.fees?.tax_assurance || 0) -
      tax_overweight_to_recover_from_seller;
    if (
      parcel.fees.is_free_shipping &&
      parcel.fees.delivery_fees_payment_mode !== "prepaid"
    ) {
      store_net_payable = store_net_payable - parcel.fees?.delivery_fees;
    }
  } else if (PARCEL_STATUSES_GROUPED.returned.includes(parcel.last_status)) {
    /* -------------------------------- RETURNED -------------------------------- */
    store_net_payable = 0 - parcel.fees?.return_fees;
  } else {
    /* ------------------------------- PROCESSING ------------------------------- */
    store_net_payable = 0;
  }

  /**
   * Return
   */
  return store_net_payable;
};
