/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */

import colors from "colors";
import moment from "moment";
import config from "../../config";
import treeify from "treeify";
import { initTimer } from "../system/timer.utilities";

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
    FORM: {},
    REDUX: {},
    GUARD: {},
  };
  private _showLine: boolean = false;
  private _trace: boolean;

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
    config: Levelup.CMS.V1.Lib.Logger.InstanceConfig = {}
  ): LoggerService {
    return new LoggerService(
      context as Levelup.CMS.V1.Lib.Logger.InstanceContext,
      contextId,
      config
    );
  }

  /**
   * Mutes the logger instance.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   */
  public static mute(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext = "APPLICATION",
    contextId: string = ""
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
    contextId: string = ""
  ) {
    this.muted[context][contextId] = false;
  }

  /**
   * Constructs a new instance of the LoggerService.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   * @param config The configuration of the logger instance.
   */
  private constructor(
    context: Levelup.CMS.V1.Lib.Logger.InstanceContext,
    contextId: string,
    config: Levelup.CMS.V1.Lib.Logger.InstanceConfig
  ) {
    this.context = context;
    this.contextId = contextId;
    this.config = config;
  }

  private doLog(
    type:
      | "DEBUG"
      | "WARN"
      | "ERROR"
      | "SUCCESS"
      | "HTTP"
      | "EVENT"
      | "INFO"
      | "VALUE"
      | "SILLY"
  ) {
    if (
      LoggerService.muted[this.context][this.contextId] ||
      LoggerService.muted[this.context]["all"]
    )
      return false;
    return true;
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
    ...args: any[]
  ) {
    const err = new Error();
    const stack = err.stack as string;
    const stackLines = stack.split("\n");
    const callerLine = stackLines[3]; // Line 2 usually holds the caller
    const formattedLine = callerLine.replace(/^\s*at\s+/, ""); // Clean up the string

    const label = `${colors.grey(
      moment().format("HH:mm:ss,SSS")
    )} ${colors.bold.gray(`[${this.context}:${this.contextId}]`)} ${
      type === "DEBUG"
        ? colors.bold.cyan(message)
        : type === "WARN"
          ? colors.bold.yellow(message)
          : type === "ERROR"
            ? colors.bold.red(message)
            : type === "SUCCESS"
              ? colors.bold.green(message)
              : type === "HTTP"
                ? colors.bold.blue(message)
                : type === "EVENT"
                  ? colors.gray(message)
                  : type === "INFO"
                    ? colors.bold.cyan(message)
                    : type === "VALUE"
                      ? colors.bold.magenta(message)
                      : colors.bold.gray(message)
    }`;
    if (this._showLine) {
      console.log(formattedLine.gray);
      this._showLine = false;
    }
    if (this._trace) {
      console.log(
        treeify.asTree(
          stackLines
            .map((l) => l.replace("Error", "Trace"))
            .filter((l) => !l.includes("utilities/logging/index")),
          true
        ).gray
      );
      this._trace = false;
    }
    console.log(label, ...args);
  }

  /**
   * Logs a warning message.
   * @param message The warning message.
   * @param args Additional arguments to be logged.
   */
  public warn(message: string, ...args: any[]) {
    if (this.doLog("WARN")) this.log("WARN", message, ...args);
  }

  /**
   * Logs an error message.
   * @param message The error message.
   * @param args Additional arguments to be logged.
   */
  public error(message: string, ...args: any[]) {
    if (this.doLog("ERROR")) this.log("ERROR", message, ...args);
  }

  /**
   * Logs an info message.
   * @param message The info message.
   * @param args Additional arguments to be logged.
   */
  public info(message: string, ...args: any[]) {
    if (this.doLog("INFO")) this.log("INFO", message, ...args);
  }

  /**
   * Logs a debug message.
   * @param message The debug message.
   * @param args Additional arguments to be logged.
   */
  public debug(message: string, ...args: any[]) {
    if (this.doLog("DEBUG")) this.log("DEBUG", message, ...args);
  }

  /**
   * Logs a success message.
   * @param message The success message.
   * @param args Additional arguments to be logged.
   */
  public success(message: string, ...args: any[]) {
    if (this.doLog("SUCCESS")) this.log("SUCCESS", message, ...args);
  }

  /**
   * Logs a silly message.
   * @param message The silly message.
   * @param args Additional arguments to be logged.
   */
  public silly(message: string, ...args: any[]) {
    if (this.doLog("SILLY")) this.log("SILLY", message, ...args);
  }

  /**
   * Logs an HTTP message.
   * @param message The HTTP message.
   * @param args Additional arguments to be logged.
   */
  public http(message: string, ...args: any[]) {
    if (this.doLog("HTTP")) this.log("HTTP", message, ...args);
  }

  /**
   * Logs an event message.
   * @param message The event message.
   * @param args Additional arguments to be logged.
   */
  public event(message: string, ...args: any[]) {
    if (this.doLog("EVENT")) this.log("EVENT", message, ...args);
  }

  /**
   * Logs a value message.
   * @param message The value message.
   * @param args Additional arguments to be logged.
   */
  public value(message: string, ...args: any[]) {
    if (this.doLog("VALUE")) this.log("VALUE", message, ...args);
  }

  /**
   * Logs a value message.
   * @param name The value name.
   * @param args Additional arguments to be logged.
   */
  public tree(name: string, ...args: any[]) {
    if (this.doLog("VALUE")) {
      this.log("VALUE", name);
      console.log(treeify.asTree({ ...args }, true).cyan);
    }
  }

  /**
   * Gets the DBLogger instance.
   */
  public get save() {
    return DBLogger.getInstance();
  }

  public get line() {
    this._showLine = true;
    return this;
  }
  public get trace() {
    this._trace = true;
    return this;
  }

  public get timer() {
    return initTimer();
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
 * Represents a DBLogger.
 */
class DBLogger {
  private static instance: DBLogger;

  private constructor() {}

  /**
   * Gets the DBLogger instance.
   * @returns The DBLogger instance.
   */
  public static getInstance() {
    if (!DBLogger.instance) DBLogger.instance = new DBLogger();
    return DBLogger.instance;
  }

  private log(args: ILogItem & { type: LogItemType }) {
    console.log("DB Logger not handled".red);
    console.log(treeify.asTree({ ...args }, true).yellow);
  }

  /**
   * Logs a debug message.
   * @param args The log item arguments.
   */
  public debug(args: ILogItem) {
    this.log({ ...args, type: "debug", severity: args.severity || "debug" });
  }

  /**
   * Logs an event message.
   * @param args The log item arguments.
   */
  public event(args: ILogItem) {
    this.log({ ...args, type: "event", severity: args.severity || "info" });
  }

  /**
   * Logs an HTTP message.
   * @param args The log item arguments.
   */
  public http(args: ILogItem) {
    this.log({ ...args, type: "http", severity: args.severity || "info" });
  }

  /**
   * Logs a warning message.
   * @param args The log item arguments.
   */
  public warn(args: ILogItem) {
    this.log({ ...args, type: "warn", severity: args.severity || "warn" });
  }

  /**
   * Logs an error message.
   * @param args The log item arguments.
   */
  public error(args: ILogItem) {
    this.log({ ...args, type: "error", severity: args.severity || "error" });
  }
}

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
  GUARD = "GUARD",
}

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
  config: Levelup.CMS.V1.Lib.Logger.InstanceConfig = {}
) => {
  const logger = LoggerService.getInstance(context, contextId, config);
  logger.event("...Initialized", contextId);
  return logger;
};

export default initLogger;
