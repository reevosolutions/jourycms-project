import { flatten } from "lodash";
import Container from "typedi";
import CacheManager from "../../../managers/cache-manager";
import initLogger, { LoggerContext } from "../../logging";
const logger = initLogger(LoggerContext.UTILITY, "trackUsedFields");
export const trackUsedFieldsDBMiddleware = function (
// eslint-disable-next-line @typescript-eslint/ban-types
next) {
    try {
        const result = {
            filter: this.getFilter() || {},
            sort: this.getOptions().sort || { updated_at: -1 },
            model: this.model.modelName,
            date: new Date(),
            key: "",
            fields: {},
        };
        const fields = Object.entries(Object.assign(Object.assign({}, result.filter), result.sort)).reduce((prev, [key, value]) => {
            if (key === "$or") {
                const keys = flatten(value.map((o) => Object.keys(o))).reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr]: 1 })), {});
                return Object.assign(Object.assign({}, prev), keys);
            }
            else {
                return Object.assign(Object.assign({}, prev), { [key]: value === -1 ? -1 : 1 });
            }
        }, {});
        result.fields = fields;
        const key = Object.entries(fields)
            .reduce((prev, [key, value]) => [...prev, `${key}_${value}`], [])
            .sort()
            .join("_");
        result.key = key;
        const CACHE_KEY = `dbCollectionsPerformance:${result.model}`;
        const CACHE_ID = key;
        const cache = Container.get(CacheManager);
        cache
            .getForeign(CACHE_KEY, CACHE_ID)
            .then((value) => {
            if (!value || typeof value === "number") {
                value = {
                    count: 0,
                    data: result,
                };
            }
            value.count++;
            logger.event(`${result.model} used index: ${key.cyan} for times: `, value.count);
            cache.setForeign(CACHE_KEY, CACHE_ID, value, {});
        })
            .catch((error) => {
            logger.error(error.message, error);
        });
    }
    catch (error) {
        logger.error(error.message, error);
    }
    next();
};
//# sourceMappingURL=optimization.utilities.js.map