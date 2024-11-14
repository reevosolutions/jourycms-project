"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMimeType = getMimeType;
const mime_types_1 = require("mime-types");
/**
 * @description
 * - Use mime-types if you want a fast, extension-based solution.
 * - Use file-type if you need accuracy and are working with files where extensions might be unreliable.
 * @param {string} filePath
 * @param {boolean} fromExtension
 *  - If true, the function will return the mime type based on the file extension.
 *  - If false, the function will return the mime type based on the file content.
 * @returns
 */
async function getMimeType(filePath, fromExtension = true) {
    if (fromExtension)
        return (0, mime_types_1.lookup)(filePath);
    throw new Error("Not implemented");
}
//# sourceMappingURL=mime-type.js.map