"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:58:06
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVariantNames = exports.combineVariantProperties = void 0;
const combineVariantProperties = (prevResult, [head, ...[headTail, ...tailTail]]) => {
    console.log("combineVariantProperties", { head, headTail, tailTail });
    if (!head)
        return prevResult;
    let result = [];
    const res = head.options.map(o => [{ property: head.property, option: o }]);
    if (!(prevResult === null || prevResult === void 0 ? void 0 : prevResult.length))
        result = res;
    else
        result = prevResult.reduce((acc, x) => {
            return acc.concat(res.map(h => [...x, ...h]));
        }, []);
    if (headTail) {
        return (0, exports.combineVariantProperties)(result, [headTail, ...tailTail]);
    }
    else {
        return result;
    }
};
exports.combineVariantProperties = combineVariantProperties;
const generateVariantNames = (result, separator = " | ") => {
    console.log("generateVariantNames", { result });
    return result.map(r => {
        return {
            name: r.map(({ option }) => option.label).join(separator),
            properties: r
        };
    });
};
exports.generateVariantNames = generateVariantNames;
//# sourceMappingURL=variants.utilities.js.map