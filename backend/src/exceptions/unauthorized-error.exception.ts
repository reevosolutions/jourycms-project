import LevelupException from "./levelup-exception.exception";

class UnauthorizedException extends LevelupException {
  
  public status: number = 401;

  public constructor(message: string = 'Unauthorized') {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default UnauthorizedException;