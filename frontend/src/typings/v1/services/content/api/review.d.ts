declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Reviews {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/reviews
             * @fires ReviewsService.create
             * @param {Levelup.CMS.V1.Api.Review.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Review.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Review>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Review>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/reviews/:id
             * @fires ReviewsService.update
             * @param {Levelup.CMS.V1.Api.Review.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Review.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Review>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Review>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/reviews/:id
             * @fires ReviewsService.delete
             * @param {Levelup.CMS.V1.Api.Review.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Review.Delete.Response}
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
             * @link http://gateway.com/cm/api/reviews/:id
             * @fires ReviewsService.getById
             * @link http://gateway.com/cm/api/reviews/by-slug/:id
             * @fires ReviewsService.getBySlug
             * @param {Levelup.CMS.V1.Api.Review.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Review.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Review>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires ReviewsService.List
             * @param {Levelup.CMS.V1.Api.Review.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Review.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Review> & {
                  scope?: Scope;
                };
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Review>;
            }
          }
        }
      }
    }
  }
}
