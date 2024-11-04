import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import CacheManager from "../managers/cache-manager";
import exceptions from "../exceptions";
import initLogger from "../utilities/logging";
import { getTokenFromHeader } from "./handle-jwt.middleware";

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

    const token = getTokenFromHeader(req);
    req.current_token = token;

    req.attached_entities.token = token;

    let loadUser = true;
    let user: Levelup.V2.Users.Entity.ExposedUser | undefined;
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

      user = await cache.users.get(req.auth?._id);
      if (user) {
        if (user.is_deleted || user.attributes?.is_suspended)
          throw new exceptions.UnauthorizedException(
            "User deleted or suspended"
          );
        req.attached_entities.user = user;
        logger.success("attachCurrentUser from redis", req.auth?._id);
      } else {
        throw new exceptions.UnauthorizedException("User not found");
      }

      /* -------------------------------------------------------------------------- */
      /*                                ORIGINAL USER                               */
      /* -------------------------------------------------------------------------- */
      const original_user_id = req.headers["x-original-user"] as string;
      if (original_user_id) {
        const original_user = await cache.users.get(original_user_id);
        if (original_user) {
          if (
            original_user.is_deleted ||
            original_user.attributes?.is_suspended
          )
            throw new exceptions.UnauthorizedException(
              "Original user deleted or suspended"
            );
          req.attached_entities.original_user = original_user;
        } else {
          throw new exceptions.BadRequestException("Original user not found");
        }
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 LOAD STORE                                 */
    /* -------------------------------------------------------------------------- */
    let store_id = req.headers["x-store-id"] as string;
    if (
      !store_id &&
      user &&
      user.role_group === "sellers" &&
      user.attributes?.seller?.stores?.length >= 1
    ) {
      store_id =
        user.attributes?.seller?.last_managed_store ||
        user.attributes?.seller?.stores[0];
    }
    if (store_id) {
      // TODO reactivate this after;
      if (
        user &&
        (user.role_group !== "sellers" ||
          !(user.attributes?.seller?.stores || []).includes(store_id))
      ) {
        throw new exceptions.UnauthorizedException("User do not own store");
      }
      const store = await cache.stores.get(store_id);
      if (store) {
        if (store.is_deleted || store.attributes.is_suspended) {
          throw new exceptions.UnauthorizedException("Store deleted or banned");
        }
        req.attached_entities.store = store;
      } else throw new exceptions.UnauthorizedException("Store not found");
    }

    /* -------------------------------------------------------------------------- */
    /*                                 LOAD OFFICE                                */
    /* -------------------------------------------------------------------------- */
    const office_id = req.headers["x-office-id"] as string;
    if (office_id) {
      // if(!user.assignments.office_snapshots.map(office=>office._id).includes(office_id)){
      //   logger.error('exceptions.UnauthorizedException: user do not belong to this office');
      //   return next(new exceptions.UnauthorizedException('User do not belong to this office'));
      // }
      const office = await cache.offices.get(office_id);
      if (office) {
        req.attached_entities.office = office;
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   COMPANY                                  */
    /* -------------------------------------------------------------------------- */
    let company_id: string | undefined;
    if (req.attached_entities.store?.company)
      company_id = req.attached_entities.store.company;
    else if (req.attached_entities.user?.company)
      company_id = req.attached_entities.user.company;
    else if (req.attached_entities.office?.company)
      company_id = req.attached_entities.office.company;
    else if (req.headers["x-company-id"])
      company_id = req.headers["x-company-id"] as string;
    if (company_id) {
      const company = await cache.companies.get(company_id);

      if (company) {
        if (company.is_deleted || company.attributes?.is_suspended)
          throw new exceptions.UnauthorizedException(
            "Company deleted or suspended"
          );
        req.attached_entities.company = company;
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   COUNTRY                                  */
    /* -------------------------------------------------------------------------- */
    if (req.attached_entities.office?.address?.country_code)
      req.attached_entities.country =
        req.attached_entities.office.address.country_code;
    else if (req.attached_entities.company?.address?.country_code)
      req.attached_entities.country =
        req.attached_entities.company.address.country_code;
    else if (req.attached_entities.store?.address?.country_code)
      req.attached_entities.country =
        req.attached_entities.store.address.country_code;
    else if (req.attached_entities.user?.profile?.address?.country_code)
      req.attached_entities.country =
        req.attached_entities.user.profile.address.country_code;
    /* -------------------------------------------------------------------------- */
    /*                                     APP                                    */
    /* -------------------------------------------------------------------------- */
    let app_id: string | undefined;
    if (req.attached_entities.store?.app)
      app_id = req.attached_entities.store.app;
    else if (req.attached_entities.user?.app)
      app_id = req.attached_entities.user.app;
    else if (req.attached_entities.company?.app)
      app_id = req.attached_entities.company.app;
    else if (req.attached_entities.office?.app)
      app_id = req.attached_entities.office.app;
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
    req.attached_entities.company
      ? logger.success(
          "✔️ company",
          req.attached_entities.company._id,
          req.attached_entities.company.name
        )
      : logger.warn("x no company");
    req.attached_entities.office
      ? logger.success(
          "✔️ office",
          req.attached_entities.office._id,
          req.attached_entities.office.name
        )
      : logger.warn("x no office");
    req.attached_entities.store
      ? logger.success(
          "✔️ store",
          req.attached_entities.store._id,
          req.attached_entities.store.name
        )
      : logger.warn("x no store");

    return next();
  } catch (error) {
    logger.error("🔥 Error attaching user to req: %o", error);
    return next(error);
  }
};

export default attachAuthData;
