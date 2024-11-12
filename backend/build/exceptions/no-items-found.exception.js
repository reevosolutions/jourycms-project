import LevelupException from "./levelup-exception.exception";
class NoItemsFound extends LevelupException {
    constructor(message) {
        super(message);
        this.status = 404;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default NoItemsFound;
//# sourceMappingURL=no-items-found.exception.js.map