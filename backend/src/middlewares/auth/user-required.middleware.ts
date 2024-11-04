import { NextFunction, Request, Response } from 'express';
import exceptions from '../../exceptions';


/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const requireUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
     * The condition logic
     */
    if (!req.attached_entities.user?._id)
      throw new exceptions.UnauthorizedException('You must be logged in to access this resource');

    /**
     * Condition fulfilled
     */
    return next();
  } catch (error) {
    return next(error);
  }
}

export default requireUser;
