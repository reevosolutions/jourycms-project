import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import colors from 'colors';
import { bcrypt, bcryptVerify, md5 } from 'hash-wasm';
import moment from 'moment';
import config from '../../config';
/**
 * @description Generate signature for request, valide for 1 hour
 * @param api_key string
 * @param secret_key string
 * @returns string
 */
export const generateApiKeySignature = async (api_key, secret_key) => {
    // for security reason, we use timestamp as password
    // and hash it with bcrypt
    // check if signature is already saved in localstorage
    if (typeof window !== "undefined") {
        const oldSignature = JSON.parse(window.localStorage.getItem('sign') || 'null');
        if (oldSignature) {
            const timestamp = oldSignature === null || oldSignature === void 0 ? void 0 : oldSignature.substring(18, 28);
            const now = moment().unix();
            const diff = now - parseInt(timestamp);
            if (diff < 3000) {
                console.log('oldSignature', { oldSignature, diff });
                return oldSignature;
            }
        }
    }
    const timestamp = moment().unix().toString();
    const salt = (await md5(`${secret_key}${timestamp}`)).substring(0, 16);
    const hash = await bcrypt({
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
/**
 * @description Verify signature from request
 * @param signature string
 * @returns boolean
 */
export const verifyApiKeySignature = async (signature) => {
    let valid = false;
    try {
        const api_key = signature === null || signature === void 0 ? void 0 : signature.substring(89);
        if (!api_key)
            throw new Error('INVALID_SIGNATURE: ');
        // TODO: get secret_key from database
        const secret_key = process.env.NEXT_PUBLIC_API_SECRET_KEY || '';
        const salt = signature === null || signature === void 0 ? void 0 : signature.substring(1, 17);
        const timestamp = signature === null || signature === void 0 ? void 0 : signature.substring(18, 28);
        const timestampSalt = (await md5(`${secret_key}${timestamp}`)).substring(0, 16);
        const hash = signature === null || signature === void 0 ? void 0 : signature.substring(28, 88);
        if (timestampSalt !== salt)
            throw new Error('INVALID_SIGNATURE: ' + timestampSalt + ' - ' + salt);
        // check if signature is valid by timestamp
        const now = moment().unix();
        const diff = now - parseInt(timestamp);
        if (diff > 3600)
            throw new Error('INVALID_SIGNATURE.expired: ' + diff);
        console.log('bcryptHash', { signature, salt, hash, api_key, secret_key, now, timestamp: parseInt(timestamp), diff });
        // check if signature is valid by hash
        valid = await bcryptVerify({
            password: timestamp,
            hash: hash
        });
    }
    catch (error) {
        console.log(colors.red('ERROR_ON_VALIDATE_SIGNATURE'), error.message);
    }
    return valid;
};
export const run = async () => {
    console.clear();
    console.group('Hash');
    try {
        const signature = await generateApiKeySignature(process.env.NEXT_PUBLIC_API_KEY || '', process.env.NEXT_PUBLIC_API_SECRET_KEY || '');
        console.log('signature', signature);
        const valid = await verifyApiKeySignature(signature);
        console.log('valid', valid);
    }
    catch (error) {
        console.log(colors.red('error'), error);
    }
    console.groupEnd();
};
export function generateToken(payload) {
    payload = Object.assign({}, payload);
    return jwt.sign(Object.assign({}, payload), config.security.jwt.secret, {
        algorithm: config.security.jwt.algorithm,
    });
}
export function verifyToken(token) {
    return jwt.verify(token, config.security.jwt.secret);
}
export async function hashToken(token) {
    const salt = randomBytes(32);
    const hash = await argon2.hash(token, { salt });
    return {
        salt: salt.toString('hex'),
        hash
    };
}
export async function verifyHashedString(str, hash) {
    const isValidPassword = await argon2.verify(hash, str);
    return isValidPassword;
}
//# sourceMappingURL=api-key-signature.helpers.js.map