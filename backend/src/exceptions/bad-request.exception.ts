import LevelupException from "./levelup-exception.exception";
class BadRequestException extends LevelupException {

  public status: number = 400;
  public message: string;

  public constructor(message: string = 'Bad Request') {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default BadRequestException;