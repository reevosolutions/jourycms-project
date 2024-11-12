import { StatusCodes } from 'http-status-codes';
import LevelupException from './levelup-exception.exception';
class ValueAlreadyExistsException extends LevelupException {
    constructor(message, fields) {
        super(message);
        this.status = StatusCodes.CONFLICT;
        this.is_mongoose = false;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.fields = fields;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ValueAlreadyExistsException;
//# sourceMappingURL=value-already-exists.exception.js.map