import LevelupException from "./levelup-exception.exception";

class InternalServerError extends LevelupException {

  public status: number = 500;

  public constructor(message: string = "Internal system error") {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default InternalServerError;