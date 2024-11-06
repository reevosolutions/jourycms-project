"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqSingletonConnectionFactory = exports.RabbitMqConnectionFactory = void 0;
const amqp = __importStar(require("amqplib"));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const common_1 = require("./common");
function isConnectionConfig(config) {
    if (config.host &&
        config.port) {
        return true;
    }
}
class RabbitMqConnectionFactory {
    constructor(config, retryDelay = 5000, maxRetries = 5) {
        this.logger = (0, logging_1.default)("BROKER", `${common_1.LOG_PREFIX}${this.constructor.name}`);
        this.connection = isConnectionConfig(config)
            ? config.password && config.username
                ? `amqp://${config.username}:${config.password}@${config.host}:${config.port}`
                : `amqp://${config.host}:${config.port}`
            : config;
        this.retryDelay = retryDelay;
        this.maxRetries = maxRetries;
        this.retryCount = 0;
    }
    async create() {
        this.logger.debug("connecting to %s", this.connection);
        try {
            const conn = await amqp.connect(this.connection);
            conn.on("error", this.handleConnectionError.bind(this));
            conn.on("close", this.handleConnectionClose.bind(this));
            this.logger.success("Connection created successfully", this.connection);
            return conn;
        }
        catch (error) {
            this.logger.error("failed to create connection '%s'", this.connection);
            this.retryConnection();
            throw error;
        }
    }
    async handleConnectionError(err) {
        this.logger.error("RabbitMQ connection error:", err);
        this.retryConnection();
    }
    async handleConnectionClose() {
        this.logger.error("RabbitMQ connection closed, retrying...");
        this.retryConnection();
    }
    async retryConnection() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            this.logger.debug(`Retrying connection attempt ${this.retryCount}/${this.maxRetries} in ${this.retryDelay / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
            try {
                await this.create();
                this.retryCount = 0; // Reset retry count on successful connection
            }
            catch (error) {
                this.logger.error("Reconnection attempt failed:", error);
            }
        }
        else {
            this.logger.error("Maximum retry attempts reached. Connection failed.");
        }
    }
}
exports.RabbitMqConnectionFactory = RabbitMqConnectionFactory;
class RabbitMqSingletonConnectionFactory {
    constructor(config, retryDelay = 5000, maxRetries = 5) {
        this.logger = (0, logging_1.default)("BROKER", `${common_1.LOG_PREFIX}${this.constructor.name}`);
        this.connection = isConnectionConfig(config)
            ? config.password && config.username
                ? `amqp://${config.username}:${config.password}@${config.host}:${config.port}`
                : `amqp://${config.host}:${config.port}`
            : config;
        this.retryDelay = retryDelay;
        this.maxRetries = maxRetries;
        this.retryCount = 0;
    }
    async create() {
        try {
            if (this.conn) {
                this.logger.debug("reusing connection to %s", this.connection);
                return this.conn;
            }
            this.logger.debug("creating connection to %s", this.connection);
            this.conn = await amqp.connect(this.connection);
            this.conn.on("error", this.handleConnectionError.bind(this));
            this.conn.on("close", this.handleConnectionClose.bind(this));
            this.logger.success("Connection created successfully", this.connection);
            return this.conn;
        }
        catch (error) {
            this.logger.error("failed to create connection '%s'", this.connection);
            this.retryConnection();
            throw error;
        }
    }
    async handleConnectionError(err) {
        this.logger.error("RabbitMQ connection error:", err);
        this.retryConnection();
    }
    async handleConnectionClose() {
        this.logger.error("RabbitMQ connection closed, retrying...");
        this.retryConnection();
    }
    async retryConnection() {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            this.logger.debug(`Retrying connection attempt ${this.retryCount}/${this.maxRetries} in ${this.retryDelay / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
            try {
                await this.create();
                this.retryCount = 0; // Reset retry count on successful connection
            }
            catch (error) {
                this.logger.error("Reconnection attempt failed:", error);
            }
        }
        else {
            this.logger.error("Maximum retry attempts reached. Connection failed.");
        }
    }
}
exports.RabbitMqSingletonConnectionFactory = RabbitMqSingletonConnectionFactory;
//# sourceMappingURL=connectionFactory.js.map