import * as amqp from "amqplib";
import initLogger, { LoggerService } from "../../../utilities/logging";
import { LOG_PREFIX } from "./common";

export interface IRabbitMqConnectionFactory {
  create(): Promise<amqp.Connection>;
}

export interface IRabbitMqConnectionConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

function isConnectionConfig(
  config: IRabbitMqConnectionConfig | string
): config is IRabbitMqConnectionConfig {
  if (
    (config as IRabbitMqConnectionConfig).host &&
    (config as IRabbitMqConnectionConfig).port
  ) {
    return true;
  }
}

export class RabbitMqConnectionFactory implements IRabbitMqConnectionFactory {
  private connection: string;
  private logger: LoggerService;
  private retryDelay: number;
  private maxRetries: number;
  private retryCount: number;

  public constructor(
    config: IRabbitMqConnectionConfig | string,
    retryDelay = 5000,
    maxRetries = 5
  ) {
    this.logger = initLogger("BROKER", `${LOG_PREFIX}${this.constructor.name}`);
    this.connection = isConnectionConfig(config)
      ? config.password && config.username
        ? `amqp://${config.username}:${config.password}@${config.host}:${config.port}`
        : `amqp://${config.host}:${config.port}`
      : config;
    this.retryDelay = retryDelay;
    this.maxRetries = maxRetries;
    this.retryCount = 0;
  }

  public async create(): Promise<amqp.Connection> {
    this.logger.debug("connecting to %s", this.connection);

    try {
      const conn = await amqp.connect(this.connection);
      conn.on("error", this.handleConnectionError.bind(this));
      conn.on("close", this.handleConnectionClose.bind(this));
      this.logger.success("Connection created successfully", this.connection);
      return conn;
    } catch (error) {
      this.logger.error("failed to create connection '%s'", this.connection);
      this.retryConnection();
      throw error;
    }
  }

  private async handleConnectionError(err: any) {
    this.logger.error("RabbitMQ connection error:", err);
    this.retryConnection();
  }

  private async handleConnectionClose() {
    this.logger.error("RabbitMQ connection closed, retrying...");
    this.retryConnection();
  }

  private async retryConnection() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.logger.debug(
        `Retrying connection attempt ${this.retryCount}/${this.maxRetries} in ${
          this.retryDelay / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
      try {
        await this.create();
        this.retryCount = 0; // Reset retry count on successful connection
      } catch (error) {
        this.logger.error("Reconnection attempt failed:", error);
      }
    } else {
      this.logger.error("Maximum retry attempts reached. Connection failed.");
    }
  }
}

export class RabbitMqSingletonConnectionFactory
  implements IRabbitMqConnectionFactory
{
  private connection: string;
  private conn: amqp.Connection;
  private logger: LoggerService;
  private retryDelay: number;
  private maxRetries: number;
  private retryCount: number;

  public constructor(
    config: IRabbitMqConnectionConfig | string,
    retryDelay = 5000,
    maxRetries = 5
  ) {
    this.logger = initLogger("BROKER", `${LOG_PREFIX}${this.constructor.name}`);
    this.connection = isConnectionConfig(config)
      ? config.password && config.username
        ? `amqp://${config.username}:${config.password}@${config.host}:${config.port}`
        : `amqp://${config.host}:${config.port}`
      : config;
    this.retryDelay = retryDelay;
    this.maxRetries = maxRetries;
    this.retryCount = 0;
  }

  public async create(): Promise<amqp.Connection> {
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
    } catch (error) {
      this.logger.error("failed to create connection '%s'", this.connection);
      this.retryConnection();
      throw error;
    }
  }

  private async handleConnectionError(err: any) {
    this.logger.error("RabbitMQ connection error:", err);
    this.retryConnection();
  }

  private async handleConnectionClose() {
    this.logger.error("RabbitMQ connection closed, retrying...");
    this.retryConnection();
  }

  private async retryConnection() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.logger.debug(
        `Retrying connection attempt ${this.retryCount}/${this.maxRetries} in ${
          this.retryDelay / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
      try {
        await this.create();
        this.retryCount = 0; // Reset retry count on successful connection
      } catch (error) {
        this.logger.error("Reconnection attempt failed:", error);
      }
    } else {
      this.logger.error("Maximum retry attempts reached. Connection failed.");
    }
  }
}
