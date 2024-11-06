"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../config"));
const logging_1 = __importStar(require("../utilities/logging"));
const cache_manager_1 = __importDefault(require("../managers/cache-manager"));
const logger = (0, logging_1.default)(logging_1.LoggerContext.LOADER, "JOBS");
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
            if (config_1.default.environement !== "production")
                return;
            const delay = Math.floor(Math.random() * 1 * 1000);
            const maxFreezeTime = 15 * 60 * 1000;
            const TASK = "taskName";
            logger.event(TASK, { date: new Date(), delay });
            const cache = typedi_1.Container.get(cache_manager_1.default);
            setTimeout(async () => {
                const isTaskFrozen = await cache.tasks.isFrozen(config_1.default.currentService.name, TASK);
                logger.value(TASK, { isTaskFrozen });
                if (!isTaskFrozen) {
                    await cache.tasks.freeze(TASK, {
                        serviceName: config_1.default.currentService.name,
                        maxFreezeTime,
                    });
                    try {
                        // Do something here
                    }
                    catch (error) {
                        // Handle error here
                        logger.error(error.message, error);
                    }
                    await cache.tasks.unfreeze(config_1.default.currentService.name, TASK);
                }
                else {
                    setTimeout(async () => {
                        await cache.tasks.unfreeze(config_1.default.currentService.name, TASK);
                    }, maxFreezeTime);
                }
            }, delay);
        },
    },
];
/**
 * Export the jobs array as default
 */
exports.default = jobs;
//# sourceMappingURL=index.js.map