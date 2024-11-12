import jobs from "../scheduled-jobs";
import schedule from 'node-schedule';
const loadScheduledJobs = () => {
    jobs.forEach(j => {
        const job = schedule.scheduleJob(j.cron, j.callback);
        return job;
    });
};
export default loadScheduledJobs;
//# sourceMappingURL=jobs.loader.js.map