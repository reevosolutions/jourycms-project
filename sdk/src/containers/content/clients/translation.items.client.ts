import BaseClient from '../../../base.client';

import SDK = Levelup.CMS.V1.SDK;

import ApiAlias = Levelup.CMS.V1.Content.Translation.Api.Items;


export default class TranslationItemsClient extends BaseClient {


  constructor(container: SDK.IServiceContainer) {
    super(container, '/translation/items');
  }

  // create
  async create(data: ApiAlias.Create.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Create.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix(), data, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // update
  async update(id: string, data: ApiAlias.Update.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Update.Response>> {
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

  // bulkDelete
  async bulkDelete(data: ApiAlias.BulkDelete.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.BulkDelete.Response>> {
    return await this.container.sdk.httpClient.delete(this.generatePrefix('/bulk-delete'), data, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // list
  async list(query: ApiAlias.List.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.List.Response>> {
    return await this.container.sdk.httpClient.get<ApiAlias.List.Response>(this.generatePrefix(), query, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // getById
  async getById(id: string, params?: ApiAlias.GetOne.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(this.generatePrefix("/:id", { id }), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // getByTrackingId
  async getByTrackingId(tracking_id: string, params?: ApiAlias.GetOne.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(this.generatePrefix("/by-tracking-id/:tracking_id", {tracking_id}), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  // getByName
  async getByName(name: string, params?: ApiAlias.GetOne.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(this.generatePrefix(`/by-name/${name}`), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

}