import { defaults } from './../../../utilities/helpers/utils.helpers';
import initLogger from '../../../utilities/logging';

import EntityAlias = Levelup.CMS.V1.Users.Entity;

const logger = initLogger('MAPPER', "users");

export const mapUserToExposed = (doc: EntityAlias.User, opt: {
  omitTags?: boolean,
  omitUpdates?: boolean,
  omitAuthMeta?: boolean,
} = {
    omitTags: true,
    omitUpdates: true,
    omitAuthMeta: true,
  }): EntityAlias.ExposedUser => {

  opt = defaults(opt, {
    omitTags: true,
    omitUpdates: true,
    omitAuthMeta: true,
  });



  Reflect.deleteProperty(doc, 'password');
  Reflect.deleteProperty(doc, 'salt');
  Reflect.deleteProperty(doc, 'search_meta_fuzzy');
  Reflect.deleteProperty(doc, '__v');
  if (opt.omitAuthMeta) Reflect.deleteProperty(doc, 'auth_meta');
  if (opt.omitTags) Reflect.deleteProperty(doc, 'tags');
  if (opt.omitUpdates) Reflect.deleteProperty(doc, 'updates');

  return doc;
}


export default {
  mapUserToExposed
}