import LevelupException from "./levelup-exception.exception";

class ItemNotFound extends LevelupException {
  
  public status: number = 404;

  public constructor(message: string = "Item Not Found") {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default ItemNotFound;