"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOnChunkedArray = exports.chunkArray = exports.combineArrays = void 0;
const combineArrays = ([head, ...[headTail, ...tailTail]], separator = " ") => {
    console.log("combineArrays", { head, headTail, tailTail });
    if (!headTail)
        return head;
    const combined = headTail.reduce((acc, x) => {
        return acc.concat(head.map(h => `${h}${separator}${x}`));
    }, []);
    return (0, exports.combineArrays)([combined, ...tailTail], separator);
};
exports.combineArrays = combineArrays;
const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
};
exports.chunkArray = chunkArray;
const applyOnChunkedArray = async (arr, chunkSize, callback) => {
    arr = arr || [];
    const chunks = (0, exports.chunkArray)(arr, chunkSize);
    for (let i = 0; i < chunks.length; i += 1) {
        await callback(chunks[i], i);
    }
};
exports.applyOnChunkedArray = applyOnChunkedArray;
//# sourceMappingURL=index.js.map