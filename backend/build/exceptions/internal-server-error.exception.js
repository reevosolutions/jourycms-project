import LevelupException from "./levelup-exception.exception";
class InternalServerError extends LevelupException {
    constructor(message = "Internal system error") {
        super(message);
        this.status = 500;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default InternalServerError;
//# sourceMappingURL=internal-server-error.exception.js.map