/* eslint-disable @typescript-eslint/ban-types */
/**
 * @description This is the base service class
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 07:06:13
 */
import Joi from "joi";
import mongoose from "mongoose";
import exceptions from "../exceptions";
import config from "../config";
import { errorToObject } from "../utilities/exceptions/index";
import initLogger, {
  LoggerContext,
  LoggerService,
} from "../utilities/logging/index";
import { extractRequestSignificantData } from "./../utilities/requests/extract-request-significant-data";
import { MongoServerError } from "mongodb";
import treeify from "treeify";
import { initJouryCMSSdk } from "../utilities/data/sdk";
import JouryCMSSdk from "jourycms-sdk";
import say from "say";
import { generateProgressBar } from "../utilities/logging/output.utilities";
import { initTimer, Timer } from "../utilities/system/timer.utilities";
import Container from "typedi";
import AuthManager from "../managers/auth-manager";
import { countCharacterOccurrenceInString } from "../utilities/strings";

/**
 * This is the base service class
 */
export default class BaseService {
  protected logger: LoggerService;
  protected _sdk: JouryCMSSdk;

  public constructor() {
    this.logger = initLogger(LoggerContext.SERVICE, this.constructor.name);
  }

  /**
   * This method is used to log errors
   * @param {Function} method
   * @param {Error} error
   * @param {Levelup.CMS.V1.Security.AuthData} authData
   * @param {string} related_to
   * @param {any} scenario
   */
  public logError(
    method: Function,
    error: typeof exceptions.LevelupException | Joi.ValidationError | Error,
    authData?: Levelup.CMS.V1.Security.AuthData | null,
    related_to?: string,
    scenario?: any
  ): void {
    if (error instanceof Joi.ValidationError) {
      error = new exceptions.ValidationException("Validation Error", error);
    }
    if (process.env.NODE_ENV !== "production") {
      // console.log('Error in BaseService.logError:',
      //   error instanceof exceptions.LevelupException,
      //   error instanceof exceptions.BadRequestException,
      //   error instanceof exceptions.InternalServerError,
      // );

      if (
        error &&
        error instanceof MongoServerError &&
        (error as any).code === 11000
      ) {
        if (config.logging.log_duplicate_errors || method.name !== "create")
          this.logger.error(
            `DUPLICATE Error in ${this.constructor.name}.${method.name}`,
            error
          );
      } else {
        this.logger.error(
          `Error in ${this.constructor.name}.${method.name}: ${
            (error as any).message
          }`,
          error
        );
        scenario && console.log(treeify.asTree(scenario, true).yellow);

        if ((error as any).message) say.stop();
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
      payload: {
        error: errorToObject(error),
        scenario,
        ...(authData?.req
          ? extractRequestSignificantData(authData?.req())
          : {}),
      },
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
  public async logExecutionResult(
    method: Function,
    result: any,
    auth_data?: Levelup.CMS.V1.Security.AuthData,
    scenario?: any,
    is_error: boolean = false
  ) {
    try {
      if (process.env.NODE_ENV !== "production") {
        if (is_error)
          this.logger.error(
            `${this.constructor.name}.${method.name}`,
            `Error scenario:`
          );
        else
          this.logger.success(
            `${this.constructor.name}.${method.name}`,
            `Successfull scenario:`
          );
        console.log(treeify.asTree(scenario, true).cyan);
      }
    } catch (error) {
      this.logger.error(
        `Error in ${this.constructor.name}.logExecutionResult:`,
        error
      );
    }
  }

  public getPaginationOptions(
    count: number,
    page: number
  ): { skip: number; take: number } {
    if (typeof count === "string") count = parseInt(count);
    // this.logger.debug(this.getPaginationOptions.name, count, typeof count);
    if (count === -1 || !count) return { skip: 0, take: 0 };
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
  public getSortOptions(
    sort: "asc" | "desc",
    sort_by?: string,
    prefer_update_date?: boolean
  ): {
    [key: string]: 1 | -1;
  } {
    const sortOptions: {
      [key: string]: 1 | -1;
    } = {};
    sortOptions[
      sort_by ? sort_by : prefer_update_date ? "updated_at" : "created_at"
    ] = sort === "asc" ? 1 : -1;
    return sortOptions;
  }

  public getSelectFields<Q extends mongoose.Query<any[], any>>(
    q: Q,
    fields?: string | string[]
  ): Q {
    if (!fields) return q;
    if (typeof fields === "string" && fields.includes(","))
      fields = fields.split(",").map((f) => f.trim());
    else if (typeof fields === "string")
      fields = fields.split(",").map((f) => f.trim());
    else if (!Array.isArray(fields)) return q;

    return q.select(fields.join(" ")) as Q;
  }

  public async analyzeMongodbQuery(q: mongoose.QueryWithFuzzySearch<any>) {
    this.logger.info("ANALYZE_MONGODB_QUERY", q.explain());
  }

  public get sdk() {
    if (this._sdk) return this._sdk;
    this._sdk = initJouryCMSSdk();
    return this._sdk;
  }

  public flattenUpdateObject(
    updateObj: Record<string, any>
  ): Record<string, any> {
    function groupNestedProperties(updateObject: { [key: string]: any }): {
      [key: string]: any;
    } {
      const groupedObject: { [key: string]: any } = {};

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
        } else {
          // If no two dots, just copy the property as it is
          groupedObject[key] = updateObject[key];
        }
      }

      return groupedObject;
    }

    const flattenObjectKeys = (obj: Record<string, any>, prefix: string = "") =>
      Object.keys(obj).reduce(
        (acc: Record<string, any>, k) => {
          const pre = prefix.length ? prefix + "." : "";
          if (
            obj[k] instanceof Object &&
            !Array.isArray(obj[k]) &&
            obj[k] !== null
          ) {
            acc = { ...acc, ...flattenObjectKeys(obj[k], pre + k) };
          } else {
            acc[pre + k] = obj[k];
          }
          return acc;
        },
        {} as Record<string, any>
      );

    // return flattenObjectKeys(updateObj);
    return groupNestedProperties(
      groupNestedProperties(flattenObjectKeys(updateObj))
    );
  }

  /**
   * @description This method is used to get the internal authentication data
   * @author dr. Salmi <reevosolutions@gmail.com>
   * @since 23-05-2024 06:40:43
   */
  public get internalAuthData(): {
    current: {
      service: {
        name: Levelup.CMS.V1.Utils.SystemStructure.TMicroService;
        is_external: boolean;
      };
    };
  } {
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
  public generateSdkRequestConfigFromAuthData(
    authData: Levelup.CMS.V1.Security.AuthData
  ): Levelup.CMS.V1.SDK.TRequestConfig | undefined {
    if (!authData) return undefined;

    const authManager = Container.get(AuthManager);
    let token = authData.current?.token;
    if (authData.current?.user && !authData.current?.token) {
      token = authManager.generateToken(
        {
          role: authData.current.user.role,
          _id: authData.current.user._id,
          tracking_id: authData.current.user.tracking_id,
          space: "default",
        },
        "default",
        false
      );
    }
    const config: Levelup.CMS.V1.SDK.TRequestConfig = {
      token,
      app: authData.current?.app?._id,
    };
    return config;
  }

  public dispatchEvent<T = any>(eventName: string, payload: T) {
    if (this["eventDispatcher"] && this["eventDispatcher"].dispatch) {
      this["eventDispatcher"].dispatch(eventName, payload);
    } else this.logger.warn("EventDispatcher is not available");
  }

  protected initScenario<
    T extends {
      [Key: string]: any;
    },
    F extends Function,
    Args extends Record<string, any> = {},
  >(
    logger: LoggerService,
    method: F,
    args?: Args,
    authData?: Levelup.CMS.V1.Security.AuthData
  ) {
    return new ExcecutionScenario<T>(
      this.constructor.name,
      logger,
      method.name,
      args || {},
      authData || null
    );
  }
}

export class ExcecutionScenario<
  T extends {
    [Key: string]: any;
  } = {},
> implements Levelup.CMS.V1.Lib.ExecutionScenario.Scenario<T>
{
  public _class: string;
  public method: string;
  public args: Record<string, any>;
  public authData: Levelup.CMS.V1.Security.AuthData;
  public execution: T = {} as T;
  private timer: Timer;
  private logger: LoggerService;

  public constructor(
    _class: string,
    logger: LoggerService,
    method: string,
    args: Record<string, any> = {},
    authData: Levelup.CMS.V1.Security.AuthData | null = null
  ) {
    this._class = _class;
    this.logger = logger;
    this.method = method;
    this.args = args;
    this.authData = authData;
    this.timer = initTimer();
  }

  public set<
    K extends
      | string
      | {
          [Key: string]: any;
        } = string,
  >(key: K, value?: K extends string ? any : never) {
    if (typeof key === "object") {
      Object.keys(key).forEach((k) => this.set(k, key[k]));
    } else (this.execution as any)[key] = value;
    return this;
  }

  public get(key: string) {
    return (this.execution as any)[key];
  }

  public progress(logger: LoggerService, progress: number, message: string) {
    logger.debug(generateProgressBar(progress), message || this.method);
  }

  /**
   * @description This method is used to log execution results
   * @param {Function} method
   * @param {Object} result
   * @param {Levelup.CMS.V1.Security.AuthData} auth_data
   * @param {any} scenario
   */
  public async log(purpose: "error" | "success" | "warn" = "success") {
    try {
      if (config.isDev || config.dev.debugProduction) {
        if (purpose === "error")
          this.logger.error(`${this._class}.${this.method}`, `Error scenario:`);
        else if (purpose === "warn")
          this.logger.warn(
            `${this._class}.${this.method}`,
            `Warning scenario:`
          );
        else
          this.logger.success(
            `${this._class}.${this.method}`,
            `Successfull scenario in ${this.timer.timeString}`
          );
        console.log(
          treeify.asTree(
            {
              args: this.args,
              execution: this.execution,
              execution_time: this.timer.timeString,
            },
            true
          ).cyan
        );
      }
    } catch (error) {
      this.logger.error(`Error in ${this._class}.logExecutionResult:`, error);
    }
  }

  public async end(purpose: "error" | "success" | "warn" = "success") {
    return await this.log(purpose);
  }

  public async step(logger: LoggerService, data: any) {
    try {
      if (config.environement === "development") {
        logger.value(
          `${this._class}.${this.method}.step at: ${this.timer.timeString}`,
          data
        );
      }
    } catch (error) {
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
  public error(
    error: typeof exceptions.LevelupException | Joi.ValidationError | Error
  ): void {
    if (error instanceof Joi.ValidationError) {
      error = new exceptions.ValidationException("Validation Error", error);
    }
    if (config.environement === "development") {
      // console.log('Error in BaseService.logError:',
      //   error instanceof exceptions.LevelupException,
      //   error instanceof exceptions.BadRequestException,
      //   error instanceof exceptions.InternalServerError,
      // );

      if (error instanceof MongoServerError && (error as any).code === 11000) {
        if (config.logging.log_duplicate_errors || this.method !== "create")
          this.logger.error(
            `DUPLICATE Error in ${this._class}.${this.method}`,
            error
          );
      } else {
        this.logger.error(
          `Error in ${this._class}.${this.method}: ${(error as any).message}`,
          error
        );
        console.log(
          treeify.asTree({ args: this.args, execution: this.execution }, true)
            .yellow
        );

        if ((error as any).message) say.stop();
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
      payload: {
        error: errorToObject(error),
        scenario: this.execution,
        ...(this.authData?.req
          ? extractRequestSignificantData(this.authData?.req())
          : {}),
      },
    });

    return;
  }
}
