"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJouryCMSSdk = void 0;
const jourycms_sdk_1 = require("jourycms-sdk");
const config_1 = __importDefault(require("../../../config"));
console.log("config.http.sdk.baseURL", config_1.default.http.sdk.baseURL);
const initJouryCMSSdk = () => (0, jourycms_sdk_1.initSdk)('backend', Object.assign(Object.assign({}, config_1.default.http.sdk), { headersInjector: () => ({
        'X-Service-Secret': config_1.default.security.internalServiceSecret,
        'X-Service-Name': config_1.default.currentService.name || '',
    }) }));
exports.initJouryCMSSdk = initJouryCMSSdk;
//# sourceMappingURL=index.js.map