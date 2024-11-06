/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */

import colors from 'colors';
import moment from 'moment';


type InstanceContext = 'SDK' | 'CLIENT' | 'CACHE' | 'HTTP_CLIENT';
/**
 * Represents a logger service.
 */
export class LoggerService {

  private context: 'SDK' | 'CLIENT' | 'CACHE' | 'HTTP_CLIENT';
  private contextId: string;
  private static muted: {
    [context in InstanceContext]: { [contextId: string]: boolean }
  } = {
      SDK: {},
      CLIENT: {},
      HTTP_CLIENT: {},
      CACHE: {},
    };

  /**
   * Returns an instance of the LoggerService.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   * @param config The configuration of the logger instance.
   * @returns An instance of the LoggerService.
   */
  public static getInstance(context: InstanceContext = "SDK", contextId: string = ""): LoggerService {
    return new LoggerService(context as InstanceContext, contextId);
  }

  /**
   * Mutes the logger instance.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   */
  public static mute(context: InstanceContext = "SDK", contextId: string = "") {
    this.muted[context][contextId] = true;
  }

  /**
   * Unmutes the logger instance.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   */
  public static unmute(context: InstanceContext = "SDK", contextId: string = "") {
    this.muted[context][contextId] = false;
  }

  /**
   * Constructs a new instance of the LoggerService.
   * @param context The context of the logger instance.
   * @param contextId The context ID of the logger instance.
   * @param config The configuration of the logger instance.
   */
  constructor(context: InstanceContext, contextId: string) {
    this.context = context;
    this.contextId = contextId;
  }

  /**
   * Logs a message with the specified log type.
   * @param type The log type.
   * @param message The log message.
   * @param args Additional arguments to be logged.
   */
  public log(type: Levelup.CMS.V1.Lib.Logger.LogType, message: string, ...args: any[]) {
    if (LoggerService.muted[this.context][this.contextId] || LoggerService.muted[this.context]["all"])
      return;
    const label = `${colors.grey(moment().format('HH:mm:ss,SSS'))} ${colors.bold.gray(`[${this.context}:${this.contextId}]`)} ${type === "DEBUG"
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
    console.log(label, ...args);
  }

  /**
   * Logs a warning message.
   * @param message The warning message.
   * @param args Additional arguments to be logged.
   */
  public warn(message: string, ...args: any[]) {
    this.log("WARN", message, ...args);
  }

  /**
   * Logs an error message.
   * @param message The error message.
   * @param args Additional arguments to be logged.
   */
  public error(message: string, ...args: any[]) {
    this.log("ERROR", message, ...args);
  }

  /**
   * Logs an info message.
   * @param message The info message.
   * @param args Additional arguments to be logged.
   */
  public info(message: string, ...args: any[]) {
    this.log("INFO", message, ...args);
  }

  /**
   * Logs a debug message.
   * @param message The debug message.
   * @param args Additional arguments to be logged.
   */
  public debug(message: string, ...args: any[]) {
    this.log("DEBUG", message, ...args);
  }

  /**
   * Logs a success message.
   * @param message The success message.
   * @param args Additional arguments to be logged.
   */
  public success(message: string, ...args: any[]) {
    this.log("SUCCESS", message, ...args);
  }

  /**
   * Logs a silly message.
   * @param message The silly message.
   * @param args Additional arguments to be logged.
   */
  public silly(message: string, ...args: any[]) {
    this.log("SILLY", message, ...args);
  }

  /**
   * Logs an HTTP message.
   * @param message The HTTP message.
   * @param args Additional arguments to be logged.
   */
  public http(message: string, ...args: any[]) {
    this.log("HTTP", message, ...args);
  }

  /**
   * Logs an event message.
   * @param message The event message.
   * @param args Additional arguments to be logged.
   */
  public event(message: string, ...args: any[]) {
    this.log("EVENT", message, ...args);
  }

  /**
   * Logs a value message.
   * @param message The value message.
   * @param args Additional arguments to be logged.
   */
  public value(message: string, ...args: any[]) {
    this.log("VALUE", message, ...args);
  }

}

/**
 * Represents a log item type.
 */
export type LogItemType =
  "event" |
  "debug" |
  "http" |
  "warn" |
  "error";

/**
 * Represents a log item severity.
 */
export type LogItemSeverity =
  "success" |
  "info" |
  "debug" |
  "trace" |
  "notice" |
  "warn" |
  "error" |
  "alert" |
  "critical" |
  "emergency" |
  "fatal";

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
}


/**
 * Initializes a logger instance. it will log the initialization of the logger instance automatically.
 * @param context The context of the logger instance.
 * @param contextId The context ID of the logger instance.
 * @param config The configuration of the logger instance.
 * @returns The initialized logger instance.
 */
const initLogger = (context: InstanceContext = "SDK", contextId: string, ) => {
  const logger = LoggerService.getInstance(context, contextId);
  logger.event('...Initialized', contextId);
  return logger;
};

export default initLogger;

