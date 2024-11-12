import LevelupException from "./levelup-exception.exception";
class JWTTokenExpired extends LevelupException {
    constructor(message = 'JWT Token expired') {
        super(message);
        this.status = 401;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default JWTTokenExpired;
//# sourceMappingURL=jwt-token-expired.exception.js.map