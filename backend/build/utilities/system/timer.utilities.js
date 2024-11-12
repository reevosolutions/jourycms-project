import { millisecondsToTimeString } from "../date/time.utilities";
export class Timer {
    constructor() {
        this.starting = new Date().getTime();
    }
    /**
     * return milliseconds ago
     */
    get time() {
        return new Date().getTime() - this.starting;
    }
    get timeString() {
        return millisecondsToTimeString(new Date().getTime() - this.starting);
    }
}
export const initTimer = () => new Timer();
export const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
};
export const sleep = delay;
//# sourceMappingURL=timer.utilities.js.map