"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
const https_1 = __importDefault(require("https"));
const qs_1 = __importDefault(require("qs"));
const config_1 = __importDefault(require("../../config"));
const logging_1 = __importDefault(require("../logging"));
const logger = (0, logging_1.default)("APPLICATION", 'axios');
const levelupHttpClient = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false,
    }),
    headers: {
        'X-Service-Secret': config_1.default.security.internalServiceSecret,
        'X-Service-Name': config_1.default.currentService.name || '',
    },
    validateStatus: (status) => true,
    paramsSerializer: (params) => {
        return qs_1.default.stringify(params, { arrayFormat: 'repeat' });
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
levelupHttpClient.interceptors.request.use((requestConfig) => {
    // logger.event('SENDING_REQUEST', requestConfig.url, requestConfig.method, requestConfig.headers);
    return requestConfig;
});
(0, axios_retry_1.default)(levelupHttpClient, {
    retries: 3,
    retryDelay: (retryCount, error) => {
        return retryCount * 200;
    },
});
exports.default = levelupHttpClient;
//# sourceMappingURL=levelup-http-client.js.map