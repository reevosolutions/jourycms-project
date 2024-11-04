import Joi from "joi";
import LevelupException from "./levelup-exception.exception";

class ValidationException extends LevelupException {

  public status: number = 422;
  public fields: Levelup.V2.Utils.Api.Response.ErrorFields;

  public is_joi: boolean = false;
  public is_mongoose: boolean = false;
  public is_celebrate: boolean = false;

  /**
   * ValidationException code: 422
   */
  public constructor(message: string = 'Validation Exception', fields: Levelup.V2.Utils.Api.Response.ErrorFields | Joi.ValidationError = {}) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    if (fields instanceof Joi.ValidationError) {
      this.fields = fields.details.reduce((acc, curr) => {
        acc[curr.path[0]] = {
          value: curr.context.value,
          message: curr.message
        }
        return acc;
      }, {} as Levelup.V2.Utils.Api.Response.ErrorFields);
    }
    else
      this.fields = fields;
    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default ValidationException;



