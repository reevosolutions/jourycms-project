import {
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import colors from "colors";
import AuthServiceContainer from "./containers/auth/service-container";
import ContentServiceContainer from "./containers/content/service-container";
import StorageServiceContainer from "./containers/storage/service-container";
import ApiResponseError from "./exceptions/api-response.exception";
import HttpClient from "./http-client";
import {
  initSdk,
  LevelupClientAppApiCallHeaders,
  LevelupInternalAppApiCallHeaders,
} from "./init-sdk";
import JouryCMSSdkHelpers from "./utils/helpers";

colors.enable();

import SDK = Levelup.CMS.V1.SDK;
import SystemServiceContainer from "./containers/system/service-container";

export default class JouryCMSSdk implements SDK.ISdk {
  readonly httpClient: HttpClient;
  readonly config: SDK.ISdkConfig;
  private static instances: {
    [key: string]: JouryCMSSdk;
  } = {};
  private _requestCount = 0;
  protected serviceContainers: Partial<
    Record<
      Levelup.CMS.V1.Utils.SystemStructure.TMicroService | "insights",
      SDK.IServiceContainer
    >
  > = {};
  protected _helpersInstance: JouryCMSSdkHelpers;

  static getInstance(config: SDK.ISdkConfig, id: string = "DEFAULT") {
    if (!this.instances[id]) this.instances[id] = new JouryCMSSdk(config);
    return this.instances[id];
  }

  constructor(config: SDK.ISdkConfig) {
    this.config = config;
    this.httpClient = new HttpClient(this);
    this._helpersInstance = new JouryCMSSdkHelpers();
  }

  get auth() {
    if (!this.serviceContainers.auth)
      this.serviceContainers.auth = new AuthServiceContainer(this);
    return this.serviceContainers.auth as AuthServiceContainer;
  }

  get content() {
    if (!this.serviceContainers.content)
      this.serviceContainers.content = new ContentServiceContainer(this);
    return this.serviceContainers.content as ContentServiceContainer;
  }

  get storage() {
    if (!this.serviceContainers.storage)
      this.serviceContainers.storage = new StorageServiceContainer(this);
    return this.serviceContainers.storage as StorageServiceContainer;
  }

  get system() {
    if (!this.serviceContainers.system)
      this.serviceContainers.system = new SystemServiceContainer(this);
    return this.serviceContainers.system as SystemServiceContainer;
  }

  get helpers() {
    if (!this._helpersInstance) this._helpersInstance = new JouryCMSSdkHelpers();
    return this._helpersInstance;
  }
  /* -------------------------------------------------------------------------- */
  /*                                end PharmaDz                                */
  /* -------------------------------------------------------------------------- */

  generateHeadersFromRequestConfig(config?: SDK.TRequestConfig): {
    [key: string]: AxiosHeaderValue;
  } {
    const headers: { [key: string]: AxiosHeaderValue } = {};

    if (config?.serviceName) {
      headers["X-Service-Secret"] = config.serviceToken;
      headers["X-Service-Name"] = config.serviceName;
    }
    if (config?.token) headers["Authorization"] = `Bearer ${config.token}`;
    if (config?.app) headers["X-App-Id"] = config.app;
    if (config?.company) headers["X-Company-Id"] = config.company;
    if (config?.office) headers["X-Office-Id"] = config.office;
    if (config?.store) headers["X-Store-Id"] = config.store;
    if (config?.throw_not_found_error === false)
      headers["X-Throw-Not-Found-Error"] = "false";

    return headers;
  }

  async handleResponse<T extends SDK.IResponse>(
    response: AxiosResponse<T, any>
  ): Promise<SDK.TResponseDatum<T>> {
    this.logResponse(response);
    if (response.data?.error) {
      if (
        response.data.error.name === "JWTTokenExpired" &&
        this.config.refreshTokenHandler
      ) {
        // implement refresh token logic here
        console.log("SDK.REFRESHING TOKEN".magenta);
        await this.config.refreshTokenHandler(this);
        const newResponse = await this.httpClient.request(response.config);
        console.log("SDK.NEW RESPONSE", newResponse);
        return newResponse as SDK.TResponseDatum<T>;
      } else if (
        response.data?.error.status === 404 &&
        response.config?.headers["X-Throw-Not-Found-Error"] === "false"
      ) {
        return {
          data: response.data.data,
          edge: response.data.edge,
          pagination: response.data.pagination,
        } as SDK.TResponseDatum<T>;
      } else throw new ApiResponseError(response.data.error);
    }

    const result = {
      data: response.data.data,
      edge: response.data.edge,
      pagination: response.data.pagination,
    } as SDK.TResponseDatum<T>;

    return result;
  }

  handleError(error: any): SDK.IError {
    console.log(error.message?.red, error);
    if (this.isApiResponseError(error)) return error;
    if (isAxiosError(error)) {
      return new ApiResponseError({
        name: error.name,
        message: error.message,
        status: error.response?.status || 500,
        isAxios: true,
      });
    }
    return new Error(error);
  }

  isApiResponseError(error: any): error is ApiResponseError {
    return error instanceof ApiResponseError;
  }

  logResponse<T extends SDK.IResponse>(response: AxiosResponse<T, any>) {
    if (!this.config.debug) {
      return;
    }

    const config: AxiosRequestConfig & { meta?: { requestStartedAt: number } } =
      response.config;
    const statusLabel =
      response.status >= 500
        ? colors.red(`${response.status}`)
        : response.status >= 400
          ? colors.yellow(`${response.status}`)
          : colors.green(`${response.status}`);
    const dataLengthLabel = colors.gray(
      `${(
        (+response.headers?.["content-length"] ||
          +response.request?.responseText?.length ||
          0) / 1024
      ).toFixed(2)} Kb`
    );
    const fromCacheOrNetworkLabel =
      typeof window !== "undefined"
        ? response.request?.fromCache
          ? colors.yellow(`[CACHE]`)
          : colors.cyan(`[NETWORK]`)
        : "";
    const label = `${colors.gray("[API Response]")} ${colors.cyan(
      `${new Date().getTime() - (config.meta?.requestStartedAt || 0)}ms`
    )} ${statusLabel} ${dataLengthLabel} ${fromCacheOrNetworkLabel}`;

    let methodLabel = config.method?.toUpperCase();
    if (methodLabel === "GET") methodLabel = colors.magenta(methodLabel);
    if (methodLabel === "POST") methodLabel = colors.yellow(methodLabel);
    if (methodLabel === "PUT") methodLabel = colors.blue(methodLabel);
    if (methodLabel === "DELETE") methodLabel = colors.red(methodLabel);

    if (typeof window !== "undefined") {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      console.groupCollapsed(
        `SDK.${methodLabel} ${config.url?.replace("http://localhost:5100", "")}`
      );
      console.log(label, config.method?.toUpperCase(), config.url);

      if (config.method?.toLowerCase() === "get") {
        console.log(colors.cyan(`headers: %o`), config.headers);
        console.log(colors.cyan(`params: %o`), config.params);
        console.log(colors.cyan(`request: %o`), response.request);
        if (config.params?.filters) {
          console.log(colors.cyan(`filters: %o`), config.params?.filters);
        }
      } else {
        try {
          console.log(
            colors.cyan(`params: %o`),
            config.data ? JSON.parse(config.data) : null
          );
        } catch (error) {
          console.log(
            colors.cyan(`params: %o`),
            config.url?.includes("upload") ? "UPLOAD" : null
          );
        }
      }
      console.log(colors.cyan(`data: %o`), response.data);

      // Handle Auth errors
      if (response.data.error?.message) {
        console.log(
          colors.red(`axios response error: %s`),
          response.data.error.message
        );

        if (
          (response.data?.error?.message === "jwt expired" ||
            response.data?.error?.message === "User not found" ||
            response.data?.error?.message ===
            "No authorization token was found" ||
            response.data?.error?.message === "invalid signature") &&
          typeof window !== "undefined" &&
          !window.location.pathname.includes("auth")
        ) {
          window.localStorage.clear();
          // window.location.reload();
        }
      }
      console.groupEnd();
    } else {
      /**
       * Log response in nodejs
       */
      console.log("");
      console.log(
        `┌────────────────────────────────────────── start sdk log`.gray
      );
      console.log(colors.gray("├── "), label, methodLabel, config.url?.gray);

      console.log(colors.gray("│"));
      console.log(
        colors.gray("├── "),
        colors.cyan("Status"),
        response.status,
        response.statusText
      );
      console.log(
        colors.gray("├── "),
        colors.cyan("Request Headers"),
        config.headers
      );
      console.log(
        colors.gray("├── "),
        colors.cyan("Response Headers"),
        response.headers
      );
      if (config.method?.toLowerCase() === "get") {
        console.log(
          colors.gray("├── "),
          colors.cyan("Request Params"),
          config.params
        );
      } else {
        try {
          console.log(
            colors.gray("├── "),
            colors.cyan("Request Params"),
            config.data ? JSON.parse(config.data) : null
          );
        } catch (error) {
          console.log(
            colors.gray("├── "),
            colors.cyan("Request Params"),
            config.url?.includes("upload") ? "UPLOAD" : null
          );
        }
      }
      if (response.data?.error) {
        console.log(
          colors.gray("├── "),
          colors.red(`${response.status}: ${response.data?.error.message}`),
          response.data?.error
        );
      }
      console.log(
        `└────────────────────────────────────────── end sdk log`.gray
      );
      console.log("");
    }
    return response;
  }

  public reinitRequestCount() {
    this._requestCount = 0;
  }

  public incrementRequestCount() {
    this._requestCount++;
  }

  public getRequestCount() {
    return this._requestCount;
  }
}

export {
  ApiResponseError, initSdk,
  LevelupClientAppApiCallHeaders,
  LevelupInternalAppApiCallHeaders
};

