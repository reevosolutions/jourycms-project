/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
export const sanitizeKeys = (obj) => {
    function sanitizeKey(key) {
        return key.replace(/\W+/g, '_');
    }
    if (Array.isArray(obj)) {
        return obj.map(value => sanitizeKeys(value));
    }
    else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [sanitizeKey(key)]: sanitizeKeys(obj[key]) })), {});
    }
    return obj;
};
export const sanitizeObjectBooleans = (obj) => {
    function sanitizeBoolean(value) {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return value;
    }
    if (Array.isArray(obj)) {
        return obj.map(value => sanitizeObjectBooleans(value));
    }
    else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: sanitizeObjectBooleans(obj[key]) })), {});
    }
    return sanitizeBoolean(obj);
};
export function fragmentObjectId(str) {
    if (str.length !== 24) {
        throw new Error('Input string must have a length of 24.');
    }
    const segments = [];
    // Create the first 4 segments, each of length 5
    for (let i = 0; i < 20; i += 5) {
        segments.push(str.substring(i, i + 5));
    }
    // Create the last segment with the remaining 4 characters
    segments.push(str.substring(20));
    return `${segments[4]}-${segments[1]}-${segments[3]}-${segments[2]}-${segments[0]}`;
}
export function ressembleObjectId(str) {
    if (str.length !== 28) {
        throw new Error('Input string must have a length of 28.');
    }
    const segments = str.split('-');
    return `${segments[4]}${segments[1]}${segments[3]}${segments[2]}${segments[0]}`;
}
export const hashString = (str) => {
    return Array.from(str)
        .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
};
//# sourceMappingURL=index.js.map