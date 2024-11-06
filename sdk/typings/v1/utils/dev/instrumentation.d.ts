declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        namespace Dev {
          namespace Instrumentation {
            type TEventName = "sleep" | "info" | "login" | TTaskName;
            type TStatus = "info" | "success" | "error" | "warn";

            interface IEvent {
              auth: {
                app: string; // name
                company: Levelup.CMS.V1.Utils.Entity.Snapshots.Accounts.Company | null;
                user: Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User | null;
                store: Levelup.CMS.V1.Utils.Entity.Snapshots.Accounts.Store | null;
                office: Levelup.CMS.V1.Utils.Entity.Snapshots.Logistics.Office | null;
              };
              date: Date;
              status: TStatus;
              event: TEventName;
              name: string;
              duration?: number; // in milliseconds
              entity?: Levelup.CMS.V1.SystemStructure.Services.Models.LevelupModels;
              description?: string;
              error?: boolean;
              /**
               * @param {boolean} fatal
               * - true: if the error is fatal and the scenario should stop
               * - false: if the error is not fatal and the scenario should continue
               */
              fatal?: boolean;
              meta?: {
                [key: string]: any;
              };
            }
          }
        }
      }
    }
  }
}
