declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Api {
          export namespace Tools {
            export namespace InitializeCompanyConfig {
              export interface Request {
                company_id: string;
              }

              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  company_id: string;
                  app: { _id: string; name: string } | null;
                  company: { _id: string; name: string } | null;
                  permission_group_count: number;
                  permission_count: number;
                  role_count: number;
                  created_permission_groups: number;
                  created_permissions: number;
                  created_roles: number;
                  owner_already_linked: boolean;
                  owner: Levelup.CMS.V1.Users.Entity.ExposedUser | null;
                  error: any;
                }>;
            }
          }
        }
      }
    }
  }
}
