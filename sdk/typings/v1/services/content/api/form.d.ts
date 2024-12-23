declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Forms {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/forms
             * @fires FormsService.create
             * @param {Levelup.CMS.V1.Api.Forms.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Forms.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Form>;
              }>;
              export type Response<T extends Entity.Form = Entity.Form> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/forms/:id
             * @fires FormsService.update
             * @param {Levelup.CMS.V1.Api.Forms.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Forms.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Form>;
              }>;
              export type Response<T extends Entity.Form = Entity.Form> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/forms/:id
             * @fires FormsService.delete
             * @param {Levelup.CMS.V1.Api.Forms.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Forms.Delete.Response}
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
             * @link http://gateway.com/cm/api/forms/:id
             * @fires FormsService.getById
             * @link http://gateway.com/cm/api/forms/by-slug/:id
             * @fires FormsService.getBySlug
             * @param {Levelup.CMS.V1.Api.Forms.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Forms.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response<T extends Entity.Form = Entity.Form> =
                Utils.Api.Response.BuildSingleItemResponse<T, 'users'>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires FormsService.List
             * @param {Levelup.CMS.V1.Api.Forms.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Forms.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<
                  Entity.Form
                >;
              export type Response<T extends Entity.Form = Entity.Form> =
                Utils.Api.Response.BuildListResponse<T, 'users'>;
            }
            
            
            
          }
        }
      }
    }
  }
}
