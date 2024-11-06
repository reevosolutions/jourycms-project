"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectIdValid = void 0;
exports.upgradeIndexes = upgradeIndexes;
exports.ensureIndexes = ensureIndexes;
const mongodb_1 = require("mongodb");
const exceptions_1 = require("../exceptions");
const logging_1 = __importDefault(require("../logging"));
const cache_manager_1 = __importDefault(require("../../managers/cache-manager"));
const typedi_1 = __importDefault(require("typedi"));
const lodash_1 = require("lodash");
const logger = (0, logging_1.default)("UTILITY", `MongoDB-helpers`);
const isObjectIdValid = (id) => {
    try {
        if (mongodb_1.ObjectId.isValid(id) && String(new mongodb_1.ObjectId(id)) === id)
            return true;
        return false;
    }
    catch (error) {
        logger.save.error({
            name: "isObjectIdValid",
            payload: {
                related_to: id,
                error: (0, exceptions_1.errorToObject)(error),
            },
        });
        return false;
    }
};
exports.isObjectIdValid = isObjectIdValid;
async function upgradeIndexes(model) {
    try {
        const cache = typedi_1.default.get(cache_manager_1.default);
        const collectionKey = cache.generateForeignKey(`dbCollectionsPerformance:${model.modelName}`);
        logger.tree("collectionKey", collectionKey);
        const entries = await cache.getCollectionEntries(collectionKey);
        const indexes = (0, lodash_1.sortBy)(Object.values(entries || {}), (o) => -o.value.count);
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
function ensureIndexes(model) {
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