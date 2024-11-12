/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
export const combineArrays = ([head, ...[headTail, ...tailTail]], separator = " ") => {
    console.log("combineArrays", { head, headTail, tailTail });
    if (!headTail)
        return head;
    const combined = headTail.reduce((acc, x) => {
        return acc.concat(head.map(h => `${h}${separator}${x}`));
    }, []);
    return combineArrays([combined, ...tailTail], separator);
};
export const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
};
export const applyOnChunkedArray = async (arr, chunkSize, callback) => {
    arr = arr || [];
    const chunks = chunkArray(arr, chunkSize);
    for (let i = 0; i < chunks.length; i += 1) {
        await callback(chunks[i], i);
    }
};
//# sourceMappingURL=index.js.map