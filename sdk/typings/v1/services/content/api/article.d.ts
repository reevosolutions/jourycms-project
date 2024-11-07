declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Articles {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/articles
             * @fires ArticlesService.create
             * @param {Levelup.CMS.V1.Api.Articles.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Articles.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Article>;
              }>;
              export type Response<T extends Entity.Article = Entity.Article> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/articles/:id
             * @fires ArticlesService.update
             * @param {Levelup.CMS.V1.Api.Articles.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Articles.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.Build<{
                data: Partial<Entity.Article>;
              }>;
              export type Response<T extends Entity.Article = Entity.Article> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/articles/:id
             * @fires ArticlesService.delete
             * @param {Levelup.CMS.V1.Api.Articles.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Articles.Delete.Response}
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
             * @link http://gateway.com/cm/api/articles/:id
             * @fires ArticlesService.getById
             * @link http://gateway.com/cm/api/articles/by-slug/:id
             * @fires ArticlesService.getBySlug
             * @param {Levelup.CMS.V1.Api.Articles.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Articles.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response<T extends Entity.Article = Entity.Article> =
                Utils.Api.Response.BuildSingleItemResponse<T>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires ArticlesService.List
             * @param {Levelup.CMS.V1.Api.Articles.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Articles.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<
                  Entity.Article & {
                    tag: any;
                    tag_slug: any;
                    populate_linked_articles: Utils.Api.Request.TProjectableFields<Entity.Article>[] | boolean;
                  }
                >;
              export type Response<T extends Entity.Article = Entity.Article> =
                Utils.Api.Response.BuildListResponse<T, 'users'>;
            }
          }
        }
      }
    }
  }
}
