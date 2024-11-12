import LevelupException from "./levelup-exception.exception";
class InvalidPasswordException extends LevelupException {
    constructor(message = "Invalid password") {
        super(message);
        this.status = 403;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default InvalidPasswordException;
//# sourceMappingURL=invalid-password.exception.js.map