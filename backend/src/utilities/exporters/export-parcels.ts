import initLogger from "../logging";
import Exporter, { ExportItemsConfig } from "./exporter";

const logger = initLogger("UTILITY", "export-stores");

/**
 *
 * @param {Levelup.V2.Shipping.Entity.Parcel[]} items
 * The used parcel properties are:
 * tracking_id
 * order_tracking_id
 * import_tracking_id
 * type
 * shipment_type
 * shipment_at
 * assignements
 * starting_address
 * target_address
 * customer
 * expedition_date
 * createdAt
 * last_status
 * last_status_date
 * delivery_failure_date
 * products
 * fees
 * deliverer_snapshot
 * status_history
 *
 *
 * @param param1 { tLabel: TFunction, tSystem: TFunction}
 */

type DataType = Partial<Levelup.V2.Shipping.Entity.Parcel>;

const exportParcels = async (
  items: DataType[],
  {
    tLabel,
    tSystem,
  }: {
    tLabel: (string: string) => string;
    tSystem: (string: string) => string;
  } & ExportItemsConfig
) => {
  try {
    const exporter = new Exporter();
    exporter.setWorksheet(tLabel("parcels"), {
      // create a sheet with red tab colour
      properties: {
        tabColor: {
          argb: "FFC0000",
        },
      },
      // create a sheet with the first row and column frozen
      views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
      headerFooter: {
        differentFirst: true,
        firstHeader: "Test export",
        oddFooter: "Page &P of &N",
        evenFooter: "Page &P of &N",
      },
    });
    exporter.addData<
      | "tracking_id"
      | "order_tracking_id"
      | "import_tracking_id"
      | "type"
      | "desk"
      | "shipment_type"
      | "store"
      | "store_state"
      | "starting_state"
      | "created_at"
      | "expedition_date"
      | "last_status"
      | "last_status_date"
      | "delivered_failed_date"
      | "customer_name"
      | "customer_phones"
      | "customer_state"
      | "customer_city"
      | "customer_street_address"
      | "products"
      | "quantities"
      | "price"
      | "delivery_fees"
      | "free_shipping"
      | "net_to_recover_from_customer"
      | "tax_percentage"
      | "tax_return"
      | "tax_overweight"
      | "tax_warehouse"
      | "tax_callcenter"
      | "net_store"
      | "payment_status"
      | "deposit_tracking_id"
      | "collect_tracking_id"
      | "encasement_tracking_id"
      | "payment_tracking_id"
      | "last_deliverer"
      | "last_sac_tracking_id"
      | "last_sac_return_tracking_id"
      | "last_sac_return_seller_tracking_id",
      DataType
    >(
      {
        tracking_id: {
          key: "tracking_id",
          header: tLabel("Tracking Id") || "",
          width: 20,
          style: {
            font: { size: 12, bold: true },
            fill: {
              type: "pattern",
              pattern: "lightGray",
              bgColor: { argb: "FFEEEEEE" },
              fgColor: { argb: "FFDDDDDD" },
            },
          },
        },
        order_tracking_id: {
          key: "order_tracking_id",
          header: tLabel("Order") || "",
          width: 20,
          style: {
            font: { size: 12 },
          },
        },
        import_tracking_id: {
          key: "import_tracking_id",
          header: tLabel("Import") || "",
          width: 20,
          style: {
            font: { size: 12 },
          },
        },
        type: {
          key: "type",
          header: tLabel("Type") || "",
          width: 20,
        },
        desk: {
          key: "desk",
          header: tLabel("Stop-desk") || "",
        },
        shipment_type: {
          key: "shipment_type",
          header: tLabel("Shipment type") || "",
          width: 20,
        },
        store: {
          key: "store",
          header: tLabel("Store") || "",
          width: 40,
        },
        store_state: {
          key: "store_state",
          header: tLabel("Store state") || "",
          width: 20,
        },
        starting_state: {
          key: "starting_state",
          header: tLabel("Starting state") || "",
          width: 20,
        },

        created_at: {
          key: "created_at",
          header: tLabel("Created at") || "",
          width: 30,
        },
        expedition_date: {
          key: "expedition_date",
          header: tLabel("Shipped date") || "",
          width: 30,
        },
        last_status: {
          key: "last_status",
          header: tLabel("Last status") || "",
          width: 20,
          style: {
            font: {},
          },
        },
        last_status_date: {
          key: "last_status_date",
          header: tLabel("Last status date") || "",
          width: 30,
        },
        delivered_failed_date: {
          key: "delivered_failed_date",
          header: tLabel("Delivered/failed date") || "",
          width: 30,
        },
        customer_name: {
          key: "customer_name",
          header: tLabel("Customer name") || "",
          width: 40,
        },
        customer_phones: {
          key: "customer_phones",
          header: tLabel("Phone number") || "",
          width: 30,
        },
        customer_state: {
          key: "customer_state",
          header: tLabel("Customer state") || "",
          width: 20,
        },
        customer_city: {
          key: "customer_city",
          header: tLabel("Customer city") || "",
          width: 20,
        },
        customer_street_address: {
          key: "customer_street_address",
          header: tLabel("Customer address") || "",
          width: 50,
        },
        products: {
          key: "products",
          header: tLabel("Products") || "",
          width: 60,
        },
        quantities: {
          key: "quantities",
          header: tLabel("Quantities") || "",
        },
        price: {
          key: "price",
          header: tLabel("Price") || "",
        },
        delivery_fees: {
          key: "delivery_fees",
          header: tLabel("Delivery fees") || "",
        },
        free_shipping: {
          key: "free_shipping",
          header: tLabel("Free shipping") || "",
          width: 20,
        },
        net_to_recover_from_customer: {
          key: "net_to_recover_from_customer",
          header: tLabel("Net to recover from customer") || "",
        },
        tax_percentage: {
          key: "tax_percentage",
          header: tLabel("Tax percentage") || "",
        },
        tax_return: {
          key: "tax_return",
          header: tLabel("Tax return") || "",
        },
        tax_overweight: {
          key: "tax_overweight",
          header: tLabel("Tax overweight") || "",
        },
        tax_warehouse: {
          key: "tax_warehouse",
          header: tLabel("Tax warehouse") || "",
        },
        tax_callcenter: {
          key: "tax_callcenter",
          header: tLabel("Tax callcenter") || "",
        },
        net_store: {
          key: "net_store",
          header: tLabel("Net store") || "",
        },
        payment_status: {
          key: "payment_status",
          header: tLabel("Payment status") || "",
          width: 20,
        },
        deposit_tracking_id: {
          key: "deposit_tracking_id",
          header: tLabel("Deposit") || "",
          width: 20,
        },
        collect_tracking_id: {
          key: "collect_tracking_id",
          header: tLabel("Collect") || "",
          width: 20,
        },
        encasement_tracking_id: {
          key: "encasement_tracking_id",
          header: tLabel("Encasement") || "",
          width: 20,
        },
        payment_tracking_id: {
          key: "payment_tracking_id",
          header: tLabel("Payment") || "",
          width: 20,
        },

        last_deliverer: {
          key: "last_deliverer",
          header: tLabel("Last deliverer") || "",
          width: 30,
        },
        last_sac_tracking_id: {
          key: "last_sac_tracking_id",
          header: tLabel("Last sac") || "",
          width: 20,
        },
        last_sac_return_tracking_id: {
          key: "last_sac_return_tracking_id",
          header: tLabel("Last sac return") || "",
          width: 20,
        },
        last_sac_return_seller_tracking_id: {
          key: "last_sac_return_seller_tracking_id",
          header: tLabel("Last sac return seller") || "",
          width: 20,
        },
      },
      items,
      (parcel) => {
        let last_sac: string = "";
        let last_sac_return: string = "";
        let last_sac_seller: string = "";
        if (parcel.status_history instanceof Array) {
          parcel.status_history.forEach((status) => {
            if (status.sac) {
              if (status.status === "group_return")
                last_sac_seller = status.sac;
              else if (
                status.status === "return_to_center" ||
                status.status === "return_transfer"
              )
                last_sac_return = status.sac;
              else last_sac = status.sac;
            }
          });
        }
        // const amounts = calculateParcelAmounts(parcel as Levelup.V2.Shipping.Entity.Parcel);
        const amounts = parcel.fees;
        return {
          tracking_id: parcel.tracking_id,
          order_tracking_id: parcel.attributes.order_tracking_id || "",
          import_tracking_id: parcel.import_tracking_id || "",
          type: tSystem(parcel.type),
          desk: parcel.shipment_to === "desk" ? tLabel("YES") : "",
          shipment_type: parcel.shipment_type,
          store: parcel.snapshots?.store?.name || "",
          store_state: parcel.snapshots?.store?.address.state_name || "",
          starting_state: parcel.starting_address?.state_name || "",
          created_at: new Date(`${parcel.created_at}`),
          expedition_date: parcel.expedition_date
            ? new Date(`${parcel.expedition_date}`)
            : "",
          last_status: tSystem(parcel.last_status),
          last_status_date: new Date(`${parcel.last_status_date}`),
          delivered_failed_date: parcel.delivery_failure_date
            ? new Date(`${parcel.delivery_failure_date}`)
            : "",
          customer_name: `${parcel.customer.family_name || ""} ${
            parcel.customer.first_name || ""
          }`,
          customer_phones: parcel.customer.phones?.join("; ") || "",
          customer_state: parcel.customer.address.state_name,
          customer_city: parcel.customer.address.city_name,
          customer_street_address: parcel.customer.address.street_address,
          products: parcel.products.map((product) => product.name).join("; "),
          quantities: parcel.products
            .map((product) => product.quantity)
            .join("; "),
          // amounts
          price: parcel.fees.price,
          delivery_fees: parcel.fees.delivery_fees || 0,
          free_shipping: parcel.fees.is_free_shipping ? tLabel("YES") : "",
          net_to_recover_from_customer: amounts.net_to_recover_from_customer,
          tax_percentage: parcel.fees.tax_cod_percent || 0,
          tax_return: parcel.fees.return_fees,
          tax_overweight: parcel.fees.overweight_fees || 0,
          tax_warehouse:
            parcel.last_status === "delivered"
              ? parcel.fees.additional_services?.warehouse?.d || 0
              : parcel.fees.additional_services?.warehouse?.r || 0,
          tax_callcenter:
            parcel.last_status === "delivered"
              ? parcel.fees.additional_services?.callcenter?.d || 0
              : parcel.fees.additional_services?.callcenter?.r || 0,
          net_store: amounts.store_net_payable, // TODO add net store from deposit
          // payment
          payment_status: tSystem(parcel.fees.payment_status),
          deposit_tracking_id: parcel.fees.deposit_tracking_id || "",
          collect_tracking_id: parcel.fees.collect_tracking_id || "",
          encasement_tracking_id: parcel.fees.encasement_tracking_id || "",
          payment_tracking_id: parcel.fees.store_payment_tracking_id || "",
          last_deliverer: parcel.snapshots?.last_deliverer?._id
            ? `${parcel.snapshots?.last_deliverer.family_name} ${parcel.snapshots?.last_deliverer.first_name}`
            : "",
          last_sac_tracking_id: last_sac || "",
          last_sac_return_tracking_id: last_sac_return || "",
          last_sac_return_seller_tracking_id: last_sac_seller || "",
        };
      }
    );
    return exporter;
  } catch (error) {
    logger.error("export", error);
    throw error;
  }
};

export default exportParcels;
