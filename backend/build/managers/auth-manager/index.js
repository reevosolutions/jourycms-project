"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const exceptions_1 = __importDefault(require("../../exceptions"));
const date_utilities_1 = require("../../utilities/date/date.utilities");
/**
 * @classdesc This class should not extend BaseService because it's used in it
 */
let AuthManager = class AuthManager {
    constructor() { }
    generateToken(payload, space, isRefreshToken) {
        const expiration = isRefreshToken
            ? config_1.default.security.jwt.refreshTokenExpiration
            : config_1.default.security.jwt.tokenExpiration;
        const expirationRange = (0, date_utilities_1.transformTimeRangeToDates)(expiration, new Date(), "future");
        if (!expirationRange)
            throw new exceptions_1.default.InternalServerError("Invalid expiration range");
        const exp = expirationRange.end;
        payload = Object.assign(Object.assign({}, payload), { space });
        return jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { exp: exp.getTime() / 1000 }), config_1.default.security.jwt.secret, {
            algorithm: config_1.default.security.jwt.algorithm,
        });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.default.security.jwt.secret);
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    async verifyPassword(password, hash) {
        const isValidPassword = await argon2_1.default.verify(hash, password);
        return isValidPassword;
    }
    async hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(32);
        const hashedPassword = await argon2_1.default.hash(password, { salt });
        return {
            salt: salt.toString("hex"),
            password: hashedPassword,
        };
    }
};
AuthManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthManager);
exports.default = AuthManager;
//# sourceMappingURL=index.js.map