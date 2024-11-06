import SDK = Levelup.CMS.V1.SDK;


export default class BaseServiceContainer<TClientName extends string> implements SDK.IServiceContainer {

  readonly sdk: SDK.ISdk;
  readonly prefix: SDK.PathPrefix;

  protected clients: Partial<Record<TClientName, SDK.IClient>> = {};

  constructor(sdk: SDK.ISdk, prefix: SDK.PathPrefix) {
    this.sdk = sdk;
    this.prefix = prefix;
  }


}