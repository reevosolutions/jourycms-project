import { initSdk } from '@levelup-system/sdk';
import config from '../../../config';

console.log("config.http.sdk.baseURL", config.http.sdk.baseURL);

export const initLevelupSdk = () => initSdk('backend', {
  ...config.http.sdk,
  headersInjector: () => ({
    'X-Service-Secret': config.security.internalServiceSecret,
    'X-Service-Name': config.currentService.name || '',
  }),
})

