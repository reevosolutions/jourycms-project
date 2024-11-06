declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Comments {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/comments
             * @fires CommentsService.create
             * @param {Levelup.CMS.V1.Api.Comments.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Comments.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Comment>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Comment>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/comments/:id
             * @fires CommentsService.update
             * @param {Levelup.CMS.V1.Api.Comments.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Comments.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Comment>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Comment>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/comments/:id
             * @fires CommentsService.delete
             * @param {Levelup.CMS.V1.Api.Comments.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Comments.Delete.Response}
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
             * @link http://gateway.com/cm/api/comments/:id
             * @fires CommentsService.getById
             * @link http://gateway.com/cm/api/comments/by-slug/:id
             * @fires CommentsService.getBySlug
             * @param {Levelup.CMS.V1.Api.Comments.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Comments.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Comment>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires CommentsService.List
             * @param {Levelup.CMS.V1.Api.Comments.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Comments.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Comment> & {
                  scope?: Scope;
                };

              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Comment>;
            }
          }
        }
      }
    }
  }
}
