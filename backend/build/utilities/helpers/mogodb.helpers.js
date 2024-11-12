import { ObjectId } from "mongodb";
import { errorToObject } from "../exceptions";
import initLogger from "../logging";
import CacheManager from "../../managers/cache-manager";
import Container from "typedi";
import { sortBy } from "lodash";
const logger = initLogger("UTILITY", `MongoDB-helpers`);
export const isObjectIdValid = (id) => {
    try {
        if (ObjectId.isValid(id) && String(new ObjectId(id)) === id)
            return true;
        return false;
    }
    catch (error) {
        logger.save.error({
            name: "isObjectIdValid",
            payload: {
                related_to: id,
                error: errorToObject(error),
            },
        });
        return false;
    }
};
export async function upgradeIndexes(model) {
    try {
        const cache = Container.get(CacheManager);
        const collectionKey = cache.generateForeignKey(`dbCollectionsPerformance:${model.modelName}`);
        logger.tree("collectionKey", collectionKey);
        const entries = await cache.getCollectionEntries(collectionKey);
        const indexes = sortBy(Object.values(entries || {}), (o) => -o.value.count);
        for (const index of indexes) {
            const { data } = index.value;
            const { fields, key } = data;
            const keys = Object.keys(fields);
            const indexes = await model.listIndexes();
            const indexKeys = indexes.map((i) => i.name);
            if (!indexKeys.includes(key)) {
                try {
                    logger.info("upgradeIndexes", model.collection.name, "Creating index", key);
                    await model.schema.index(fields, { name: key });
                }
                catch (error) {
                    logger.error("upgradeIndexes", model.collection.name, error);
                }
            }
        }
    }
    catch (error) {
        logger.error(error.message, error);
    }
}
export function ensureIndexes(model) {
    upgradeIndexes(model).then(() => {
        model
            .createIndexes()
            .then(() => {
            logger.success("ensure-indexes", model.collection.name, "Indexes have been successfully created or confirmed.");
        })
            .catch((error) => {
            logger.error("ensure-indexes", model.collection.name, error);
        });
    });
}
//# sourceMappingURL=mogodb.helpers.js.map