/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */

import colors from "colors";
import moment from "moment";
import treeify, { TreeObject } from "treeify";
colors.enable();

// if (window) (window as any).treeify = treeify.asTree;
/**
 * Represents a logger service.
 */
export class LoggerService {
  private context: Levelup.CMS.V1.Lib.Logger.InstanceContext;
  private config: Levelup.CMS.V1.Lib.Logger.InstanceConfig;
  private contextId: string;
  private static muted: {
    [context in Levelup.CMS.V1.Lib.Logger.InstanceContext]: {
      [contextId: string]: boolean;
    };
  } = {
    APPLICATION: {},
    SUBSCRIBER: {},
    BROKER: {},
    MIDDLEWARE: {},
    MAPPER: {},
    VALIDATOR: {},
    SANITIZER: {},
    UTILITY: {},
    SEED: {},
    COMPONENT: {},
    SERVICE: {},
    CONTROLLER: {},
    LOADER: {},
    MODEL: {},
    HOOK: {},
    PAGE: {},
    MODAL: {},
    REDUX: {},
    FORM: {},
    GUARD: {},
  };

  /**
   * Returns an instance of the LoggerService.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   * @param config The configuration of the logger instance.
   * @returns An instance of the LoggerService.
   */
  public static getInstance(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext = "APPLICATION",
    contextId: string = "",
    config: Levelup.CMS.V1.Lib.Logger.InstanceConfig = {},
  ): LoggerService {
    return new LoggerService(
      context as Levelup.CMS.V1.Lib.Logger.InstanceContext,
      contextId,
      config,
    );
  }

  /**
   * Mutes the logger instance.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   */
  public static mute(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext = "APPLICATION",
    contextId: string = "",
  ) {
    this.muted[context][contextId] = true;
  }

  /**
   * Unmutes the logger instance.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   */
  public static unmute(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext = "APPLICATION",
    contextId: string = "",
  ) {
    this.muted[context][contextId] = false;
  }

  /**
   * Constructs a new instance of the LoggerService.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   * @param config The configuration of the logger instance.
   */
  constructor(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext,
    contextId: string,
    config: Levelup.CMS.V1.Lib.Logger.InstanceConfig,
  ) {
    this.context = context;
    this.contextId = contextId;
    this.config = config;
  }

  /**
   * Logs a message with the specified log type.
   * @param type The log type.
   * @param message The log message.
   * @param args Additional arguments to be logged.
   */
  public log(
    type: Levelup.CMS.V1.Lib.Logger.LogType,
    message: string,
    ...arguments_: any[]
  ) {
    if (
      LoggerService.muted[this.context][this.contextId] ||
      LoggerService.muted[this.context]["all"]
    ) {
      console.log("muted");
      return;
    }
    const label = `${moment().format("HH:mm:ss,SSS").gray} ${colors.bold(`[${this.context}:${this.contextId}]`.gray)} ${
      type === "DEBUG"
        ? message.cyan
        : type === "WARN"
          ? message.yellow
          : type === "ERROR"
            ? message.red
            : type === "SUCCESS"
              ? message.green
              : type === "HTTP"
                ? message.blue
                : type === "EVENT"
                  ? message.gray
                  : type === "INFO"
                    ? message.cyan
                    : type === "VALUE"
                      ? message.magenta
                      : message.gray
    }`;
    console.log(label, ...arguments_);
  }

  /**
   * Logs a warning message.
   * @param message The warning message.
   * @param args Additional arguments to be logged.
   */
  public warn(message: string, ...arguments_: any[]) {
    this.log("WARN", message, ...arguments_);
  }

  /**
   * Logs an error message.
   * @param message The error message.
   * @param args Additional arguments to be logged.
   */
  public error(message: string, ...arguments_: any[]) {
    this.log("ERROR", message, ...arguments_);
  }

  /**
   * Logs an info message.
   * @param message The info message.
   * @param args Additional arguments to be logged.
   */
  public info(message: string, ...arguments_: any[]) {
    this.log("INFO", message, ...arguments_);
  }

