"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 22:59:14
 * @description This file is used to create "Comment" validators.
 */
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = __importDefault(require("../../exceptions"));
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.Comments.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.Comments.Create.Request['data']>}
 */
const validateCreateBody = (body) => {
    if (!body)
        throw new exceptions_1.default.ValidationException('Body data object is required');
    const schema = joi_1.default.object({
    /**
     * @description Add your validation logic here
     */
    });
    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: true
    });
};
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.Comments.Update.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.Comments.Update.Request['data']>}
 */
const validateUpdateBody = (body) => {
    if (!body)
        throw new exceptions_1.default.ValidationException('Body data object is required');
    const schema = joi_1.default.object({
    /**
     * @description Add your validation logic here
     */
    });
    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: true
    });
};
/**
 * @generator Levelup
 */
const CommentValidators = {
    validateCreateBody,
    validateUpdateBody
};
exports.default = CommentValidators;
//# sourceMappingURL=comment.validators.js.map