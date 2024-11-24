import BaseClient from '../../../base.client';

import SDK = Levelup.CMS.V1.SDK;

import ApiAlias = Levelup.CMS.V1.Users.Api.Users;


export default class UsersClient extends BaseClient {
  constructor(container: SDK.IServiceContainer) {
    super(container, "/users");
  }

  // create
  async create(
    data: ApiAlias.Create.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Create.Response>> {
    return await this.container.sdk.httpClient.post(
      this.generatePrefix(),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // createStoreTeamMember
  async createStoreTeamMember(
    data: ApiAlias.Create.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Create.Response>> {
    return await this.container.sdk.httpClient.post(
      this.generatePrefix("/store-team-member"),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // update
  async update(
    id: string,
    data: ApiAlias.Update.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Update.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix("/:id", { id }),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // updateProfile
  async updateProfile(
    id: string,
    data: ApiAlias.UpdateProfile.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.UpdateProfile.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/profile/${id}`),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // updatePreferences
  async updatePreferences(
    id: string,
    data: ApiAlias.UpdatePreferences.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.UpdatePreferences.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/preferences/${id}`),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // delete
  async delete(
    id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Delete.Response>> {
    return await this.container.sdk.httpClient.delete(
      this.generatePrefix("/:id", { id }),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // restore
  async restore(
    id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Delete.Response>> {
    return await this.container.sdk.httpClient.delete(
      this.generatePrefix(`/${id}/restore`),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // bulkDelete
  async bulkDelete(
    data: ApiAlias.BulkDelete.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.BulkDelete.Response>> {
    return await this.container.sdk.httpClient.delete(
      this.generatePrefix(`/bulk-delete`),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // list
  async list(
    query: ApiAlias.List.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.List.Response>> {
    return await this.container.sdk.httpClient.get<ApiAlias.List.Response>(
      this.generatePrefix(),
      query,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // getById
  async getById(
    id: string,
    params?: ApiAlias.GetOne.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix("/:id", { id }),
      params,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // getByTrackingId
  async getByTrackingId(
    tracking_id: string,
    params?: ApiAlias.GetOne.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix("/by-tracking-id/:tracking_id", {tracking_id}),
      params,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // getByName
  async getByName(
    name: string,
    params?: ApiAlias.GetOne.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.GetOne.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix(`/by-name/${name}`),
      params,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }
  // aggregateByRoles
  async aggregateByRoles(
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.AggregateByRoles.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix(`/aggregate-by-roles`),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  async relateToCompany(
    id: string,
    company_id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Update.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/${id}/relate-to-company/${company_id}`),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  async relateToStore(
    id: string,
    store_id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Update.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/${id}/relate-to-store/${store_id}`),
      {},
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // listUserPermissions
  async listUserPermissions(
    id: string,
    params?: ApiAlias.ListUserPermissions.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.ListUserPermissions.Response>> {
    return await this.container.sdk.httpClient.get(
      this.generatePrefix(`/${id}/permissions`),
      params,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // changePermissions
  async changePermissions(
    id: string,
    data: ApiAlias.ChangePermissions.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.ChangePermissions.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/${id}/change-permissions`),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }

  // changePermissions
  async changeSuspendStatus(
    id: string,
    data?: ApiAlias.ChangeSuspendStatus.Request,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.ChangePermissions.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/${id}/change-suspend-status`),
      data,
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }
  // setLastManagedStore
  async setLastManagedStore(
    store_id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.SetLastManagedStore.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/me/set-last-managed-store`),
      {
        store_id,
      },
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }
  // setLastManagedOffice
  async setLastManagedOffice(
    store_id: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.SetLastManagedOffice.Response>> {
    return await this.container.sdk.httpClient.put(
      this.generatePrefix(`/me/set-last-managed-office`),
      {
        store_id,
      },
      {
        headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      }
    );
  }
}


