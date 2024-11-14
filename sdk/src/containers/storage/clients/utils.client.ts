import BaseClient from "../../../base.client";
import { ResponseType } from "axios";
import SDK = Levelup.CMS.V1.SDK;

import ApiAlias = Levelup.CMS.V1.Storage.Api.UploadedFiles;

export default class UtilsClient extends BaseClient {
  constructor(container: SDK.IServiceContainer) {
    super(container, "/utils");
  }

  // createDataBlob
  createDataBlob(data: any) {
    const content = JSON.stringify(data || null);
    const blob = new Blob([content], {
      type: "application/json;charset=utf-8",
    });

    return blob;
  }

  public getImageUrl(
    id: string,
    options?: {
      width?: number;
      height?: number;
      ratio?: "square" | "4/3" | "16/9" | "21/9";
    }
  ): string {
    let url = `${this.container.sdk.config.baseURL}${this.container.prefix}/images/${id}`;
    if (options?.width) url += `/${options?.width}`;
    if (options?.height) url += `/${options?.height}`;
    if (options?.ratio) url += `/?ratio=${options?.ratio}`;
    return url;
  }

  public getImageBlurredUrl(
    id: string,
    format?: 'jpg' | 'webp'
  ): string {
    let url = `${this.container.sdk.config.baseURL}${this.container.prefix}/images/${id}/blurred`;
    if (format) url += `/${format}`;
    return url;
  }

  public getFileUrl(id: string): string {
    const url = `${this.container.sdk.config.baseURL}${this.container.prefix}/files/${id}`;
    return url;
  }

  public async getStoredFileContent(
    id: string,
    config?: SDK.TRequestConfig,
    responseType: ResponseType = "json"
  ): Promise<any> {
    const url = this.getFileUrl(id);
    console.log("Loading file content from URL", {
      url,
    });
    return await this.container.sdk.httpClient.axios.get(url, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config),
      responseType,
    });
  }

  
}
