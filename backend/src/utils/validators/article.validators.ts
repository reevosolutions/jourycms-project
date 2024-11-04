/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 22:59:14
 * @description This file is used to create "Article" validators.
 */
import Joi from "joi";
import exceptions from "../../exceptions";

import ApiAlias = Levelup.V2.Cm.Api.Articles;
type PropType<TObj, TProp extends keyof TObj> = Levelup.V2.Utils.PropType<TObj, TProp>;




/**
 * @description
 * @param {Levelup.V2.Cm.Api.Articles.Create.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Cm.Api.Articles.Create.Request['data']>}
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
 * @param {Levelup.V2.Cm.Api.Articles.Update.Request['data']} body
 * @returns {Joi.ValidationResult<Levelup.V2.Cm.Api.Articles.Update.Request['data']>}
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
const ArticleValidators = {
  validateCreateBody,
  validateUpdateBody
};
export default ArticleValidators;

