import BaseServiceContainer from '../../base.service-container';
import { AxiosProgressEvent } from 'axios';


/**
 * @description Typing aliasing
 */
import SDK = Levelup.CMS.V1.SDK;
type TClientName =
  'uploader' |
  'utils' |
  'uploadedFiles';

import ApiAlias = Levelup.CMS.V1.Storage.Api
import UploadedFilesClient from './clients/files.client';
import UtilsClient from './clients/utils.client';
export default class StorageServiceContainer extends BaseServiceContainer<TClientName> {
  constructor(sdk: SDK.ISdk) {
    super(sdk, "/api/v1/storage");
  }

  async upload(
    file: any,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
    name?: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.Upload.Response>> {
    const formData = new FormData();
    formData.append("files", file, name);
    return await this.sdk.httpClient.post(`${this.prefix}/upload`, formData, {
      headers: {
        ...(this.sdk.generateHeadersFromRequestConfig(config) || {}),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
 
  async loadRemoteFile(
    url: string,
    config?: SDK.TRequestConfig
  ): Promise<SDK.TResponseDatum<ApiAlias.LoadRemote.Response>> {
    return await this.sdk.httpClient.post(
      `${this.prefix}/upload/load-remote`,
      {data: {url}},
      {
        headers: {
          ...(this.sdk.generateHeadersFromRequestConfig(config) || {}),
        },
      }
    );
  }

  /**
   * @deprecated use utils.getImageUrl instead
   */
  public getImageUrl(
    id: string,
    options?: {
      width?: number;
      height?: number;
      ratio?: "square" | "4/3" | "16/9" | "21/9";
    }
  ): string {
    let url = `${this.sdk.config.baseURL}${this.prefix}/images/${id}`;
    if (options?.width) url += `/${options?.width}`;
    if (options?.height) url += `/${options?.height}`;
    if (options?.ratio) url += `/?ratio=${options?.ratio}`;
    // console.log('STORAGE IMAGE URL', url)
    return url;
  }

  /**
   * @deprecated use utils.getFileUrl instead
   */
  public getFileUrl(id: string): string {
    const url = `${this.sdk.config.baseURL}${this.prefix}/files/${id}`;
    return url;
  }

  get uploadedFiles() {
    if (!this.clients.uploadedFiles)
      this.clients.uploadedFiles = new UploadedFilesClient(this);
    return this.clients.uploadedFiles as UploadedFilesClient;
  }

  get utils() {
    if (!this.clients.utils) this.clients.utils = new UtilsClient(this);
    return this.clients.utils as UtilsClient;
  }
}
