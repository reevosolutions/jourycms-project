import { Container } from "typedi";
import config from "../config";
import initLogger, { LoggerContext } from "../utilities/logging";
import CacheManager from "../managers/cache-manager";
const logger = initLogger(LoggerContext.LOADER, "JOBS");
/**
 * Cron syntax breakdown:
 *  - ┌───────────── second (optional)
 *  - │ ┌───────────── minute (0 - 59)
 *  - │ │ ┌───────────── hour (0 - 23)
 *  - │ │ │ ┌───────────── day of the month (1 - 31)
 *  - │ │ │ │ ┌───────────── month (1 - 12)
 *  - │ │ │ │ │ ┌───────────── day of the week (0 - 7) (0 or 7 are Sunday)
 *  - │ │ │ │ │ │
 *  - 0 * * * * *
 *
 *  Example usage:
 *  - `0 0 0 * * *`: Runs at midnight every day.
 *  - `0 0 12 * * *`: Runs at noon (12:00 PM) every day.
 *  - `0 0 0 1 * *`: Runs at midnight on the first day of every month.
 *  - `0 0 0 * * 1`: Runs at midnight every Monday.
 *  - `0 * /30 * * * *`: Runs every 30 minutes.
 *  - `0 0 0 * /2 * *`: Runs at midnight every other day.
 *
 */
const jobs = [
    // all stop-desk parcels returned to center at midnight
    {
        cron: `0 0 0 * * *`,
        callback: async () => {
            if (config.environement !== "production")
                return;
            const delay = Math.floor(Math.random() * 1 * 1000);
            const maxFreezeTime = 15 * 60 * 1000;
            const TASK = "taskName";
            logger.event(TASK, { date: new Date(), delay });
            const cache = Container.get(CacheManager);
            setTimeout(async () => {
                const isTaskFrozen = await cache.tasks.isFrozen(config.currentService.name, TASK);
                logger.value(TASK, { isTaskFrozen });
                if (!isTaskFrozen) {
                    await cache.tasks.freeze(TASK, {
                        serviceName: config.currentService.name,
                        maxFreezeTime,
                    });
                    try {
                        // Do something here
                    }
                    catch (error) {
                        // Handle error here
                        logger.error(error.message, error);
                    }
                    await cache.tasks.unfreeze(config.currentService.name, TASK);
                }
                else {
                    setTimeout(async () => {
                        await cache.tasks.unfreeze(config.currentService.name, TASK);
                    }, maxFreezeTime);
                }
            }, delay);
        },
    },
];
/**
 * Export the jobs array as default
 */
export default jobs;
//# sourceMappingURL=index.js.map