import argon2 from "argon2";
import { randomBytes } from "crypto";
import jwt, { Algorithm } from "jsonwebtoken";
import { Service } from "typedi";
import config from "../../config";
import exceptions from "../../exceptions";
import { transformTimeRangeToDates } from "../../utilities/date/date.utilities";

/**
 * @classdesc This class should not extend BaseService because it's used in it
 */
@Service()
export default class AuthManager {
  public constructor() {}

  public generateToken(
    payload:
      | Levelup.CMS.V1.Security.JWTUserAuthPayload
      | Levelup.CMS.V1.Security.JWTPaymentAuthPayload,
    space: Levelup.CMS.V1.Auth.Entity.TJWTTokenSpace,
    isRefreshToken: boolean
  ): string {
    const expiration = isRefreshToken
      ? config.security.jwt.refreshTokenExpiration
      : config.security.jwt.tokenExpiration;
    const expirationRange = transformTimeRangeToDates(
      expiration,
      new Date(),
      "future"
    );
    if (!expirationRange)
      throw new exceptions.InternalServerError("Invalid expiration range");
    const exp = expirationRange.end;

    payload = { ...payload, space };

    return jwt.sign(
      {
        ...payload,
        exp: exp.getTime() / 1000,
      },
      config.security.jwt.secret,
      {
        algorithm: config.security.jwt.algorithm as Algorithm,
      }
    );
  }

  public verifyToken(token: string): any {
    return jwt.verify(token, config.security.jwt.secret);
  }

  public decodeToken(token: string): Levelup.CMS.V1.Security.JWTUserAuthPayload {
    return jwt.decode(token) as Levelup.CMS.V1.Security.JWTUserAuthPayload;
  }

  public async verifyPassword(password: string, hash: string) {
    const isValidPassword = await argon2.verify(hash, password);
    return isValidPassword;
  }

  public async hashPassword(password: string) {
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(password, { salt });

    return {
      salt: salt.toString("hex"),
      password: hashedPassword,
    };
  }
}



