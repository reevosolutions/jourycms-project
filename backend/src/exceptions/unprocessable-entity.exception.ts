import LevelupException from "./levelup-exception.exception";

class UnprocessableEntityException extends LevelupException {
  
  public status: number = 422;
  public fields: Levelup.V2.Utils.Api.Response.ErrorFields
  
  
  /**
   * UnprocessableEntityException code: 422
   */
  public constructor(message: string = 'Bad Request', fields: Levelup.V2.Utils.Api.Response.ErrorFields = {}) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    this.fields = fields;
    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default UnprocessableEntityException;