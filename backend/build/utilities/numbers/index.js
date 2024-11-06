"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundNumberDecimals = void 0;
const roundNumberDecimals = (num, decimals = 0) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
exports.roundNumberDecimals = roundNumberDecimals;
//# sourceMappingURL=index.js.map