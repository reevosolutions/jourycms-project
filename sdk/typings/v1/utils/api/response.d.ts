/**
 * @description project levelup
 */
declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {

        export namespace Api {
          export namespace Response {
            type ErrorObject = {
              is_axios?: boolean;
              is_joi?: boolean;
              is_mongoose?: boolean;
              is_celebrate?: boolean;
              name: string;
              message: string;
              status: number | string;
              code: number | string;
              headers?: any;
              params?: any;
              body?: any;
              data?: any;
              baseURL?: string;
              url?: string;
              method?: string;
              errors?: any;
              fields?: any;
              stack: string | string[];
            };

            type ErrorFields<F extends string | number | symbol = string> = {
              [key in F]?: {
                value: any;
                message: string;
                label?: string;
                meta?: any;
              };
            };
            type ErrorFieldsInObjectProperties<
              Obj extends object,
              F extends Levelup.CMS.V1.Utils.DocumentRootProperties<Obj>,
            > = {
                [key in F]?: {
                  value: any;
                  message: string;
                  label?: string;
                  meta?: any;
                };
              };

            type Error = {
              message: string;
              name: string;
              status: number;
              fields?: ErrorFields;
              stack?: string[];
              isAxios?: boolean;
            };

            type DefaultResponse = {
              error?: Error;
              request?: any;
              token?: string;
            };
            type PagedResponse = {
              pagination?: {
                total: number;
                pages: number;
              };
              links?: {
                self?: string;
                before?: string;
                next?: string;
              };
            };

            type TEdge<K extends keyof TResponseEdge> = {
              [P in K]-?: NonNullable<TResponseEdge[P]>;
            };

            type BuildSingleItemResponse<
              T,
              Edges extends keyof TResponseEdge = undefined,
            > = {
              data?: T;
              edge?: {
                [P in Edges]-?: NonNullable<TResponseEdge[P]>;
              };
            } & DefaultResponse;

            /**
             * @param T
             * @param Edges
             */
            type BuildListResponse<
              T,
              Edges extends keyof TResponseEdge = undefined,
            > = {
              data?: T[];
              edge?: {
                [P in Edges]-?: TResponseEdge[P];
              };
            } & PagedResponse &
              DefaultResponse;

            type DefaultDeleteResponse = {
              data?: {
                deleted?: boolean;
                restored?: boolean;
              };
            } & DefaultResponse;

            type DefaultBulkDeleteResponse = {
              data?: {
                [_id: string]: boolean;
              };
            } & DefaultResponse;

            type TResponseEdge = {
              users: {
                [ID: string]: Utils.Entity.Snapshots.Auth.User | null;
              };
              user: Utils.Entity.Snapshots.Auth.User | Users.Entity.User | null;
              article_types: {
                [ID: string]: Content.Entity.ArticleType | null;
              }
              forms: {
                [ID: string]: Content.Entity.Form | null;
              }
              linked_articles: {
                [ID: string]: Omit<Content.Entity.Article,
                  'body' |
                  'body_unformatted' |
                  'body_structured' |
                  'attributes' |
                  'snapshots' |
                  'insights'
                > | null;
              }

            };

            type BuildResponseEdge<K extends keyof TResponseEdge> = Pick<
              TResponseEdge,
              K
            >;

            type EdgedResponse<TRes, K extends keyof TResponseEdge> = TRes & {
              edge?: Pick<TResponseEdge, K>;
            };
          }
        }
      }
    }
  }
}
