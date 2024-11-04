import { Query } from "mongoose";
import { flatten } from "lodash";
import Container from "typedi";
import CacheManager from "../../../managers/cache-manager";
import initLogger, { LoggerContext } from "../../logging";

const logger = initLogger(LoggerContext.UTILITY, "trackUsedFields");

export const trackUsedFieldsDBMiddleware = function <
  E extends Levelup.V2.SystemStructure.Services.Models.AllModels
>(
  this: Query<
    Levelup.V2.SystemStructure.LevelupEntityType<E>,
    Levelup.V2.SystemStructure.LevelupEntityType<E>
  >,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
) {
  try {
    const result = {
      filter: this.getFilter() || {},
      sort: this.getOptions().sort || { updated_at: -1 },
      model: this.model.modelName,
      date: new Date(),
      key: "",
      fields: {},
    };

    const fields = Object.entries({ ...result.filter, ...result.sort }).reduce(
      (prev, [key, value]) => {
        if (key === "$or") {
          const keys = flatten(
            (value as { [k: string]: any }[]).map((o) => Object.keys(o))
          ).reduce((prev, curr) => ({ ...prev, [curr]: 1 }), {});
          return {
            ...prev,
            ...keys,
          };
        } else {
          return {
            ...prev,
            [key]: value === -1 ? -1 : 1,
          };
        }
      },
      {}
    );
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
      .getForeign<
        | number
        | {
            count: number;
            data: {
              filter: {
                [x: string]: any;
              };
              sort: {
                [x: string]: any;
              };
              model: string;
              date: Date;
              key: string;
              fields: {
                [x: string]: 1 | -1;
              };
            };
          }
      >(CACHE_KEY, CACHE_ID)
      .then((value) => {
        if (!value || typeof value === "number") {
          value = {
            count: 0,
            data: result,
          };
        }
        value.count++;
        logger.event(
          `${result.model} used index: ${key.cyan} for times: `,
          value.count
        );
        cache.setForeign(CACHE_KEY, CACHE_ID, value, {});
      })
      .catch((error) => {
        logger.error(error.message, error);
      });
  } catch (error) {
    logger.error(error.message, error);
  }
  next();
};
