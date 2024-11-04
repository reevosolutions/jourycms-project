import LevelupException from "./levelup-exception.exception";

class InvalidPasswordException extends LevelupException {
  
  public status: number = 403;

  public constructor(message: string = "Invalid password") {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default InvalidPasswordException;