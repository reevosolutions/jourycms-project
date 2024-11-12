import LevelupException from "./levelup-exception.exception";
class UnauthorizedException extends LevelupException {
    constructor(message = 'Unauthorized') {
        super(message);
        this.status = 401;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default UnauthorizedException;
//# sourceMappingURL=unauthorized-error.exception.js.map