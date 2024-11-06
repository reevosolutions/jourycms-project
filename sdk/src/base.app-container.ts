import SDK = Levelup.CMS.V1.SDK;


export default class BaseAppContainer<TServiceName extends string>
  implements SDK.IAppContainer
{
  readonly sdk: SDK.ISdk;

  protected services: Partial<Record<TServiceName, SDK.IServiceContainer>> = {};

  constructor(sdk: SDK.ISdk) {
    this.sdk = sdk;
  }
}