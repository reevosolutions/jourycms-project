import {
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";


declare global {
  namespace Levelup {

    namespace CMS {
      namespace V1 {

        namespace SDK {

          interface ISdk {
            generateHeadersFromRequestConfig(config?: TRequestConfig): { [key: string]: AxiosHeaderValue; }

            handleError(err: any): IError;
            // eslint-disable-next-line @typescript-eslint/ban-types
            handleResponse<T extends SDK.IResponse>(response: AxiosResponse<T, any>, callback: Function, path: string, ...args: any[]): Promise<SDK.TResponseDatum<T>>;
            reinitRequestCount(): void;
            incrementRequestCount(): void;
            getRequestCount(): number
            readonly httpClient: IHttpClient;
            readonly config: ISdkConfig;
          }

          interface ISdkConfig {
            baseURL: string;
            appId: string;
            appSecret: string;
            logResponses?: boolean;
            env?: TEnvironment;
            headers: () => { [key: string]: string } | PromiseLike<{ [key: string]: string }>;
            refreshTokenHandler?: (sdk: ISdk) => Promise<void>;
            debug: boolean;
          }

          type TRequestConfig = {
            token?: string;
            app?: string;
            company?: string;
            office?: string;
            store?: string;
          } & ({
            serviceName: string;
            serviceToken: string;
          } | {
            serviceName?: never;
            serviceToken?: never;
          }) & {
            throw_not_found_error?: boolean;
          };

          type TSdkEvent = 'request' | 'response' | 'error' | 'reinit' | 'refresh-token' | 'jwt-token-expired';
          type TSdkEventPayload<Event extends TSdkEvent> = Event extends 'request' ? Levelup.CMS.V1.Utils.Api.Request.Request
          : Event extends 'response' ? { data?: object | Array<object>; } & Levelup.CMS.V1.Utils.Api.Response.DefaultResponse & Levelup.CMS.V1.Utils.Api.Response.PagedResponse
          : Event extends 'error' ? Levelup.CMS.V1.Utils.Api.Response.Error
          : Event extends 'reinit' ? never
          : Event extends 'refresh-token' ? never
          : Event extends 'jwt-token-expired' ? never
          : never;

          type TSdkEventHandler<Event extends TSdkEvent> = Event extends 'request' ? (data: TSdkEventPayload<Event>) => void | PromiseLike<void>
          : Event extends 'response' ? (data: TSdkEventPayload<Event>) => void | PromiseLike<void>
          : Event extends 'error' ? (error:TSdkEventPayload<Event>) => void | PromiseLike<void>
          : Event extends 'reinit' ? () => void | PromiseLike<void>
          : Event extends 'refresh-token' ? () => void | PromiseLike<void>
          : Event extends 'jwt-token-expired' ? () => void | PromiseLike<void>
          : never;

          interface IAppContainer {
            readonly sdk: ISdk;
          }

          interface IServiceContainer {
            readonly sdk: ISdk;
            readonly prefix: string;
          }

          interface IClient {
            // readonly prefix: string;
          }

          type TEnvironment = "production" | "development";
          type PathPrefix = '' | `/${string}`;

          type TResponseDatum<T extends { data?: object | Array<object>; } & Levelup.CMS.V1.Utils.Api.Response.DefaultResponse & Levelup.CMS.V1.Utils.Api.Response.PagedResponse> =
            Levelup.CMS.V1.Utils.NonUndefined<T['data']> extends Array<any> ? {
              data: Levelup.CMS.V1.Utils.NonUndefined<T['data']>;
              edge: Levelup.CMS.V1.Utils.NonUndefined<T['edge']>;
              pagination?: Levelup.CMS.V1.Utils.NonUndefined<Levelup.CMS.V1.Utils.Api.Response.PagedResponse['pagination']>;
            } : {
              data: Levelup.CMS.V1.Utils.NonUndefined<T['data']>;
              edge: Levelup.CMS.V1.Utils.NonUndefined<T['edge']>;
            };

          type IResponse = {
            data?: any;
            edge?: any;
            error?: Levelup.CMS.V1.Utils.Api.Response.Error;
          } & Levelup.CMS.V1.Utils.Api.Response.PagedResponse;

          type IError = Error & object;

          interface IHttpClient {
            get axios(): AxiosInstance;
            request<T extends IResponse, D = any>(
              config: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            get<T extends IResponse, D = any>(
              path: string,
              query?: object,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            delete<T extends SDK.IResponse, D = any>(
              path: string,
              query?: object,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            head<T extends SDK.IResponse>(
              path: string,
              query: object
            ): Promise<SDK.TResponseDatum<T>>;
            options<T extends SDK.IResponse>(
              path: string,
              query: object
            ): Promise<SDK.TResponseDatum<T>>;
            post<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            put<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            patch<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            postForm<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            putForm<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
            patchForm<T extends SDK.IResponse, D = any>(
              path: string,
              data?: D,
              config?: AxiosRequestConfig<D>
            ): Promise<SDK.TResponseDatum<T>>;
          }
        }
      }
    }
}
}

type TResponseDatum<T extends { data?: object | Array<object>; }> = {
  data: T['data'];
  edge: T['edge'];
  pagination: T['data'] extends Array ? boolean : never;

};