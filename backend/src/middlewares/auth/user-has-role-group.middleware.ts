import { NextFunction, Request, Response } from 'express';
import exceptions from '../../exceptions';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userHasRoleGroup = (role_group: Levelup.V2.Auth.Entity.TRoleGroup | Levelup.V2.Auth.Entity.TRoleGroup[]) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
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


    /**
     * The condition logic
     */
    if (typeof role_group === 'string') {
      role_group = [role_group]
    }
    if (!role_group.length)
      return next();
    if (!req.attached_entities.user?.role_group)
      throw new exceptions.UnauthorizedException(`You don't have the right permissions`);
    const granted = role_group.includes(req.attached_entities.user?.role_group);
    if (!granted)
      throw new exceptions.UnauthorizedException(`You don't have the right permissions`);

    /**
     * Condition fulfilled
     */
    return next();
  } catch (error) {
    return next(error);
  }
};

export default userHasRoleGroup;

