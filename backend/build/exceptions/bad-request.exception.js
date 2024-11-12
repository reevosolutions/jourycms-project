import LevelupException from "./levelup-exception.exception";
class BadRequestException extends LevelupException {
    constructor(message = 'Bad Request') {
        super(message);
        this.status = 400;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default BadRequestException;
//# sourceMappingURL=bad-request.exception.js.map