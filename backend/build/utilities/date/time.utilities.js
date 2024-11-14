"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.millisecondsToTimeString = void 0;
exports.getSecondsDifference = getSecondsDifference;
const strings_1 = require("../strings");
const millisecondsToTimeString = (milli) => {
    const milliseconds = milli % 1000;
    const seconds = Math.floor((milli / 1000) % 60);
    const minutes = Math.floor((milli / (60 * 1000)) % 60);
    const hours = Math.floor((milli / (60 * 60 * 1000)) % 60);
    return hours ?
        (0, strings_1.addLeadingZeros)(hours, 2) + ":" + (0, strings_1.addLeadingZeros)(minutes, 2) + ":" + (0, strings_1.addLeadingZeros)(seconds, 2) + "." + (0, strings_1.addLeadingZeros)(milliseconds, 3)
        : minutes ?
            (0, strings_1.addLeadingZeros)(minutes, 2) + ":" + (0, strings_1.addLeadingZeros)(seconds, 2) + "." + (0, strings_1.addLeadingZeros)(milliseconds, 3)
            : (0, strings_1.addLeadingZeros)(seconds, 2) + "." + (0, strings_1.addLeadingZeros)(milliseconds, 3);
};
exports.millisecondsToTimeString = millisecondsToTimeString;
/**
 * @since 02-12-2023 15:38:10
 */
function getSecondsDifference(endDate, startDate) {
    // Convert dates to milliseconds since Unix epoch
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endTime - startTime;
    // Convert milliseconds to seconds
    const differenceInSeconds = differenceInMilliseconds / 1000;
    return differenceInSeconds;
}
//# sourceMappingURL=time.utilities.js.map