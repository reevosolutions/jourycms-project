declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace FormEntries {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/form-entries
             * @fires FormEntriesService.create
             * @param {Levelup.CMS.V1.Api.FormEntries.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.FormEntries.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.FormEntry>;
              }>;
              export type Response<T extends Entity.FormEntry = Entity.FormEntry> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/form-entries/:id
             * @fires FormEntriesService.update
             * @param {Levelup.CMS.V1.Api.FormEntries.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.FormEntries.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.FormEntry>;
              }>;
              export type Response<T extends Entity.FormEntry = Entity.FormEntry> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/form-entries/:id
             * @fires FormEntriesService.delete
             * @param {Levelup.CMS.V1.Api.FormEntries.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.FormEntries.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            One
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/form-entries/:id
             * @fires FormEntriesService.getById
             * @link http://gateway.com/cm/api/form-entries/by-slug/:id
             * @fires FormEntriesService.getBySlug
             * @param {Levelup.CMS.V1.Api.FormEntries.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.FormEntries.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response<T extends Entity.FormEntry = Entity.FormEntry> =
                Utils.Api.Response.BuildSingleItemResponse<T, 'users' | 'forms'>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires FormEntriesService.List
             * @param {Levelup.CMS.V1.Api.FormEntries.List.Request} query
             * @returns {Levelup.CMS.V1.Api.FormEntries.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<
                  Entity.FormEntry 
                >;
              export type Response<T extends Entity.FormEntry = Entity.FormEntry> =
                Utils.Api.Response.BuildListResponse<T, 'users' | 'forms'>;
            }
            
            /**
             * --------------------------------------------------------------------------
             *                            aggregateByTypes
             * --------------------------------------------------------------------------
             * @link
             * @fires FormEntriesService.aggregateByTypes
             * @param {Levelup.CMS.V1.Api.FormEntries.AggregateByForms.Request} query
             * @returns {Levelup.CMS.V1.Api.FormEntries.AggregateByForms.Response}
             * @method GET
             *
             */
            export namespace AggregateByForms {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =Utils.Api.Response.BuildListResponse<{
                  form: string;
                  count: number;
                }, 
                'forms'
                >;
            }


            
          }
        }
      }
    }
  }
}
