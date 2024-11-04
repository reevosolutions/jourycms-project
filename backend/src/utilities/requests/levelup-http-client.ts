import Axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import https from "https";
import { default as qs } from "qs";
import config from '../../config';
import initLogger from '../logging';


const logger = initLogger("APPLICATION", 'axios');

const levelupHttpClient = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    'X-Service-Secret': config.security.internalServiceSecret,
    'X-Service-Name': config.currentService.name || '',
  },
  validateStatus: (status) => true,
  paramsSerializer: (params: any) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});


// axios.interceptors.request.use((requestConfig: any) => {
//   requestConfig.headers['X-Service-Secret'] = config.levelup.security.internalServiceSecret;
//   requestConfig.headers['X-Service-Name'] = config.serviceName;
//   console.log(colors.cyan('HEADERS_BEFORE_SENDING_REQUEST'), requestConfig.url, requestConfig.method, requestConfig.headers);

//   return {
//     ...requestConfig,
//   };
// })

levelupHttpClient.interceptors.request.use((requestConfig: any) => {
  // logger.event('SENDING_REQUEST', requestConfig.url, requestConfig.method, requestConfig.headers);
  return requestConfig;
})

axiosRetry(levelupHttpClient, {
  retries: 3,
  retryDelay: (retryCount, error) => {
    return retryCount * 200
  },
});

export type { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse };

export default levelupHttpClient;
