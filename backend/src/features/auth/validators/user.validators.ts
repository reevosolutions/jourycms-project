/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 22:59:14
 * @description This file is used to create "User" validators.
 */
import Joi from 'joi';
import exceptions from '../../../exceptions';

import ApiAlias = Levelup.CMS.V1.Users.Api.Users;
import { objectIdValidator } from './utils';
type PropType<TObj, TProp extends keyof TObj> = Levelup.CMS.V1.Utils.PropType<TObj, TProp>;

/**
 * @description
 * @param {Levelup.V2.Users.Api.Users.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Users.Api.Users.Create.Request['data']>}
 */
const validateCreateBody = (body: PropType<ApiAlias.Create.Request, 'data'>) => {
  if (!body) throw new exceptions.ValidationException('Body data object is required');
  const schema = Joi.object<PropType<ApiAlias.Create.Request, 'data'>>({
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
 * @param {Levelup.V2.Users.Api.Users.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Users.Api.Users.Create.Request['data']>}
 */
const validateCreateStoreTeamMemberBody = (body: PropType<ApiAlias.Create.Request, 'data'>) => {
  if (!body) throw new exceptions.ValidationException('Body data object is required');
  const schema = Joi.object<PropType<ApiAlias.Create.Request, 'data'>>({
    /**
     * @description Add your validation logic here
     */
    attributes: Joi.object({
      seller: Joi.object({
        stores: Joi.array().items(Joi.string().custom(objectIdValidator)).min(1).required()
      }).required()
    }).required()
  });

  return schema.validate(body, {
    abortEarly: false,
    allowUnknown: true
  });
};

/**
 * @description
 * @param {Levelup.V2.Users.Api.Users.Update.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Users.Api.Users.Update.Request['data']>}
 */
const validateUpdateBody = (body: PropType<ApiAlias.Update.Request, 'data'>) => {
  if (!body) throw new exceptions.ValidationException('Body data object is required');
  const schema = Joi.object<PropType<ApiAlias.Update.Request, 'data'>>({
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
const UserValidators = {
  validateCreateStoreTeamMemberBody,
  validateCreateBody,
  validateUpdateBody,
};
export default UserValidators;
