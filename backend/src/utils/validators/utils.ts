import Joi from "joi";
import exceptions from "../../exceptions";
import { isObjectIdValid } from "../../utilities/helpers/mogodb.helpers";
import { isValidAlgerianPhoneNumber } from "../../utilities/strings/phones.utilities";

export const objectIdValidator = (value: string, helpers: Joi.CustomHelpers) => {
  if (!isObjectIdValid(value)) {
    return helpers.error('string.pattern.base', { value });
  }
  // Return the value unchanged if it is valid
  return value;
};

export const phoneNumberValidator = (value: string, helpers: Joi.CustomHelpers) => {
  if (!isValidAlgerianPhoneNumber(value)) {
    return helpers.error('string.pattern.base', { value });
  }
  // Return the value unchanged if it is valid
  return value;
};



/**
 * @description
 * @param {Levelup.V2.Users.Api.Users.ChangeRole.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Users.Api.Users.ChangeRole.Request['data']>}
 */
export const validateRouteID = (body: {
  id: Levelup.V2.Utils.Common.ID;
}) => {
  if (!body) throw new exceptions.ValidationException('Body data object is required');
  const schema = Joi.object({
    /**
     * @description Add your validation logic here
     */
    id: Joi.string().custom(objectIdValidator).required(),
  });

  return schema.validate(body, {
    abortEarly: false,
    allowUnknown: true
  });
};
