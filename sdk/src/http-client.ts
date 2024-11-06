import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import SDK = Levelup.CMS.V1.SDK;


type ExtendedAxiosRequestConfig = InternalAxiosRequestConfig & {
  meta: {
    requestStartedAt?: number;
    reqHeaders?: any;
  }
}
export default class HttpClient implements SDK.IHttpClient {
  readonly sdk: SDK.ISdk;
  readonly client: AxiosInstance;

  constructor(sdk: SDK.ISdk) {
    this.sdk = sdk;

    this.client = axios.create({
      baseURL: sdk.config.baseURL.endsWith('/') ? sdk.config.baseURL.slice(0, -1) : sdk.config.baseURL,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
      validateStatus: () => {
        return true;
        // return status >= 200 && status < 300; // default
      },

    });

    this.client.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {

      this.sdk.incrementRequestCount();
      /**
       * Load headers
       */
      const headers = await sdk.config.headers();
      for (let idx = 0; idx < Object.keys(headers).length; idx++) {
        const key = Object.keys(headers)[idx];
        config.headers[key] = headers[key];
      }

      /**
       * Add meta info
       */
      (config as ExtendedAxiosRequestConfig).meta = (config as ExtendedAxiosRequestConfig).meta || {};
      (config as ExtendedAxiosRequestConfig).meta.requestStartedAt = new Date().getTime();
      (config as ExtendedAxiosRequestConfig).meta.reqHeaders = config.headers;

      return config;

    }, (error) => {
      // Handle the error without logging it to the console
      if (error instanceof AxiosError) {
        // You can choose to handle specific status codes or other error properties here
        // For example, you might want to log errors to a logging service instead:
        // logErrorToService(error);
      }

      // You can still reject the error to let the calling code handle it if needed
      return Promise.reject(error);
    });
  }

  async get<T extends SDK.IResponse>(path: string, query: object = {}, config?: AxiosRequestConfig): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.get<T>(path, {
        ...config,
        params: query,
      });

      return await this.sdk.handleResponse(response, this.client.get, path, { ...config, params: query, });
    } catch (err) {
      throw this.sdk.handleError(err);
    }
  }

  async delete<T extends SDK.IResponse>(path: string, query: object = {}, config?: AxiosRequestConfig): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.delete<T>(path, {
        ...config,
        params: query
      });
      return await this.sdk.handleResponse(response, this.client.delete, path, { ...config, params: query });
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async head<T extends SDK.IResponse>(path: string, query: object = {}, config?: AxiosRequestConfig): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.head<T>(path, { ...config, params: query });
      return await this.sdk.handleResponse(response, this.client.head<T>, path, { ...config, params: query });
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async options<T extends SDK.IResponse>(path: string, query: object = {}, config?: AxiosRequestConfig): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.options<T>(path, {
        ...config,
        params: query
      });
      return await this.sdk.handleResponse(response, this.client.options<T>, path, { ...config, params: query });
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async post<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.post<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.post<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async put<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.put<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.put<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async patch<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.patch<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.patch<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async postForm<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.postForm<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.postForm<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async putForm<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.putForm<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.putForm<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  async patchForm<T extends SDK.IResponse, D = any>(path: string, data?: D, config?: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.patchForm<T>(path, data, config);
      return await this.sdk.handleResponse(response, this.client.patchForm<T>, path, data, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  // 
  async request<T extends SDK.IResponse, D = any>(config: AxiosRequestConfig<D>): Promise<SDK.TResponseDatum<T>> {
    try {
      const response = await this.client.request<T>(config);
      return await this.sdk.handleResponse(response, this.client.request<T>, config.url as string, config);
    } catch (error) {
      throw this.sdk.handleError(error);
    }
  }

  public get axios() {
    return this.client;
  }

}