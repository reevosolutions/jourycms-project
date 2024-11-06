"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileExtensionFromUrl = getFileExtensionFromUrl;
function getFileExtensionFromUrl(url) {
    // Regular expression to match the file extension
    const regex = /\/[^\/?#]+\.(\w+)(?=[?#]|$)/;
    const match = url.match(regex);
    return match ? match[1] : undefined;
}
//# sourceMappingURL=index.js.map