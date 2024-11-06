"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateRangObject = exports.isDateWithinLastNTimeRange = exports.isDateWithinLastNYears = exports.isDateWithinLastNMonths = exports.isDateWithinLastNWeeks = exports.isDateWithinLastNDays = exports.isDateWithinLastNHours = exports.isDateWithinLastNMinutes = exports.isDateWithinLastNSeconds = void 0;
exports.transformTimeRangeToDates = transformTimeRangeToDates;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
*/
const moment_1 = __importDefault(require("moment"));
/**
 * @since 17-10-2023 12:39:25
 * @description This function takes a time range string (e.g. "5 minutes") and returns a start date and end date for that time range
 * - The time range must be specified with a number followed by a unit of time (e.g. "5 minutes", "3 hours", "1 day")
 * - Valid units of time are "second", "minute", "hour", "day", "week", "month", and "year"
 * - Valid units of time can be abbreviated to "s", "m", "h", "d", "w", "M", and "y"
 * - If no unit of time is specified, the default unit is "day"
 * - If the unit of time is plural (e.g. "days"), it must be pluralized using an "s"
 * - If the unit of time is abbreviated, it must be followed by an "s"
 * - The time range string must be in the format "[number] [unit of time]s?"
 * - For example, "5 minutes" is valid, but "5 minute" is not valid, and "5 m" is not valid either
 * - If the unit of time is plural (e.g. "days"), it must be pluralized using an "s"
 * - This function return {false} if the time range string is not in the correct format
 * @param {string} timeRange
*/
function transformTimeRangeToDates(timeRange, currentDate = new Date(), rangeIn = 'past') {
    if (typeof timeRange !== 'string' || !timeRange)
        return false;
    const now = (0, moment_1.default)(currentDate); // Get the current date and time
    let start, end, past, future;
    const match = timeRange.match(/^(\d+)\s?(second|minute|hour|day|week|month|year|s|m|h|d|w|M|y)s?$/i);
    if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        switch (unit) {
            case 's':
            case 'second':
                // Seconds
                past = now.clone().subtract(value, 'seconds');
                future = now.clone().add(value, 'seconds');
                break;
            case 'm':
            case 'minute':
                // Minutes
                past = now.clone().subtract(value, 'minutes');
                future = now.clone().add(value, 'minutes');
                break;
            case 'h':
            case 'hour':
                // Hours
                past = now.clone().subtract(value, 'hours');
                future = now.clone().add(value, 'hours');
                break;
            case 'd':
            case 'day':
                // Days
                past = now.clone().subtract(value, 'days');
                future = now.clone().add(value, 'days');
                break;
            case 'w':
            case 'week':
                // Weeks
                past = now.clone().subtract(value, 'weeks');
                future = now.clone().add(value, 'weeks');
                break;
            case 'M':
            case 'month':
                // Months
                past = now.clone().subtract(value, 'months');
                future = now.clone().add(value, 'months');
                break;
            case 'y':
            case 'year':
                // Years
                past = now.clone().subtract(value, 'years');
                future = now.clone().add(value, 'years');
                break;
            default:
                return false;
        }
        start = rangeIn === 'past' ? past : now;
        end = rangeIn === 'past' ? now : future;
        return {
            start: start.toDate(),
            end: end.toDate(),
        };
    }
    else {
        throw new Error('Invalid time range format');
    }
}
const isDateWithinLastNSeconds = (date, seconds) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (seconds * 1000);
};
exports.isDateWithinLastNSeconds = isDateWithinLastNSeconds;
const isDateWithinLastNMinutes = (date, minutes) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (minutes * 60 * 1000);
};
exports.isDateWithinLastNMinutes = isDateWithinLastNMinutes;
const isDateWithinLastNHours = (date, hours) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (hours * 60 * 60 * 1000);
};
exports.isDateWithinLastNHours = isDateWithinLastNHours;
const isDateWithinLastNDays = (date, days) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (days * 24 * 60 * 60 * 1000);
};
exports.isDateWithinLastNDays = isDateWithinLastNDays;
const isDateWithinLastNWeeks = (date, weeks) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (weeks * 7 * 24 * 60 * 60 * 1000);
};
exports.isDateWithinLastNWeeks = isDateWithinLastNWeeks;
const isDateWithinLastNMonths = (date, months) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (months * 30 * 24 * 60 * 60 * 1000);
};
exports.isDateWithinLastNMonths = isDateWithinLastNMonths;
const isDateWithinLastNYears = (date, years) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - date.getTime();
    return timeDifference < (years * 365 * 24 * 60 * 60 * 1000);
};
exports.isDateWithinLastNYears = isDateWithinLastNYears;
const isDateWithinLastNTimeRange = (date, timeRange) => {
    const timeRangeDates = transformTimeRangeToDates(timeRange);
    if (!timeRangeDates) {
        throw new Error('Invalid time range format');
    }
    return date >= timeRangeDates.start && date <= timeRangeDates.end;
};
exports.isDateWithinLastNTimeRange = isDateWithinLastNTimeRange;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 23:01:17
 */
const isDateRangObject = (obj) => {
    if (obj && obj.start && obj.end) {
        return true;
    }
};
exports.isDateRangObject = isDateRangObject;
//# sourceMappingURL=date.utilities.js.map