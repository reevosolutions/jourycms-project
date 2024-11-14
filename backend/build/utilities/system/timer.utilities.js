"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.delay = exports.initTimer = exports.Timer = void 0;
const time_utilities_1 = require("../date/time.utilities");
class Timer {
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
        return (0, time_utilities_1.millisecondsToTimeString)(new Date().getTime() - this.starting);
    }
}
exports.Timer = Timer;
const initTimer = () => new Timer();
exports.initTimer = initTimer;
const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, ms);
    });
};
exports.delay = delay;
exports.sleep = exports.delay;
//# sourceMappingURL=timer.utilities.js.map