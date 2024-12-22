import BaseServiceContainer from '../../base.service-container';

/**
 * @description Typing aliasing
 */
import SDK = Levelup.CMS.V1.SDK;
type TClientName =
  '';
  

export default class CustomHandlerServiceContainer extends BaseServiceContainer<TClientName> {

  constructor(sdk: SDK.ISdk) {
    super(sdk, '/api/v1/custom');
  }

  
 protected generatePrefix(
    path: SDK.PathPrefix = "/",
    params: { [Param: string]: string | number } = {}
  ): string {
    let result = `${this.prefix}${path}`;
    result = Object.keys(params).reduce(
      (acc, key) => acc.replace(`:${key}`, params[key].toString()),
      result
    );
    return result;
  }
  
  // create
  async create(data: Levelup.CMS.V1.Utils.Api.Request.Build<{data: Record<string, any>}>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.BuildSingleItemResponse<any>>> {
    return await this.sdk.httpClient.post(this.generatePrefix(), data, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // update
  async update(id: string, data: Levelup.CMS.V1.Utils.Api.Request.Build<{data: Record<string, any>}>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.BuildSingleItemResponse<any>>> {
    return await this.sdk.httpClient.put(this.generatePrefix("/:id", { id }), data, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // delete
  async delete(id: string, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.DefaultDeleteResponse>> {
    return await this.sdk.httpClient.delete(this.generatePrefix("/:id", { id }), {}, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // restore
  async restore(id: string, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.DefaultDeleteResponse>> {
    return await this.sdk.httpClient.delete(this.generatePrefix(`/${id}/restore`), {}, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // list
  async list(query: Levelup.CMS.V1.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Record<string, any>>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.BuildListResponse<any>>> {
    return await this.sdk.httpClient.get<Levelup.CMS.V1.Utils.Api.Response.BuildListResponse<any>>(this.generatePrefix(), query, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }
  // getOne
  async getOne(query: Levelup.CMS.V1.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Record<string, any>>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<Levelup.CMS.V1.Utils.Api.Response.BuildSingleItemResponse<any>>> {
    return await this.sdk.httpClient.get(this.generatePrefix(), query, {
      headers: this.sdk.generateHeadersFromRequestConfig(config)
    });
  }





}
