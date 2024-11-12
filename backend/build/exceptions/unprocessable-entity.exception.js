import LevelupException from "./levelup-exception.exception";
class UnprocessableEntityException extends LevelupException {
    /**
     * UnprocessableEntityException code: 422
     */
    constructor(message = 'Bad Request', fields = {}) {
        super(message);
        this.status = 422;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.fields = fields;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
export default UnprocessableEntityException;
//# sourceMappingURL=unprocessable-entity.exception.js.map