var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import argon2 from "argon2";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import config from "../../config";
import exceptions from "../../exceptions";
import { transformTimeRangeToDates } from "../../utilities/date/date.utilities";
/**
 * @classdesc This class should not extend BaseService because it's used in it
 */
let AuthManager = class AuthManager {
    constructor() { }
    generateToken(payload, space, isRefreshToken) {
        const expiration = isRefreshToken
            ? config.security.jwt.refreshTokenExpiration
            : config.security.jwt.tokenExpiration;
        const expirationRange = transformTimeRangeToDates(expiration, new Date(), "future");
        if (!expirationRange)
            throw new exceptions.InternalServerError("Invalid expiration range");
        const exp = expirationRange.end;
        payload = Object.assign(Object.assign({}, payload), { space });
        return jwt.sign(Object.assign(Object.assign({}, payload), { exp: exp.getTime() / 1000 }), config.security.jwt.secret, {
            algorithm: config.security.jwt.algorithm,
        });
    }
    verifyToken(token) {
        return jwt.verify(token, config.security.jwt.secret);
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
    async verifyPassword(password, hash) {
        const isValidPassword = await argon2.verify(hash, password);
        return isValidPassword;
    }
    async hashPassword(password) {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(password, { salt });
        return {
            salt: salt.toString("hex"),
            password: hashedPassword,
        };
    }
};
AuthManager = __decorate([
    Service(),
    __metadata("design:paramtypes", [])
], AuthManager);
export default AuthManager;
//# sourceMappingURL=index.js.map