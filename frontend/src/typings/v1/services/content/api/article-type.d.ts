declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace ArticleTypes {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/article-types
             * @fires TypesService.create
             * @param {Levelup.CMS.V1.Api.ArticleTypes.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.ArticleType>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id
             * @fires TypesService.update
             * @param {Levelup.CMS.V1.Api.ArticleTypes.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.ArticleType>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id
             * @fires TypesService.delete
             * @param {Levelup.CMS.V1.Api.ArticleTypes.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Request = Utils.Api.Request.Build<never>;
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            One
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id
             * @fires TypesService.getById
             * @link http://gateway.com/cm/api/article-types/by-slug/:id
             * @fires TypesService.getBySlug
             * @param {Levelup.CMS.V1.Api.ArticleTypes.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<never>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires TypesService.List
             * @param {Levelup.CMS.V1.Api.ArticleTypes.List.Request} query
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.ArticleType>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.ArticleType>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            CreateCustomMetaField
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id/custom-meta-fields
             * @fires TypesService.createCustomMetaField
             * @param {Levelup.CMS.V1.Api.ArticleTypes.CreateCustomMetaField.Request} body
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.CreateCustomMetaField.Response}
             * @method POST
             *
             */
            export namespace CreateCustomMetaField {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.CustomMetaField>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdateCustomMetaField
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id/custom-meta-fields
             * @fires TypesService.updateCustomMetaField
             * @param {Levelup.CMS.V1.Api.ArticleTypes.UpdateCustomMetaField.Request} body
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.UpdateCustomMetaField.Response}
             * @method PUT
             *
             */
            export namespace UpdateCustomMetaField {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.CustomMetaField>;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            DeleteCustomMetaField
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/article-types/:id/custom-meta-fields
             * @fires TypesService.deleteCustomMetaField
             * @param {Levelup.CMS.V1.Api.ArticleTypes.DeleteCustomMetaField.Request} query
             * @returns {Levelup.CMS.V1.Api.ArticleTypes.DeleteCustomMetaField.Response}
             * @method DELETE
             *
             */
            export namespace DeleteCustomMetaField {
              export type Request = Utils.Api.Request.Build<{
                field_key: string;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ArticleType>;
            }
          }
        }
      }
    }
  }
}
