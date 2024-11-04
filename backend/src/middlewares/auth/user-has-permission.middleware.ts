import { Container } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import exceptions from '../../exceptions';
import CacheManager from '../../managers/cache-manager/index';

/**
  * Check if user has permission
  *  - If the request is identified as a service request, always pass
  *  - If user is master, always pass
  *  - If the permission is not passed, pass
  *  - If user has the permission, pass
  *  - If the passed permissions is an array, check if user has one of the permissions
  *  - If the passed permissions is an array of arrays, check if user has all the permissions in one of the arrays
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userHasPermission = (
  permission: string | (string | string[])[]
) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const cm = Container.get(CacheManager);

    /**
     * Always pass if another service is authenticated
     */
    if (req.attached_entities.service)
      return next();

    
    /**
     * Handle JWT token expired
     */
    if (req.jwt_expired)
      throw new exceptions.JWTTokenExpired('JWT token expired');


    /**
     * Masters always have all the role groups
     */
    if (req.attached_entities.user?.role_group === 'master')
      return next();

    if (!permission || !permission.length) {
      return next();
    }

    /**
     * The condition logic
     */
    if (!req.attached_entities.user || !req.attached_entities.user.permissions || !req.attached_entities.user.permissions.length)
      throw new exceptions.UnauthorizedException('You must be logged in to access this resource');




    const permissionObjects = await cm.permissions.list();

    const userPermissionNames = (req.attached_entities.user?.permissions || []).map(p => permissionObjects.find(po => po._id === p)?.name);

    if (typeof permission === 'string' && userPermissionNames.indexOf(permission as string) > -1) {
      return next();
    }

    let granted = false;
    if (typeof permission !== 'string' && permission instanceof Array) {
      (permission as (string | string[])[]).forEach(perm => {
        if (typeof perm === 'string') {
          return granted = granted || (userPermissionNames.indexOf(perm) > -1) || perm.length === 0;
        }
        if (typeof perm !== 'string' && perm instanceof Array) {
          let _granted = true;
          (perm as (string)[]).forEach(p => {
            _granted = _granted && (userPermissionNames.indexOf(p) > -1 || p.length === 0);
          })
          granted = granted || _granted;
        }
      })
    }

    if (granted) {
      return next();
    }

    return next(new exceptions.UnauthorizedException(`You don't have permission to access this resource`));

  } catch (error) {
    return next(error);
  }
};

export default userHasPermission;

