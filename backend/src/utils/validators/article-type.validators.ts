/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 22:59:14
 * @description This file is used to create "ArticleType" validators.
 */
import Joi from "joi";
import exceptions from "../../exceptions";

import ApiAlias = Levelup.CMS.V1.Content.Api.ArticleTypes;
type PropType<TObj, TProp extends keyof TObj> = Levelup.CMS.V1.Utils.PropType<TObj, TProp>;




/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.ArticleTypes.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.ArticleTypes.Create.Request['data']>}
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
 * @param {Levelup.CMS.V1.Content.Api.ArticleTypes.Update.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.CMS.V1.Content.Api.ArticleTypes.Update.Request['data']>}
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
const ArticleTypeValidators = {
  validateCreateBody,
  validateUpdateBody
};
export default ArticleTypeValidators;

