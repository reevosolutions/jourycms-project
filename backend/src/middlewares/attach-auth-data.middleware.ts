import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import CacheManager from "../managers/cache-manager";
import exceptions from "../exceptions";
import initLogger from "../utilities/logging";
import { getTokenFromHeader } from "./handle-jwt.middleware";
import UsersService from "../features/auth/services/users.service";

const logger = initLogger("MIDDLEWARE", "attachAuthData");

/**
 * @description Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachAuthData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.attached_entities) req.attached_entities = {};

    const cache = Container.get(CacheManager);
    const usersService = Container.get(UsersService);

    const token = getTokenFromHeader(req);
    req.current_token = token;

    req.attached_entities.token = token;

    let loadUser = true;
    let user: Levelup.CMS.V1.Users.Entity.ExposedUser | undefined;
    if (!token || req.jwt_expired) {
      if (!token) logger.warn("! JWT: No Token");
      else logger.error("x JWT: Expired");
      if (
        req.attached_entities?.service?.is_external ||
        !req.attached_entities?.service?.name
      )
        return next();
      else loadUser = false;
    }


    if (loadUser) {
      /* -------------------------------------------------------------------------- */
      /*                                    USER                                    */
      /* -------------------------------------------------------------------------- */
      logger.value("JWT Auth Object", req.auth);
      user = await cache.users.get(req.auth?._id);
      if (user) {
        if (user.is_deleted || user.attributes?.is_suspended)
          throw new exceptions.UnauthorizedException(
            "User deleted or suspended"
          );
        req.attached_entities.user = user;
        logger.success("Attached CurrentUser from redis", req.auth?._id);
      } else {
        try {
          const { data } = await usersService.getById(
            req.auth?._id,
            usersService.internalAuthData
          );
          if (data) user = data;
        } catch (error) {
          logger.error(error.message, error);
          throw new exceptions.UnauthorizedException("Could not load user from db");
        }
      }

      if (!user) throw new exceptions.UnauthorizedException("User not found");
    }

    
    /* -------------------------------------------------------------------------- */
    /*                                     APP                                    */
    /* -------------------------------------------------------------------------- */
    let app_id: string | undefined;
    if (req.attached_entities.user?.app)
      app_id = req.attached_entities.user.app;
    else if (req.headers["x-app-id"])
      app_id = req.headers["x-app-id"] as string;
    if (app_id) {
      const app = await cache.apps.get(app_id);

      if (app) {
        if (app.is_deleted || app.attributes?.is_suspended)
          throw new exceptions.UnauthorizedException(
            "Company deleted or suspended"
          );
        req.attached_entities.app = app;
      }
    }

    req.attached_entities.service
      ? logger.success(
          "✔️ service",
          req.attached_entities.service.is_external
            ? "external".red
            : "internal".blue,
          req.attached_entities.service.name?.green
        )
      : logger.warn("x not a service call");
    req.attached_entities.user
      ? logger.success(
          "✔️ user",
          req.attached_entities.user._id,
          req.attached_entities.user.email
        )
      : logger.warn("x no user");
    req.attached_entities.app
      ? logger.success(
          "✔️ app",
          req.attached_entities.app._id,
          req.attached_entities.app.name
        )
      : logger.warn("x no app");

    return next();
  } catch (error) {
    logger.error("🔥 Error attaching user to req: %o", error);
    return next(error);
  }
};

export default attachAuthData;
