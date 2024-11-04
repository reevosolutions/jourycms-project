declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        namespace Dev {
          namespace Instrumentation {
            type Instrumentation = {
              concurrency: number;
              /**
               * Sleep time in milliseconds
               */
              sleep: {
                min: number;
                max: number;
              };

              accelerate?:
                | {
                    min: number;
                    max: number;
                  }
                | (() => {
                    min: number;
                    max: number;
                  });

              store?: Common.TrackingID;
              user?: Common.TrackingID;
              disabled_tasks?: TTaskName[];
            };

            type Conditions = {
              service?: System.Entity.TService;
              disabled?: boolean;
              auth?: {
                company?: boolean;
                office?: boolean;
                store?: boolean;
              };
              compound?: {
                operator: "AND" | "OR";
                conditions: (Conditions & { compound: never })[];
              };
            };

            type Weight = {
              min: number;
              max: number;
            };

            type Task<Extend extends object = Record<string, any>> = {
              conditions?: Conditions;
              weight: Weight;
            } & Extend;

            type UsersTasks =
              | ({ name: "users.list" } & Task)
              | ({ name: "users.create" } & Task<{
                  role?: Auth.Entity.TDefaultUserRoles;
                  name_from_role_and_office?: boolean;
                }>);
            type StoresTasks =
              | ({ name: "stores.list" } & Task)
              | ({ name: "stores.create" } & Task<{
                  owner?: string;
                }>);

            type ProductsTasks =
              | ({ name: "products.list" } & Task)
              | ({ name: "products.create" } & Task);

            type OrdersTasks =
              | ({ name: "orders.list" } & Task)
              | ({ name: "orders.create" } & Task)
              | ({ name: "orders.changeStatus" } & Task<{
                  status: Orders.Entity.TOrderStatus | "RANDOM";
                }>);

            type ParcelsTasks =
              | ({ name: "parcels.list" } & Task)
              | ({ name: "parcels.create" } & Task)
              | ({ name: "parcels.changeStatus" } & Task<{
                  status: Shipping.Entity.TParcelStatus | "RANDOM";
                }>);

            type SacsTasks =
              | ({ name: "sacs.list" } & Task)
              | ({ name: "sacs.create" } & Task)
              | ({ name: "sacs.changeStatus" } & Task<{
                  status: Shipping.Entity.TSacStatus | "RANDOM";
                }>);

            type TTaskName =
              // users
              | "users.list"
              | "users.create"
              // stores
              | "stores.list"
              | "stores.create"
              // products
              | "products.list"
              | "products.create"
              // orders
              | "orders.list"
              | "orders.create"
              | "orders.changeStatus"
              // parcels
              | "parcels.list"
              | "parcels.create"
              | "parcels.changeStatus"
              // sacs
              | "sacs.list"
              | "sacs.create"
              | "sacs.changeStatus";

            type AnyTask =
              | UsersTasks
              | StoresTasks
              | ProductsTasks
              | SacsTasks
              | ParcelsTasks
              | OrdersTasks;

            type Tasks = AnyTask[];

            type Config = {
              instrumentation: Instrumentation;
              tasks: Tasks;
            };
          }
        }
      }
    }
  }
}
