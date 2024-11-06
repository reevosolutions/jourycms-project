import BaseClient from "../../../base.client";

import SDK = Levelup.CMS.V1.SDK;

import ApiAlias = Levelup.CMS.V1.Storage.Api.UploadedFiles;

export default class UploaderClient extends BaseClient {
  constructor(container: SDK.IServiceContainer) {
    super(container, "/upload");
  }


}
