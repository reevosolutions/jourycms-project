"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouteID = exports.phoneNumberValidator = exports.objectIdValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = __importDefault(require("../../exceptions"));
const mogodb_helpers_1 = require("../../utilities/helpers/mogodb.helpers");
const phones_utilities_1 = require("../../utilities/strings/phones.utilities");
const objectIdValidator = (value, helpers) => {
    if (!(0, mogodb_helpers_1.isObjectIdValid)(value)) {
        return helpers.error('string.pattern.base', { value });
    }
    // Return the value unchanged if it is valid
    return value;
};
exports.objectIdValidator = objectIdValidator;
const phoneNumberValidator = (value, helpers) => {
    if (!(0, phones_utilities_1.isValidAlgerianPhoneNumber)(value)) {
        return helpers.error('string.pattern.base', { value });
    }
    // Return the value unchanged if it is valid
    return value;
};
exports.phoneNumberValidator = phoneNumberValidator;
/**
 * @description
 * @param {Levelup.CMS.V1.Users.Api.Users.ChangeRole.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Users.Api.Users.ChangeRole.Request['data']>}
 */
const validateRouteID = (body) => {
    if (!body)
        throw new exceptions_1.default.ValidationException('Body data object is required');
    const schema = joi_1.default.object({
        /**
         * @description Add your validation logic here
         */
        id: joi_1.default.string().custom(exports.objectIdValidator).required(),
    });
    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: true
    });
};
exports.validateRouteID = validateRouteID;
//# sourceMappingURL=utils.js.map