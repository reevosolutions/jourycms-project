import LevelupException from "./levelup-exception.exception";

/**
 * @since 21-10-2023 11:38:33
 * @description This exception is used when the request is valid but the server has nothing to send back.
 * - it's used when an event is received and the service has nothing to do with it
 */
class NoContentException extends LevelupException {

  public status: number = 204;

  public constructor(message: string) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default NoContentException;