/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-05-01 05:00:30
 * @description This file is used to create "Review" sanitizer.
 */
import exceptions from "../../exceptions";
import { sanitizeObjectStrings } from './utils';

import ApiAlias = Levelup.V2.Cm.Api.Reviews;
type PropType<TObj, TProp extends keyof TObj> = Levelup.V2.Utils.PropType<TObj, TProp>;




/**
 * @description
 * @param {Levelup.V2.Cm.Api.Reviews.Create.Request['data']} body
 * @returns {Levelup.V2.Cm.Api.Reviews.Create.Request['data']}
 */
const sanitizeCreateBody = async (body: PropType<ApiAlias.Create.Request, 'data'>, authData: Levelup.V2.Security.AuthData) => {
  /**
   * @description Sanitize all string values in the object
   */
  body = sanitizeObjectStrings(body);

  /**
   * @description Remove all unwanted properties already set at the time of creation
   */
  [
    // all unwanted properties already set at the time of creation
    '_id',
    'tracking_id',
    'created_by',
    'created_by_original_user',
    'created_at',
    // all unwanted properties that will be set automatically
    'updated_at',
    'search_meta',
    'snapshots',
    'deliverer_data',
    'auth_meta',
    'insights',
    // security
    'is_suspended',
    'is_deleted',
    'permissions',
    'permissions_other_than_role',
  ].forEach(p => {
    Reflect.deleteProperty(body, p);
  });

  

  /**
   * @description inject the current user id as the creator of the object
   */
  body.created_by = authData?.current?.user?._id;
  body.app = authData?.current?.user?.app ? authData?.current?.user?.app : body.app || authData?.current?.app?._id;
  body.company = authData?.current?.user?.company
    ? authData?.current?.user?.company
    : body.company || authData?.current?.company?._id;

  /**
   * @description return the sanitized object
   */
  return body;
};




/**
 * @description
 * @param {Levelup.V2.Cm.Api.Reviews.Update.Request['data']} body
 * @returns {Levelup.V2.Cm.Api.Reviews.Update.Request['data']}
 */
const sanitizeUpdateBody = async (body: PropType<ApiAlias.Update.Request, 'data'>, authData: Levelup.V2.Security.AuthData) => {
  /**
   * @description Sanitize all string values in the object
   */
  body = sanitizeObjectStrings(body);

  /**
   * @description Remove all unwanted properties already set at the time of creation
   */
  [
    // all unwanted properties already set at the time of creation
    '_id',
    'tracking_id',
    'created_by',
    'created_by_original_user',
    'created_at',
    'app',
    'company',
    // all unwanted properties that will be set automatically
    'updated_at',
    'search_meta',
    'snapshots',
    'deliverer_data',
    'auth_meta',
    'insights',
    // security
    'email',
    'password',
    'confirm_password',
    'is_suspended',
    'is_deleted',
    'permissions',
    'permissions_other_than_role',
  ].forEach(p => {
    Reflect.deleteProperty(body, p);
  });

  /**
   * @description return the sanitized object
   */
  return body;
};


/**
 * @generator Levelup
 */
const ReviewSanitizers = {
  sanitizeCreateBody,
  sanitizeUpdateBody
};
export default ReviewSanitizers;

