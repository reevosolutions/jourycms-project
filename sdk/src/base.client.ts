import SDK = Levelup.CMS.V1.SDK;

export default class BaseClient implements SDK.IClient {
  protected readonly prefix: SDK.PathPrefix;
  protected readonly container: SDK.IServiceContainer;

  constructor(container: SDK.IServiceContainer, prefix: SDK.PathPrefix) {
    this.container = container;
    this.prefix = prefix;
  }

  protected generatePrefix(
    path: SDK.PathPrefix = "/",
    params: { [Param: string]: string | number } = {}
  ): string {
    let result = `${this.container.prefix}${this.prefix}${path}`;
    result = Object.keys(params).reduce(
      (acc, key) => acc.replace(`:${key}`, params[key].toString()),
      result
    );
    return result;
  }
}
