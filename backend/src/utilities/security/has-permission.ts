import Container from 'typedi';
import CacheManager from '../../managers/cache-manager';
import initLogger from '../logging';


const logger = initLogger("UTILITY", "HAS_PERMISSIONS");


/**
 * 
 * @param {Levelup.CMS.V1.Users.Entity.ExposedUser | null} user 
 * @param {string} permissionName 
 * @returns {Promise<boolean>}
 */
const hasPermission: (user: Levelup.CMS.V1.Users.Entity.ExposedUser | null, permissionName: string) => Promise<boolean> = async (user, permissionName) => {
  const cacheManager = Container.get(CacheManager);

  if (!user) return false;
  if (user.role === "master_admin") return true;

  return false;

  const permissions = (await cacheManager.list('permission'))
  // .filter(perm => (user?.permissions || []).includes(perm._id)); // TODO: check if this is needed
  const permissionNames = permissions.map(perm => perm.name);
  logger.debug('permissions', permissions);

  const permissionId: string | null = null;

  if (!permissions || !permissions.length) { return false };

  let result: boolean = false;
  if (permissionNames.includes(permissionName)) result = true;
  logger.value('hasPermission result', result);
  return result;
}


export default hasPermission;

