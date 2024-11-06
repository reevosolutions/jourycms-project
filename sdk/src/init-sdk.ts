import JouryCMSSdk from ".";

export type LevelupClientAppApiCallHeaders = Partial<{
  Authorization: string;
  'X-App-Id': string;
}>

export type LevelupInternalAppApiCallHeaders = Partial<{
  Authorization: string;
  'X-App-Id': string;
}> & {
  'X-Service-Secret': string;
  'X-Service-Name': string;
}




export function initSdk<Client extends 'backend' | 'frontend'>(client: Client, config: {
  baseURL: string;
  appId: string;
  appSecret: string;
  debug: boolean;
  headersInjector: Client extends 'frontend' ? () => LevelupClientAppApiCallHeaders | PromiseLike<LevelupClientAppApiCallHeaders> : () => LevelupInternalAppApiCallHeaders | PromiseLike<LevelupInternalAppApiCallHeaders>
  refreshTokenHandler?: (sdk: Levelup.CMS.V1.SDK.ISdk) => Promise<void>;
}, id: string = 'DEFAULT') {
  return JouryCMSSdk.getInstance({
    baseURL: config.baseURL,
    appId: config.appId,
    appSecret: config.appSecret,
    headers: config.headersInjector,
    refreshTokenHandler: config.refreshTokenHandler,
    debug: config.debug
  }, id);
}
