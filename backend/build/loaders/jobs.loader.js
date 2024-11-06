"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduled_jobs_1 = __importDefault(require("../scheduled-jobs"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const loadScheduledJobs = () => {
    scheduled_jobs_1.default.forEach(j => {
        const job = node_schedule_1.default.scheduleJob(j.cron, j.callback);
        return job;
    });
};
exports.default = loadScheduledJobs;
//# sourceMappingURL=jobs.loader.js.map