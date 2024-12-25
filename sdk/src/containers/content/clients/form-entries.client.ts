import BaseClient from '../../../base.client';

import SDK = Levelup.CMS.V1.SDK;

import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;


export default class FormEntriesClient extends BaseClient {


  constructor(container: SDK.IServiceContainer) {
    super(container, '/form-entries');
  }

  // create
  async create<D extends { [Key: string]: any } = { [Key: string]: any }>(data: ApiAlias.Create.Request<D>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Create.Response<D>>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix(), data, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // update
  async update<D extends { [Key: string]: any } = { [Key: string]: any }>(id: string, data: ApiAlias.Update.Request<D>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Update.Response<D>>> {
    return await this.container.sdk.httpClient.put(this.generatePrefix("/:id", { id }), data, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // delete
  async delete(id: string, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Delete.Response>> {
    return await this.container.sdk.httpClient.delete(this.generatePrefix("/:id", { id }), {}, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // restore
  async restore(id: string, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Delete.Response>> {
    return await this.container.sdk.httpClient.delete(this.generatePrefix(`/${id}/restore`), {}, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // list
  async list<D extends { [Key: string]: any } = { [Key: string]: any }>(query: ApiAlias.List.Request<D>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.List.Response<D>>> {
    return await this.container.sdk.httpClient.get<ApiAlias.List.Response<D>>(this.generatePrefix(), query, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // getById
  async getById<D extends { [Key: string]: any } = { [Key: string]: any }>(id: string, params?: ApiAlias.GetOne.Request<D>, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response<D>>> {
    return await this.container.sdk.httpClient.get(this.generatePrefix("/:id", { id }), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  
  
  // aggregateByForms
  async aggregateByForms(
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.AggregateByForms.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix(`/aggregate-by-forms`),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }


}