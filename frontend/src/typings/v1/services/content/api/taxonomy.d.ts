declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Api {
          export namespace Taxonomies {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link https://gateway.com/cm/api/taxonomy
             * @fires TaxonomyService.create
             * @param {Levelup.CMS.V1.Api.Taxonomies.Create.Request} body
             * @returns {Levelup.CMS.V1.Api.Taxonomies.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Utils.Api.Request.BuildCreateRequest<Entity.Taxonomy>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Taxonomy>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/taxonomy/:id
             * @fires TaxonomyService.update
             * @param {Levelup.CMS.V1.Api.Taxonomies.Update.Request} body
             * @returns {Levelup.CMS.V1.Api.Taxonomies.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Utils.Api.Request.BuildUpdateRequest<Entity.Taxonomy>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Taxonomy>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link http://gateway.com/cm/api/taxonomy/:id
             * @fires TaxonomyService.delete
             * @param {Levelup.CMS.V1.Api.Taxonomies.Delete.Request} query
             * @returns {Levelup.CMS.V1.Api.Taxonomies.Delete.Response}
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
             * @link http://gateway.com/cm/api/taxonomy/:id
             * @fires TaxonomyService.getById
             * @link http://gateway.com/cm/api/taxonomy/by-slug/:id
             * @fires TaxonomyService.getBySlug
             * @param {Levelup.CMS.V1.Api.Taxonomies.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Api.Taxonomies.GetOne.Response}
             * @method PUT
             *
             */
            export namespace GetOne {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Taxonomy>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires TaxonomyService.List
             * @param {Levelup.CMS.V1.Api.Taxonomies.List.Request} query
             * @returns {Levelup.CMS.V1.Api.Taxonomies.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = "listing" | "ids" | "trackings";

              export type Request =
                Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Taxonomy>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Taxonomy>;
            }
          }
        }
      }
    }
  }
}
