"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.verifyApiKeySignature = exports.generateApiKeySignature = void 0;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.hashToken = hashToken;
exports.verifyHashedString = verifyHashedString;
const crypto_1 = require("crypto");
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const colors_1 = __importDefault(require("colors"));
const hash_wasm_1 = require("hash-wasm");
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../../config"));
/**
 * @description Generate signature for request, valide for 1 hour
 * @param api_key string
 * @param secret_key string
 * @returns string
 */
const generateApiKeySignature = async (api_key, secret_key) => {
    // for security reason, we use timestamp as password
    // and hash it with bcrypt
    // check if signature is already saved in localstorage
    if (typeof window !== "undefined") {
        const oldSignature = JSON.parse(window.localStorage.getItem('sign') || 'null');
        if (oldSignature) {
            const timestamp = oldSignature === null || oldSignature === void 0 ? void 0 : oldSignature.substring(18, 28);
            const now = (0, moment_1.default)().unix();
            const diff = now - parseInt(timestamp);
            if (diff < 3000) {
                console.log('oldSignature', { oldSignature, diff });
                return oldSignature;
            }
        }
    }
    const timestamp = (0, moment_1.default)().unix().toString();
    const salt = (await (0, hash_wasm_1.md5)(`${secret_key}${timestamp}`)).substring(0, 16);
    const hash = await (0, hash_wasm_1.bcrypt)({
        password: timestamp,
        salt,
        costFactor: 8,
        outputType: 'encoded'
    });
    const signature = `$${salt}$${timestamp}${hash}$${api_key}`;
    // save signature to localstorage
    if (typeof window !== "undefined")
        window.localStorage.setItem('sign', JSON.stringify(signature));
    return signature;
};
exports.generateApiKeySignature = generateApiKeySignature;
/**
 * @description Verify signature from request
 * @param signature string
 * @returns boolean
 */
const verifyApiKeySignature = async (signature) => {
    let valid = false;
    try {
        const api_key = signature === null || signature === void 0 ? void 0 : signature.substring(89);
        if (!api_key)
            throw new Error('INVALID_SIGNATURE: ');
        // TODO: get secret_key from database
        const secret_key = process.env.NEXT_PUBLIC_API_SECRET_KEY || '';
        const salt = signature === null || signature === void 0 ? void 0 : signature.substring(1, 17);
        const timestamp = signature === null || signature === void 0 ? void 0 : signature.substring(18, 28);
        const timestampSalt = (await (0, hash_wasm_1.md5)(`${secret_key}${timestamp}`)).substring(0, 16);
        const hash = signature === null || signature === void 0 ? void 0 : signature.substring(28, 88);
        if (timestampSalt !== salt)
            throw new Error('INVALID_SIGNATURE: ' + timestampSalt + ' - ' + salt);
        // check if signature is valid by timestamp
        const now = (0, moment_1.default)().unix();
        const diff = now - parseInt(timestamp);
        if (diff > 3600)
            throw new Error('INVALID_SIGNATURE.expired: ' + diff);
        console.log('bcryptHash', { signature, salt, hash, api_key, secret_key, now, timestamp: parseInt(timestamp), diff });
        // check if signature is valid by hash
        valid = await (0, hash_wasm_1.bcryptVerify)({
            password: timestamp,
            hash: hash
        });
    }
    catch (error) {
        console.log(colors_1.default.red('ERROR_ON_VALIDATE_SIGNATURE'), error.message);
    }
    return valid;
};
exports.verifyApiKeySignature = verifyApiKeySignature;
const run = async () => {
    console.clear();
    console.group('Hash');
    try {
        const signature = await (0, exports.generateApiKeySignature)(process.env.NEXT_PUBLIC_API_KEY || '', process.env.NEXT_PUBLIC_API_SECRET_KEY || '');
        console.log('signature', signature);
        const valid = await (0, exports.verifyApiKeySignature)(signature);
        console.log('valid', valid);
    }
    catch (error) {
        console.log(colors_1.default.red('error'), error);
    }
    console.groupEnd();
};
exports.run = run;
function generateToken(payload) {
    payload = Object.assign({}, payload);
    return jsonwebtoken_1.default.sign(Object.assign({}, payload), config_1.default.security.jwt.secret, {
        algorithm: config_1.default.security.jwt.algorithm,
    });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.default.security.jwt.secret);
}
async function hashToken(token) {
    const salt = (0, crypto_1.randomBytes)(32);
    const hash = await argon2_1.default.hash(token, { salt });
    return {
        salt: salt.toString('hex'),
        hash
    };
}
async function verifyHashedString(str, hash) {
    const isValidPassword = await argon2_1.default.verify(hash, str);
    return isValidPassword;
}
//# sourceMappingURL=api-key-signature.helpers.js.map