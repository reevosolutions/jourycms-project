import { defaults } from "../../helpers/utils.helpers";
import { extractPartialObject } from "../../objects";
/**
 *
 * @param {number} chunkSize
 * - optional
 * - default 100
 * @param {number} maxItems
 * - optional
 * - default -1
 * @param {number} totalCount
 * - optional
 * - default 0
 * @update 2020-12-06 added allowDiskUse(true) to query
 */
export const applyOnDocumentChunks = async (options) => {
    const { query, onChunk, onItem, chunkSize, maxItems, totalCount, } = Object.assign(Object.assign({}, extractPartialObject(options, ["query", "onChunk", "onItem"])), defaults(extractPartialObject(options, ["chunkSize", "maxItems", "totalCount"]), {
        chunkSize: 100,
        maxItems: -1,
        totalCount: 0,
    }));
    let page = 0;
    let items_found = true;
    let counter = 0;
    while (items_found && (maxItems === -1 || counter < maxItems)) {
        page++;
        console.log(`loading ${chunkSize} items, page: ${page}`);
        const items = await query
            .clone()
            .allowDiskUse(true)
            .limit(chunkSize)
            .skip((page - 1) * chunkSize);
        console.log(`loaded ${items.length} items, page: ${page}`, query.getQuery());
        items_found = items.length > 0;
        if (!onItem)
            counter += page * chunkSize;
        if (onChunk && items_found) {
            const progress = totalCount
                ? parseFloat(((counter * 100) / totalCount).toFixed(2))
                : 0;
            await onChunk(items, page, progress);
        }
        if (onItem) {
            for (let index = 0; index < items.length; index++) {
                if (maxItems > 0 && counter >= maxItems) {
                    break;
                }
                const item = items[index];
                counter++;
                const progress = totalCount
                    ? parseFloat(((counter * 100) / totalCount).toFixed(2))
                    : 0;
                await onItem(item, counter, page, progress);
            }
        }
    }
};
//# sourceMappingURL=chunks.utilities.js.map