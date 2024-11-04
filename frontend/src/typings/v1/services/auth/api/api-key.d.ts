declare module Levelup {
  namespace CMS {
  namespace V1 {
    namespace Auth {
      
      export namespace Api {

        export namespace ApiKeys {

          /**
           * -------------------------------------------------------------------------- 
           *                            Create                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.Create
           * @param {Levelup.V2.Auth.Api.ApiKeys.Create.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.Create.Response}
           * @method POST
           *
           */
          export namespace Create {
            export type Request = Utils.Api.Request.BuildCreateRequest<Entity.ApiKey>;
            export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.ApiKey>;
          }


          /**
           * -------------------------------------------------------------------------- 
           *                            Update                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.Update
           * @param {Levelup.V2.Auth.Api.ApiKeys.Update.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.Update.Response}
           * @method PUT
           *
           */
          export namespace Update {
            export type Request = Utils.Api.Request.BuildUpdateRequest<Entity.ApiKey>;
            export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.ApiKey>;
          }

          /**
           * -------------------------------------------------------------------------- 
           *                            Delete                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.Delete
           * @param {Levelup.V2.Auth.Api.ApiKeys.Delete.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.Delete.Response}
           * @method DELETE
           *
           */
          export namespace Delete {
            export type Response = Utils.Api.Response.DefaultDeleteResponse;
          }


          /**
           * -------------------------------------------------------------------------- 
           *                            BulkDelete                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.BulkDelete
           * @param {Levelup.V2.Auth.Api.ApiKeys.BulkDelete.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.BulkDelete.Response}
           * @method DELETE
           *
           */
          export namespace BulkDelete {
            export type Request = Utils.Api.Request.Build<{
              data: {
                id?: string[];
                tracking_id?: string[];
              }
            }>
            export type Response = Utils.Api.Response.DefaultDeleteResponse;
          }

          /**
           * -------------------------------------------------------------------------- 
           *                            GetOne                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.GetOne
           * @param {Levelup.V2.Auth.Api.ApiKeys.GetOne.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.GetOne.Response}
           * @method GET
           *
           */
          export namespace GetOne {
            type Scope = '';
            export type Request = Utils.Api.Request.Build<Record<string, unknown>>
            export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.ApiKey>
          }

          /**
           * -------------------------------------------------------------------------- 
           *                            List                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.List
           * @param {Levelup.V2.Auth.Api.ApiKeys.List.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.List.Response}
           * @method GET
           *
           */
          export namespace List {
            type Scope = 'listing' | 'ids' | 'trackings';

            export type Request = Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.ApiKey> & {
              scope?: Scope;
              filters?: {
                /**
                 * Here will be the custom filters
                 */
              };
            }
            export type Response = Utils.Api.Response.BuildListResponse<Entity.ApiKey>
          }

          /**
           * -------------------------------------------------------------------------- 
           *                            GetByToken                           
           * -------------------------------------------------------------------------- 
           * @link
           * @fires ApiKeysService.GetByToken
           * @param {Levelup.V2.Auth.Api.ApiKeys.GetByToken.Request} query
           * @returns {Levelup.V2.Auth.Api.ApiKeys.GetByToken.Response}
           * @method GET
           *
           */
          export namespace GetByToken {
            export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedApiKey>
          }

        }
      }
    }

  }
}
}

