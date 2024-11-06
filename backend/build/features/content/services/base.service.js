"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcecutionScenario = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/**
 * @description This is the base service class
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 07:06:13
 */
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = __importDefault(require("../exceptions"));
const config_1 = __importDefault(require("../config"));
const index_1 = require("../utilities/exceptions/index");
const index_2 = __importDefault(require("../utilities/logging/index"));
const extract_request_significant_data_1 = require("./../utilities/requests/extract-request-significant-data");
const mongodb_1 = require("mongodb");
const treeify_1 = __importDefault(require("treeify"));
const sdk_1 = require("../utilities/data/sdk");
const say_1 = __importDefault(require("say"));
const output_utilities_1 = require("../utilities/logging/output.utilities");
const timer_utilities_1 = require("../utilities/system/timer.utilities");
const typedi_1 = __importDefault(require("typedi"));
const auth_manager_1 = __importDefault(require("../managers/auth-manager"));
const strings_1 = require("../utilities/strings");
/**
 * This is the base service class
 */
class BaseService {
    constructor() {
        this.logger = (0, index_2.default)("SERVICE", this.constructor.name);
    }
    /**
     * This method is used to log errors
     * @param {Function} method
     * @param {Error} error
     * @param {Levelup.V2.Security.AuthData} authData
     * @param {string} related_to
     * @param {any} scenario
     */
    logError(method, error, authData, related_to, scenario) {
        if (error instanceof joi_1.default.ValidationError) {
            error = new exceptions_1.default.ValidationException("Validation Error", error);
        }
        if (process.env.NODE_ENV !== "production") {
            // console.log('Error in BaseService.logError:',
            //   error instanceof exceptions.LevelupException,
            //   error instanceof exceptions.BadRequestException,
            //   error instanceof exceptions.InternalServerError,
            // );
            if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
                if (config_1.default.logging.log_duplicate_errors || method.name !== "create")
                    this.logger.error(`DUPLICATE Error in ${this.constructor.name}.${method.name}`, error);
            }
            else {
                this.logger.error(`Error in ${this.constructor.name}.${method.name}: ${error.message}`, error);
                scenario && console.log(treeify_1.default.asTree(scenario, true).yellow);
                if (error.message)
                    say_1.default.stop();
                // say.speak(
                //   `Service: ${config.currentService.name}, ${(error as any).message}`,
                //   "Karen",
                //   1,
                //   (err: string) => {
                //     if (err) {
                //       // this.logger.error("Error reading text:", err);
                //     }
                //   }
                // );
            }
        }
        this.logger.save.error({
            name: method.name.toSnakeCase(),
            related_to,
            payload: Object.assign({ error: (0, index_1.errorToObject)(error), scenario }, ((authData === null || authData === void 0 ? void 0 : authData.req)
                ? (0, extract_request_significant_data_1.extractRequestSignificantData)(authData === null || authData === void 0 ? void 0 : authData.req())
                : {})),
        });
        return;
    }
    /**
     * @description This method is used to log execution results
     * @param {Function} method
     * @param {Object} result
     * @param {Levelup.V2.Security.AuthData} auth_data
     * @param {any} scenario
     */
    async logExecutionResult(method, result, auth_data, scenario, is_error = false) {
        try {
            if (process.env.NODE_ENV !== "production") {
                if (is_error)
                    this.logger.error(`${this.constructor.name}.${method.name}`, `Error scenario:`);
                else
                    this.logger.success(`${this.constructor.name}.${method.name}`, `Successfull scenario:`);
                console.log(treeify_1.default.asTree(scenario, true).cyan);
            }
        }
        catch (error) {
            this.logger.error(`Error in ${this.constructor.name}.logExecutionResult:`, error);
        }
    }
    getPaginationOptions(count, page) {
        if (typeof count === "string")
            count = parseInt(count);
        // this.logger.debug(this.getPaginationOptions.name, count, typeof count);
        if (count === -1 || !count)
            return { skip: 0, take: 0 };
        const skip = ((page || 1) - 1) * count;
        const take = count;
        return { skip, take };
    }
    /**
     *
     * @param {"asc" | "desc"} sort
     * - @default "desc"
     * @param {string} sort_by
     * - @default
     *    - "created_at"  if prefer_update_date = false
     *    - "updated_at" if prefer_update_date = true
     * @param {boolean} prefer_update_date
     * - @default false
     * @returns
     */
    getSortOptions(sort, sort_by, prefer_update_date) {
        const sortOptions = {};
        sortOptions[sort_by ? sort_by : prefer_update_date ? "updated_at" : "created_at"] = sort === "asc" ? 1 : -1;
        return sortOptions;
    }
    getSelectFields(q, fields) {
        if (!fields)
            return q;
        if (typeof fields === "string" && fields.includes(","))
            fields = fields.split(",").map((f) => f.trim());
        else if (typeof fields === "string")
            fields = fields.split(",").map((f) => f.trim());
        else if (!Array.isArray(fields))
            return q;
        return q.select(fields.join(" "));
    }
    async analyzeMongodbQuery(q) {
        this.logger.info("ANALYZE_MONGODB_QUERY", q.explain());
    }
    get sdk() {
        if (this._sdk)
            return this._sdk;
        this._sdk = (0, sdk_1.initLevelupSdk)();
        return this._sdk;
    }
    flattenUpdateObject(updateObj) {
        function groupNestedProperties(updateObject) {
            const groupedObject = {};
            for (const key in updateObject) {
                const dotCount = (0, strings_1.countCharacterOccurrenceInString)(key, ".");
                // If the property has three dots, we group it under the first part
                if (dotCount === 3) {
                    const firstPart = key.split(".").slice(0, 3).join(".");
                    if (!groupedObject[firstPart]) {
                        groupedObject[firstPart] = {};
                    }
                    // Add the property to the corresponding grouped object
                    const secondPart = key.split(".").slice(3).join(".");
                    groupedObject[firstPart][secondPart] = updateObject[key];
                } // If the property has two dots, we group it under the first part
                else if (dotCount === 2) {
                    const firstPart = key.split(".").slice(0, 2).join(".");
                    if (!groupedObject[firstPart]) {
                        groupedObject[firstPart] = {};
                    }
                    // Add the property to the corresponding grouped object
                    const secondPart = key.split(".").slice(2).join(".");
                    groupedObject[firstPart][secondPart] = updateObject[key];
                }
                else {
                    // If no two dots, just copy the property as it is
                    groupedObject[key] = updateObject[key];
                }
            }
            return groupedObject;
        }
        const flattenObjectKeys = (obj, prefix = "") => Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + "." : "";
            if (obj[k] instanceof Object &&
                !Array.isArray(obj[k]) &&
                obj[k] !== null) {
                acc = Object.assign(Object.assign({}, acc), flattenObjectKeys(obj[k], pre + k));
            }
            else {
                acc[pre + k] = obj[k];
            }
            return acc;
        }, {});
        // return flattenObjectKeys(updateObj);
        return groupNestedProperties(groupNestedProperties(flattenObjectKeys(updateObj)));
    }
    /**
     * @description This method is used to get the internal authentication data
     * @author dr. Salmi <reevosolutions@gmail.com>
     * @since 23-05-2024 06:40:43
     */
    get internalAuthData() {
        const authData = {
            current: {
                service: {
                    name: config_1.default.currentService.name,
                    is_external: false,
                },
            },
        };
        return authData;
    }
    /**
     * Update : generateSdkRequestConfigFromAuthData
     * @description used to port the authentication credentials between the services
     * @author dr. Salmi <reevosolutions@gmail.com>
     * @since 23-05-2024 06:39:42
     */
    generateSdkRequestConfigFromAuthData(authData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (!authData)
            return undefined;
        const authManager = typedi_1.default.get(auth_manager_1.default);
        let token = (_a = authData.current) === null || _a === void 0 ? void 0 : _a.token;
        if (((_b = authData.current) === null || _b === void 0 ? void 0 : _b.user) && !((_c = authData.current) === null || _c === void 0 ? void 0 : _c.token)) {
            token = authManager.generateToken({
                role: authData.current.user.role,
                role_group: authData.current.user.role_group,
                permissions: authData.current.user.permissions,
                _id: authData.current.user._id,
                tracking_id: authData.current.user.tracking_id,
                space: "default",
            }, "default", false);
        }
        const config = {
            token,
            app: (_e = (_d = authData.current) === null || _d === void 0 ? void 0 : _d.app) === null || _e === void 0 ? void 0 : _e._id,
            company: (_g = (_f = authData.current) === null || _f === void 0 ? void 0 : _f.company) === null || _g === void 0 ? void 0 : _g._id,
            office: (_j = (_h = authData.current) === null || _h === void 0 ? void 0 : _h.office) === null || _j === void 0 ? void 0 : _j._id,
            store: (_l = (_k = authData.current) === null || _k === void 0 ? void 0 : _k.store) === null || _l === void 0 ? void 0 : _l._id,
        };
        return config;
    }
    dispatchEvent(eventName, payload) {
        if (this["eventDispatcher"] && this["eventDispatcher"].dispatch) {
            this["eventDispatcher"].dispatch(eventName, payload);
        }
        else
            this.logger.warn("EventDispatcher is not available");
    }
    initScenario(logger, method, args, authData) {
        return new ExcecutionScenario(this.constructor.name, logger, method.name, args || {}, authData || null);
    }
}
exports.default = BaseService;
class ExcecutionScenario {
    constructor(_class, logger, method, args = {}, authData = null) {
        this.execution = {};
        this._class = _class;
        this.logger = logger;
        this.method = method;
        this.args = args;
        this.authData = authData;
        this.timer = (0, timer_utilities_1.initTimer)();
    }
    set(key, value) {
        if (typeof key === "object") {
            Object.keys(key).forEach((k) => this.set(k, key[k]));
        }
        else
            this.execution[key] = value;
        return this;
    }
    get(key) {
        return this.execution[key];
    }
    progress(logger, progress, message) {
        logger.debug((0, output_utilities_1.generateProgressBar)(progress), message || this.method);
    }
    /**
     * @description This method is used to log execution results
     * @param {Function} method
     * @param {Object} result
     * @param {Levelup.V2.Security.AuthData} auth_data
     * @param {any} scenario
     */
    async log(purpose = "success") {
        try {
            if (config_1.default.environement === "development") {
                if (purpose === "error")
                    this.logger.error(`${this._class}.${this.method}`, `Error scenario:`);
                else if (purpose === "warn")
                    this.logger.warn(`${this._class}.${this.method}`, `Warning scenario:`);
                else
                    this.logger.success(`${this._class}.${this.method}`, `Successfull scenario in ${this.timer.timeString}`);
                console.log(treeify_1.default.asTree({
                    args: this.args,
                    execution: this.execution,
                    execution_time: this.timer.timeString,
                }, true).cyan);
            }
        }
        catch (error) {
            this.logger.error(`Error in ${this._class}.logExecutionResult:`, error);
        }
    }
    async end(purpose = "success") {
        return await this.log(purpose);
    }
    async step(logger, data) {
        try {
            if (config_1.default.environement === "development") {
                logger.value(`${this._class}.${this.method}.step at: ${this.timer.timeString}`, data);
            }
        }
        catch (error) {
            logger.error(`Error in ${this._class}.logExecutionResult:`, error);
        }
    }
    /**
     * This method is used to log errors
     * @param {Function} method
     * @param {Error} error
     * @param {Levelup.V2.Security.AuthData} authData
     * @param {string} related_to
     * @param {any} scenario
     */
    error(error) {
        var _a, _b;
        if (error instanceof joi_1.default.ValidationError) {
            error = new exceptions_1.default.ValidationException("Validation Error", error);
        }
        if (config_1.default.environement === "development") {
            // console.log('Error in BaseService.logError:',
            //   error instanceof exceptions.LevelupException,
            //   error instanceof exceptions.BadRequestException,
            //   error instanceof exceptions.InternalServerError,
            // );
            if (error instanceof mongodb_1.MongoServerError && error.code === 11000) {
                if (config_1.default.logging.log_duplicate_errors || this.method !== "create")
                    this.logger.error(`DUPLICATE Error in ${this._class}.${this.method}`, error);
            }
            else {
                this.logger.error(`Error in ${this._class}.${this.method}: ${error.message}`, error);
                console.log(treeify_1.default.asTree({ args: this.args, execution: this.execution }, true)
                    .yellow);
                if (error.message)
                    say_1.default.stop();
                // FIXME: Uncomment this
                // say.speak(
                //   `Service: ${config.currentService.name}, ${(error as any).message}`,
                //   "Karen",
                //   1,
                //   (err: string) => {
                //     if (err) {
                //       // this.logger.error("Error reading text:", err);
                //     }
                //   }
                // );
            }
        }
        this.logger.save.error({
            name: this.method.toSnakeCase(),
            payload: Object.assign({ error: (0, index_1.errorToObject)(error), scenario: this.execution }, (((_a = this.authData) === null || _a === void 0 ? void 0 : _a.req)
                ? (0, extract_request_significant_data_1.extractRequestSignificantData)((_b = this.authData) === null || _b === void 0 ? void 0 : _b.req())
                : {})),
        });
        return;
    }
}
exports.ExcecutionScenario = ExcecutionScenario;
//# sourceMappingURL=base.service.js.map