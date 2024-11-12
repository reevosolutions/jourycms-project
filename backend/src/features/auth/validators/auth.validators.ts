import Joi from 'joi';

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth;
type PropType<TObj, TProp extends keyof TObj> = Levelup.CMS.V1.Utils.PropType<TObj, TProp>;

export const validateRegisterBody = (body: PropType<ApiAlias.Signup.Request, 'data'>) => {
  const schema = Joi.object({
    account_type: Joi.string().required().label('Account type'),
    first_name: Joi.string().required().label('First name'),
    family_name: Joi.string().required().label('Family name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
  });
  return schema.validate(body, {
    abortEarly: false,
    allowUnknown: true
  });
};

export const validateLoginBody = (body: PropType<ApiAlias.Signin.Request, 'data'>) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
  });
  return schema.validate(body, {
    abortEarly: false
  });
};

/**
 * @generator Levelup
 */
const AuthValidators = {
  validateRegisterBody,
  validateLoginBody
};
export default AuthValidators;
