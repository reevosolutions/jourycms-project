declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Terms {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/tags
             * @fires TagsService.create
             * @param {Levelup.CMS.V1.Api.Terms.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Terms.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Utils.Api.Request.BuildCreateRequest<Entity.Term>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Term>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/tags/:id
             * @fires TagsService.update
             * @param {Levelup.CMS.V1.Api.Terms.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Terms.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Utils.Api.Request.BuildUpdateRequest<Entity.Term>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Term>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/tags/:id
             * @fires TagsService.delete
             * @param {Levelup.CMS.V1.Api.Terms.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Terms.Delete.Response}
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
             * @link http://gateway.com/cm/api/tags/:id
             * @fires TagsService.getById
             * @link http://gateway.com/cm/api/tags/by-slug/:id
             * @fires TagsService.getBySlug
             * @param {Levelup.CMS.V1.Api.Terms.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Terms.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Term>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires TagsService.List
             * @param {Levelup.CMS.V1.Api.Terms.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Terms.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Term>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Term>;
            }
          }
        }
      }
    }
  }
}
