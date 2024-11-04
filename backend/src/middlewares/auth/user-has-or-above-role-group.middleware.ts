import { NextFunction, Request, Response } from 'express';
import { userHasRoleGroupOrAbove } from '../../utilities/entities/auth.utilities';
import exceptions from '../../exceptions';


/**
 * Role groups are in this order:
 * - 0: master
 * - 10: system_administrators
 * - 20: application_account_owners
 * - 21: application_administrators
 * - 30: company_account_owners
 * - 31: company_administrators
 * - 50: administrators
 * - 51: agents
 * - 60: deliverers
 * - 70: sellers
 * - 100: users
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userHasOrAboveRoleGroup = (role_group: Levelup.V2.Auth.Entity.TRoleGroup | Levelup.V2.Auth.Entity.TRoleGroup[]) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    if (!role_group.length) return next();
    if (!req.attached_entities.user?.role_group)
      throw new exceptions.UnauthorizedException(`You don't have the right permissions`);
    let granted = false;
    (role_group).forEach(rg => {
      granted = granted || userHasRoleGroupOrAbove(req.attached_entities.user?.role_group, rg);
    })
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

export default userHasOrAboveRoleGroup;

