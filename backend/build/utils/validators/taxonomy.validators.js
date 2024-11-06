"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 22:59:14
 * @description This file is used to create "Taxonomy" validators.
 */
const joi_1 = __importDefault(require("joi"));
const exceptions_1 = __importDefault(require("../../exceptions"));
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.Taxonomies.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.Taxonomies.Create.Request['data']>}
 */
const validateCreateBody = (body) => {
    if (!body)
        throw new exceptions_1.default.ValidationException('Body data object is required');
    const schema = joi_1.default.object({
        /**
         * @description Add your validation logic here
         */
        name: joi_1.default.string().min(1).required(),
        slug: joi_1.default.string().min(1).required()
    });
    return schema.validate(body, {
        abortEarly: false,
        allowUnknown: true
    });
};
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.Taxonomies.Update.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.Taxonomies.Update.Request['data']>}
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
const TaxonomyValidators = {
    validateCreateBody,
    validateUpdateBody
};
exports.default = TaxonomyValidators;
//# sourceMappingURL=taxonomy.validators.js.map