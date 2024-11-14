"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorToObject = exports.generateErrorFromHttpException = void 0;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
const axios_1 = __importDefault(require("axios"));
const joi_1 = __importDefault(require("joi"));
/**
 * TODO: Implement this function
 * @param error
 * @param status number
 * @param statusText string
 * @returns Error
 */
const generateErrorFromHttpException = (error, status, statusText) => {
    return new Error(`Error: ${status} - ${statusText} - ${error.message}`);
};
exports.generateErrorFromHttpException = generateErrorFromHttpException;
const errorToObject = (error) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!error)
        return error;
    if (axios_1.default.isAxiosError(error)) {
        const status = error.status ? error.status : error.code || 500;
        const code = error.code;
        const message = error.message;
        const name = error.name;
        const headers = (_a = error.response) === null || _a === void 0 ? void 0 : _a.headers;
        const data = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
        const baseURL = (_c = error.config) === null || _c === void 0 ? void 0 : _c.baseURL;
        const url = (_d = error.config) === null || _d === void 0 ? void 0 : _d.url;
        const method = (_e = error.config) === null || _e === void 0 ? void 0 : _e.method;
        const params = (_f = error.config) === null || _f === void 0 ? void 0 : _f.params;
        const body = (_g = error.config) === null || _g === void 0 ? void 0 : _g.data;
        const stack = typeof error.stack === "string" ? error.stack.split("\n") : error.stack;
        return {
            is_axios: true,
            status,
            code,
            message,
            name,
            headers,
            data,
            baseURL,
            url,
            method,
            params,
            body,
            stack,
        };
    }
    else if (error instanceof joi_1.default.ValidationError) {
        return {
            name: error.name,
            message: error.message,
            status: 422,
            code: 422,
            is_joi: true,
            fields: error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = {
                    value: curr.context.value,
                    error: curr.message,
                };
                return acc;
            }, {}),
            stack: typeof error.stack === "string" ? error.stack.split("\n") : error.stack,
        };
    }
    else {
        const message = error.message;
        const stack = error.stack;
        return {
            is_joi: error.is_joi || undefined,
            is_mongoose: error.is_mongoose || undefined,
            is_celebrate: error.is_celebrate || undefined,
            name: error.name,
            message: message,
            status: error.status || 500,
            code: error.code,
            errors: error.errors,
            fields: error.fields,
            stack: typeof stack === "string" ? stack.split("\n") : stack,
        };
    }
};
exports.errorToObject = errorToObject;
//# sourceMappingURL=index.js.map