  /**
   * Logs a debug message.
   * @param message The debug message.
   * @param args Additional arguments to be logged.
   */
  public debug(message: string, ...arguments_: any[]) {
    this.log("DEBUG", message, ...arguments_);
  }

  /**
   * Logs a success message.
   * @param message The success message.
   * @param args Additional arguments to be logged.
   */
  public success(message: string, ...arguments_: any[]) {
    this.log("SUCCESS", message, ...arguments_);
  }

  /**
   * Logs a silly message.
   * @param message The silly message.
   * @param args Additional arguments to be logged.
   */
  public silly(message: string, ...arguments_: any[]) {
    this.log("SILLY", message, ...arguments_);
  }

  /**
   * Logs an HTTP message.
   * @param message The HTTP message.
   * @param args Additional arguments to be logged.
   */
  public http(message: string, ...arguments_: any[]) {
    this.log("HTTP", message, ...arguments_);
  }

  /**
   * Logs an event message.
   * @param message The event message.
   * @param args Additional arguments to be logged.
   */
  public event(message: string, ...arguments_: any[]) {
    this.log("EVENT", message, ...arguments_);
  }

  /**
   * Logs a value message.
   * @param message The value message.
   * @param args Additional arguments to be logged.
   */
  public value(message: string, ...arguments_: any[]) {
    this.log("VALUE", message, ...arguments_);
  }

  /**
   * Logs a value message.
   * @param name The value name.
   * @param args Additional arguments to be logged.
   */
  public tree(name: string, ...arguments_: any[]) {
    this.log("VALUE", name);
    console.log(
      treeify.asTree({ ...arguments_ } as unknown as TreeObject, true, true),
    );
  }
}

/**
 * Represents a log item type.
 */
export type LogItemType = "event" | "debug" | "http" | "warn" | "error";

/**
 * Represents a log item severity.
 */
export type LogItemSeverity =
  | "success"
  | "info"
  | "debug"
  | "trace"
  | "notice"
  | "warn"
  | "error"
  | "alert"
  | "critical"
  | "emergency"
  | "fatal";

/**
 * Represents a log item.
 */
export type ILogItem = {
  name: string; // eg. ON_ITEM_DELETED
  payload: {
    related_to?: string;
    [key: string]: any;
  };
  service?: string; // shipping, stores, auth ....
  severity?: LogItemSeverity; // default "info"
  related_to?: string;
};

/**
 * Initializes a logger instance. it will log the initialization of the logger instance automatically.
 * @param context The context of the logger instance.
 * @param contextId The context ID of the logger instance.
 * @param config The configuration of the logger instance.
 * @returns The initialized logger instance.
 */
const initLogger = (
  context: Levelup.CMS.V1.Lib.Logger.InstanceContext = "APPLICATION",
  contextId: string,
  config: Levelup.CMS.V1.Lib.Logger.InstanceConfig = {},
): LoggerService => {
  const logger = LoggerService.getInstance(context, contextId, config);
  logger.event("...Initialized", contextId);
  return logger;
};

/**
 * Update : added enum
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 21-05-2024 02:06:24
 */
export enum LoggerContext {
  APPLICATION = "APPLICATION",
  SUBSCRIBER = "SUBSCRIBER",
  BROKER = "BROKER",
  MIDDLEWARE = "MIDDLEWARE",
  GUARD = "GUARD",
  MAPPER = "MAPPER",
  VALIDATOR = "VALIDATOR",
  SANITIZER = "SANITIZER",
  UTILITY = "UTILITY",
  SEED = "SEED",
  COMPONENT = "COMPONENT",
  SERVICE = "SERVICE",
  CONTROLLER = "CONTROLLER",
  LOADER = "LOADER",
  MODEL = "MODEL",
  HOOK = "HOOK",
  PAGE = "PAGE",
  MODAL = "MODAL",
  REDUX = "REDUX",
  FORM = "FORM",
}

export default initLogger;
