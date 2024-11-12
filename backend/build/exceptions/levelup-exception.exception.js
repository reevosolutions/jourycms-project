/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 03-03-2024 17:31:13
 */
class LevelupException extends Error {
    constructor(message = 'Internal system error', status) {
        super(message);
        this.status = 500;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.status = status || this.status;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default LevelupException;
//# sourceMappingURL=levelup-exception.exception.js.map