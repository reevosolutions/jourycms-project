import initLogger from '../logging';
import Exporter, { ExportItemsConfig } from "./exporter";

type DataType = Partial<Levelup.V2.Accounts.Entity.Store>;

const logger = initLogger('UTILITY', 'export-stores');

/**
 * 
 * @param {Partial<Levelup.V2.Accounts.Entity.Store>} items
 * @description The used store properties are:
 * - '_id'
 * - 'tracking_id'
 * - 'company'
 * - 'createdAt'
 * - 'name'
 * - 'support_phones'
 * - 'address'
 * - 'assignments.seller_snapshots'
 * - 'settings.type'
 * - 'settings.is_assured'
 * - 'settings.dropping_state_shipping_fees_default'
 * - 'settings.services'
 * - 'deleted'
 * @param {ExportItemsConfig} config
 */
const exportStores = async (items: DataType[],
  { tLabel, tSystem, companies_map }: {
    tLabel: (string: string) => string,
    tSystem: (string: string) => string
  } & ExportItemsConfig
) => {

  try {
    const exporter = new Exporter();
    exporter.setWorksheet(tLabel("stores"), {
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
      | "name"
      | "company"
      | "created_at"
      | "support_phones"
      | "state"
      | "city"
      | "street_address"
      | "seller_name"
      | "seller_phones"
      | "store_type"
      | "service_delivery_enabled"
      | "is_dropping_state_shipping_fees_custom"
      | "service_callcenter_enabled"
      | "is_service_callcenter_fees_custom"
      | "service_warehouse_enabled"
      | "is_service_warehouse_fees_custom"
      | "is_deleted"
      ,
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
        name: {
          key: 'name',
          header: tLabel("Name") || "",
          width: 40,
        },
        company: {
          key: 'company',
          header: tLabel("Company") || "",
          width: 40,
        },
        created_at: {
          key: "created_at",
          header: tLabel("Created at") || "",
          width: 30,
        },
        support_phones: {
          key: "support_phones",
          header: tLabel("Support phones") || "",
          width: 30,
        },
        seller_name: {
          key: "seller_name",
          header: tLabel("Owner name") || "",
          width: 30,
        },
        seller_phones: {
          key: "seller_phones",
          header: tLabel("Owner phones") || "",
          width: 30,
        },
        state: {
          key: "state",
          header: tLabel("State") || "",
          width: 20,
        },
        city: {
          key: "city",
          header: tLabel("City") || "",
          width: 20,
        },
        street_address: {
          key: "street_address",
          header: tLabel("Address") || "",
          width: 50,
        },
        store_type: {
          key: "store_type",
          header: tLabel("Type") || "",
          width: 20,
        },
        service_delivery_enabled: {
          key: "service_delivery_enabled",
          header: tLabel("Delivery active") || "",
          width: 20,
        },
        is_dropping_state_shipping_fees_custom: {
          key: "is_dropping_state_shipping_fees_custom",
          header: tLabel("Has custom delivery pricing") || "",
          width: 20,
        },
        service_callcenter_enabled: {
          key: "service_callcenter_enabled",
          header: tLabel("Confirmation active") || "",
          width: 20,
        },
        is_service_callcenter_fees_custom: {
          key: "is_service_callcenter_fees_custom",
          header: tLabel("Has custom confirmation pricing") || "",
          width: 20,
        },
        service_warehouse_enabled: {
          key: "service_warehouse_enabled",
          header: tLabel("Warehousing active") || "",
          width: 20,
        },
        is_service_warehouse_fees_custom: {
          key: "is_service_warehouse_fees_custom",
          header: tLabel("Has custom warehousing pricing") || "",
          width: 20,
        },
        is_deleted: {
          key: "is_deleted",
          header: tLabel("Deleted") || "",
          width: 20,
        },
      },
      items,
      (store) => {
        return {
          tracking_id: store.tracking_id,
          name: store.name,
          company: companies_map && companies_map[store.company] ? companies_map[store.company].name : store.company,
          created_at: new Date(`${store.created_at}`),
          support_phones: store.support_phones?.join("; ") || "",
          state: store.address.state_name,
          city: store.address.city_name,
          street_address: store.address.street_address,
          seller_name: store.snapshots?.owner ? `${store.snapshots?.owner.family_name} ${store.snapshots?.owner.first_name}` : "",
          seller_phones: store.snapshots?.owner?.phones.join("; ") || "",
          store_type: tSystem(store.store_type),
          service_delivery_enabled: store.settings?.services?.delivery?.is_enabled ? tLabel("YES") : tLabel("NO"),
          is_dropping_state_shipping_fees_custom: store.settings?.services?.delivery.settings?.has_custom_pricing ? tLabel("YES") : tLabel("NO"),
          service_callcenter_enabled: store.settings?.services?.callcenter?.is_enabled ? tLabel("YES") : tLabel("NO"),
          is_service_callcenter_fees_custom: store.settings?.services?.callcenter?.is_enabled && store.settings?.services?.callcenter?.settings?.has_custom_pricing ? tLabel("YES") : tLabel("NO"),
          service_warehouse_enabled: store.settings?.services?.warehouse?.is_enabled ? tLabel("YES") : tLabel("NO"),
          is_service_warehouse_fees_custom: store.settings?.services?.warehouse?.is_enabled && store.settings?.services?.warehouse?.settings?.has_custom_pricing ? tLabel("YES") : tLabel("NO"),
          is_deleted: store.is_deleted ? tLabel("YES") : tLabel("NO"),
        };
      }
    );
    return exporter;
  } catch (error) {
    logger.error('export', error);
    throw error;
  }
};

export default exportStores;
