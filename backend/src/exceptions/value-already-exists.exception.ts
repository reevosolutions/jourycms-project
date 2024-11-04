import {
  StatusCodes
} from 'http-status-codes';
import LevelupException from './levelup-exception.exception';

class ValueAlreadyExistsException extends LevelupException {

  public status: number = StatusCodes.CONFLICT;
  public fields: Levelup.V2.Utils.Api.Response.ErrorFields;

  public is_mongoose: boolean = false;

  public constructor(message: string, fields?: Levelup.V2.Utils.Api.Response.ErrorFields) {
    super(message)

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name

    this.fields = fields;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);

  }
}

export default ValueAlreadyExistsException;

