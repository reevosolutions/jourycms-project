/* eslint-disable @typescript-eslint/ban-types */
/**
 * @description This is the base service class
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 07:06:13
 */
import Joi from "joi";
import exceptions from "../exceptions";
import config from "../config";
import { errorToObject } from "../utilities/exceptions/index";
import initLogger from "../utilities/logging/index";
import { extractRequestSignificantData } from "./../utilities/requests/extract-request-significant-data";
import { MongoServerError } from "mongodb";
import treeify from "treeify";
import { initJouryCMSSdk } from "../utilities/data/sdk";
import say from "say";
import { generateProgressBar } from "../utilities/logging/output.utilities";
import { initTimer } from "../utilities/system/timer.utilities";
import Container from "typedi";
import AuthManager from "../managers/auth-manager";
import { countCharacterOccurrenceInString } from "../utilities/strings";
/**
 * This is the base service class
 */
export default class BaseService {
    constructor() {
        this.logger = initLogger("SERVICE", this.constructor.name);
    }
    /**
     * This method is used to log errors
     * @param {Function} method
     * @param {Error} error
     * @param {Levelup.CMS.V1.Security.AuthData} authData
     * @param {string} related_to
     * @param {any} scenario
     */
    logError(method, error, authData, related_to, scenario) {
        if (error instanceof Joi.ValidationError) {
            error = new exceptions.ValidationException("Validation Error", error);
        }
        if (process.env.NODE_ENV !== "production") {
            // console.log('Error in BaseService.logError:',
            //   error instanceof exceptions.LevelupException,
            //   error instanceof exceptions.BadRequestException,
            //   error instanceof exceptions.InternalServerError,
            // );
            if (error && error instanceof MongoServerError && error.code === 11000) {
                if (config.logging.log_duplicate_errors || method.name !== "create")
                    this.logger.error(`DUPLICATE Error in ${this.constructor.name}.${method.name}`, error);
            }
            else {
                this.logger.error(`Error in ${this.constructor.name}.${method.name}: ${error.message}`, error);
                scenario && console.log(treeify.asTree(scenario, true).yellow);
                if (error.message)
                    say.stop();
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
            payload: Object.assign({ error: errorToObject(error), scenario }, ((authData === null || authData === void 0 ? void 0 : authData.req)
                ? extractRequestSignificantData(authData === null || authData === void 0 ? void 0 : authData.req())
                : {})),
        });
        return;
    }
    /**
     * @description This method is used to log execution results
     * @param {Function} method
     * @param {Object} result
     * @param {Levelup.CMS.V1.Security.AuthData} auth_data
     * @param {any} scenario
     */
    async logExecutionResult(method, result, auth_data, scenario, is_error = false) {
        try {
            if (process.env.NODE_ENV !== "production") {
                if (is_error)
                    this.logger.error(`${this.constructor.name}.${method.name}`, `Error scenario:`);
                else
                    this.logger.success(`${this.constructor.name}.${method.name}`, `Successfull scenario:`);
                console.log(treeify.asTree(scenario, true).cyan);
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
        this._sdk = initJouryCMSSdk();
        return this._sdk;
    }
    flattenUpdateObject(updateObj) {
        function groupNestedProperties(updateObject) {
            const groupedObject = {};
            for (const key in updateObject) {
                const dotCount = countCharacterOccurrenceInString(key, ".");
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
                    name: config.currentService.name,
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
        var _a, _b, _c, _d, _e;
        if (!authData)
            return undefined;
        const authManager = Container.get(AuthManager);
        let token = (_a = authData.current) === null || _a === void 0 ? void 0 : _a.token;
        if (((_b = authData.current) === null || _b === void 0 ? void 0 : _b.user) && !((_c = authData.current) === null || _c === void 0 ? void 0 : _c.token)) {
            token = authManager.generateToken({
                role: authData.current.user.role,
                _id: authData.current.user._id,
                tracking_id: authData.current.user.tracking_id,
                space: "default",
            }, "default", false);
        }
        const config = {
            token,
            app: (_e = (_d = authData.current) === null || _d === void 0 ? void 0 : _d.app) === null || _e === void 0 ? void 0 : _e._id,
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
export class ExcecutionScenario {
    constructor(_class, logger, method, args = {}, authData = null) {
        this.execution = {};
        this._class = _class;
        this.logger = logger;
        this.method = method;
        this.args = args;
        this.authData = authData;
        this.timer = initTimer();
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
        logger.debug(generateProgressBar(progress), message || this.method);
    }
    /**
     * @description This method is used to log execution results
     * @param {Function} method
     * @param {Object} result
     * @param {Levelup.CMS.V1.Security.AuthData} auth_data
     * @param {any} scenario
     */
    async log(purpose = "success") {
        try {
            if (config.environement === "development") {
                if (purpose === "error")
                    this.logger.error(`${this._class}.${this.method}`, `Error scenario:`);
                else if (purpose === "warn")
                    this.logger.warn(`${this._class}.${this.method}`, `Warning scenario:`);
                else
                    this.logger.success(`${this._class}.${this.method}`, `Successfull scenario in ${this.timer.timeString}`);
                console.log(treeify.asTree({
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
            if (config.environement === "development") {
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
     * @param {Levelup.CMS.V1.Security.AuthData} authData
     * @param {string} related_to
     * @param {any} scenario
     */
    error(error) {
        var _a, _b;
        if (error instanceof Joi.ValidationError) {
            error = new exceptions.ValidationException("Validation Error", error);
        }
        if (config.environement === "development") {
            // console.log('Error in BaseService.logError:',
            //   error instanceof exceptions.LevelupException,
            //   error instanceof exceptions.BadRequestException,
            //   error instanceof exceptions.InternalServerError,
            // );
            if (error instanceof MongoServerError && error.code === 11000) {
                if (config.logging.log_duplicate_errors || this.method !== "create")
                    this.logger.error(`DUPLICATE Error in ${this._class}.${this.method}`, error);
            }
            else {
                this.logger.error(`Error in ${this._class}.${this.method}: ${error.message}`, error);
                console.log(treeify.asTree({ args: this.args, execution: this.execution }, true)
                    .yellow);
                if (error.message)
                    say.stop();
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
            payload: Object.assign({ error: errorToObject(error), scenario: this.execution }, (((_a = this.authData) === null || _a === void 0 ? void 0 : _a.req)
                ? extractRequestSignificantData((_b = this.authData) === null || _b === void 0 ? void 0 : _b.req())
                : {})),
        });
        return;
    }
}
//# sourceMappingURL=base.service.js.map