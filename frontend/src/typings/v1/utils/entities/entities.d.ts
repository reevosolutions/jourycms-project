declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        namespace Entity {
          /* ------------------------ COMMON GENERAL INTERFACES ----------------------- */
          namespace General {
            type TImportStatus = "draft" | "imported" | "created";
            type ICreatable = {
              app?: Utils.Common.ID | null;
              company?: Utils.Common.ID | null;
              created_by?: Utils.Common.ID | null;
              created_by_original_user?: Snapshots.Auth.User | null;
              created_at?: Date;
              updated_at?: Date;
              is_deleted?: boolean;
              deleted_at?: Date | null;
              tags?: {
                [name: string]: any;
              };
              updates?: Utils.Entity.General.IItemUpdate[];
            };

            type IHasSearchMeta = {
              search_meta?: string;
            };

            interface IImported {
              import_status?: TImportStatus;
              import_id?: string;
              import_tracking_id?: string;
              import_index?: number;
            }

            interface IDeliverable {}

            interface IAttachment {
              _id: string;
              url: string;
              type: string;
            }

            interface IItemUpdate {
              updated_by_system?: boolean;
              updated_by: Snapshots.Auth.User | null;
              office: Snapshots.Logistics.Office | null;
              store: Snapshots.Accounts.Store | null;
              date: Date;
              action: string;
              updates: {
                field: string;
                old_value: unknown;
                new_value: unknown;
              }[];
            }

            interface IDateRangObject {
              start: string | Date;
              end: string | Date;
            }

            export type HasStartEnd = IDateRangObject;
          }
        }
      }
    }
  }
}
