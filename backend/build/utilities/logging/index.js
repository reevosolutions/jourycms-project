/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import colors from "colors";
import moment from "moment";
import treeify from "treeify";
import { initTimer } from "../system/timer.utilities";
/**
 * Represents a logger service.
 */
export class LoggerService {
    /**
     * Returns an instance of the LoggerService.
     * @param context The context of the logger instance.
     * @param contextId The context ID of the logger instance.
     * @param config The configuration of the logger instance.
     * @returns An instance of the LoggerService.
     */
    static getInstance(context = "APPLICATION", contextId = "", config = {}) {
        return new LoggerService(context, contextId, config);
    }
    /**
     * Mutes the logger instance.
     * @param context The context of the logger instance.
     * @param contextId The context ID of the logger instance.
     */
    static mute(context = "APPLICATION", contextId = "") {
        this.muted[context][contextId] = true;
    }
    /**
     * Unmutes the logger instance.
     * @param context The context of the logger instance.
     * @param contextId The context ID of the logger instance.
     */
    static unmute(context = "APPLICATION", contextId = "") {
        this.muted[context][contextId] = false;
    }
    /**
     * Constructs a new instance of the LoggerService.
     * @param context The context of the logger instance.
     * @param contextId The context ID of the logger instance.
     * @param config The configuration of the logger instance.
     */
    constructor(context, contextId, config) {
        this._showLine = false;
        this.context = context;
        this.contextId = contextId;
        this.config = config;
    }
    doLog(type) {
        if (LoggerService.muted[this.context][this.contextId] ||
            LoggerService.muted[this.context]["all"])
            return false;
        return true;
    }
    /**
     * Logs a message with the specified log type.
     * @param type The log type.
     * @param message The log message.
     * @param args Additional arguments to be logged.
     */
    log(type, message, ...args) {
        const err = new Error();
        const stack = err.stack;
        const stackLines = stack.split("\n");
        const callerLine = stackLines[3]; // Line 2 usually holds the caller
        const formattedLine = callerLine.replace(/^\s*at\s+/, ""); // Clean up the string
        const label = `${colors.grey(moment().format("HH:mm:ss,SSS"))} ${colors.bold.gray(`[${this.context}:${this.contextId}]`)} ${type === "DEBUG"
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
                                        : colors.bold.gray(message)}`;
        if (this._showLine) {
            console.log(formattedLine.gray);
            this._showLine = false;
        }
        if (this._trace) {
            console.log(treeify.asTree(stackLines
                .map((l) => l.replace("Error", "Trace"))
                .filter((l) => !l.includes("utilities/logging/index")), true).gray);
            this._trace = false;
        }
        console.log(label, ...args);
    }
    /**
     * Logs a warning message.
     * @param message The warning message.
     * @param args Additional arguments to be logged.
     */
    warn(message, ...args) {
        if (this.doLog("WARN"))
            this.log("WARN", message, ...args);
    }
    /**
     * Logs an error message.
     * @param message The error message.
     * @param args Additional arguments to be logged.
     */
    error(message, ...args) {
        if (this.doLog("ERROR"))
            this.log("ERROR", message, ...args);
    }
    /**
     * Logs an info message.
     * @param message The info message.
     * @param args Additional arguments to be logged.
     */
    info(message, ...args) {
        if (this.doLog("INFO"))
            this.log("INFO", message, ...args);
    }
    /**
     * Logs a debug message.
     * @param message The debug message.
     * @param args Additional arguments to be logged.
     */
    debug(message, ...args) {
        if (this.doLog("DEBUG"))
            this.log("DEBUG", message, ...args);
    }
    /**
     * Logs a success message.
     * @param message The success message.
     * @param args Additional arguments to be logged.
     */
    success(message, ...args) {
        if (this.doLog("SUCCESS"))
            this.log("SUCCESS", message, ...args);
    }
    /**
     * Logs a silly message.
     * @param message The silly message.
     * @param args Additional arguments to be logged.
     */
    silly(message, ...args) {
        if (this.doLog("SILLY"))
            this.log("SILLY", message, ...args);
    }
    /**
     * Logs an HTTP message.
     * @param message The HTTP message.
     * @param args Additional arguments to be logged.
     */
    http(message, ...args) {
        if (this.doLog("HTTP"))
            this.log("HTTP", message, ...args);
    }
    /**
     * Logs an event message.
     * @param message The event message.
     * @param args Additional arguments to be logged.
     */
    event(message, ...args) {
        if (this.doLog("EVENT"))
            this.log("EVENT", message, ...args);
    }
    /**
     * Logs a value message.
     * @param message The value message.
     * @param args Additional arguments to be logged.
     */
    value(message, ...args) {
        if (this.doLog("VALUE"))
            this.log("VALUE", message, ...args);
    }
    /**
     * Logs a value message.
     * @param name The value name.
     * @param args Additional arguments to be logged.
     */
    tree(name, ...args) {
        if (this.doLog("VALUE")) {
            this.log("VALUE", name);
            console.log(treeify.asTree(Object.assign({}, args), true).cyan);
        }
    }
    /**
     * Gets the DBLogger instance.
     */
    get save() {
        return DBLogger.getInstance();
    }
    get line() {
        this._showLine = true;
        return this;
    }
    get trace() {
        this._trace = true;
        return this;
    }
    get timer() {
        return initTimer();
    }
}
LoggerService.muted = {
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
/**
 * Represents a DBLogger.
 */
class DBLogger {
    constructor() { }
    /**
     * Gets the DBLogger instance.
     * @returns The DBLogger instance.
     */
    static getInstance() {
        if (!DBLogger.instance)
            DBLogger.instance = new DBLogger();
        return DBLogger.instance;
    }
    log(args) {
        console.log('DB Logger not handled'.red);
    }
    /**
     * Logs a debug message.
     * @param args The log item arguments.
     */
    debug(args) {
        this.log(Object.assign(Object.assign({}, args), { type: "debug", severity: args.severity || "debug" }));
    }
    /**
     * Logs an event message.
     * @param args The log item arguments.
     */
    event(args) {
        this.log(Object.assign(Object.assign({}, args), { type: "event", severity: args.severity || "info" }));
    }
    /**
     * Logs an HTTP message.
     * @param args The log item arguments.
     */
    http(args) {
        this.log(Object.assign(Object.assign({}, args), { type: "http", severity: args.severity || "info" }));
    }
    /**
     * Logs a warning message.
     * @param args The log item arguments.
     */
    warn(args) {
        this.log(Object.assign(Object.assign({}, args), { type: "warn", severity: args.severity || "warn" }));
    }
    /**
     * Logs an error message.
     * @param args The log item arguments.
     */
    error(args) {
        this.log(Object.assign(Object.assign({}, args), { type: "error", severity: args.severity || "error" }));
    }
}
/**
 * Update : added enum
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 21-05-2024 02:06:24
 */
export var LoggerContext;
(function (LoggerContext) {
    LoggerContext["APPLICATION"] = "APPLICATION";
    LoggerContext["SUBSCRIBER"] = "SUBSCRIBER";
    LoggerContext["BROKER"] = "BROKER";
    LoggerContext["MIDDLEWARE"] = "MIDDLEWARE";
    LoggerContext["MAPPER"] = "MAPPER";
    LoggerContext["VALIDATOR"] = "VALIDATOR";
    LoggerContext["SANITIZER"] = "SANITIZER";
    LoggerContext["UTILITY"] = "UTILITY";
    LoggerContext["SEED"] = "SEED";
    LoggerContext["COMPONENT"] = "COMPONENT";
    LoggerContext["SERVICE"] = "SERVICE";
    LoggerContext["CONTROLLER"] = "CONTROLLER";
    LoggerContext["LOADER"] = "LOADER";
    LoggerContext["MODEL"] = "MODEL";
    LoggerContext["HOOK"] = "HOOK";
    LoggerContext["PAGE"] = "PAGE";
    LoggerContext["MODAL"] = "MODAL";
    LoggerContext["REDUX"] = "REDUX";
    LoggerContext["FORM"] = "FORM";
    LoggerContext["GUARD"] = "GUARD";
})(LoggerContext || (LoggerContext = {}));
/**
 * Initializes a logger instance. it will log the initialization of the logger instance automatically.
 * @param context The context of the logger instance.
 * @param contextId The context ID of the logger instance.
 * @param config The configuration of the logger instance.
 * @returns The initialized logger instance.
 */
const initLogger = (context = "APPLICATION", contextId, config = {}) => {
    const logger = LoggerService.getInstance(context, contextId, config);
    logger.event("...Initialized", contextId);
    return logger;
};
export default initLogger;
//# sourceMappingURL=index.js.map