"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOE_SIZES_GROUPED_BY_SYSTEM = exports.ALL_SHOE_SIZES = exports.KIDS_SHOE_SIZE_INCH = exports.KIDS_SHOE_SIZE_CM = exports.KIDS_SHOE_SIZE_EU = exports.KIDS_SHOE_SIZE_UK = exports.KIDS_SHOE_SIZE_US = exports.ADULT_SHOE_SIZE_INCH = exports.ADULT_SHOE_SIZE_CM = exports.ADULT_SHOE_SIZE_EU = exports.ADULT_SHOE_SIZE_UK = exports.ADULT_SHOE_SIZE_US = void 0;
exports.convertShoeSize = convertShoeSize;
// Adult shoe sizes
const ADULT_SHOE_SIZE_US = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
exports.ADULT_SHOE_SIZE_US = ADULT_SHOE_SIZE_US;
const ADULT_SHOE_SIZE_UK = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
exports.ADULT_SHOE_SIZE_UK = ADULT_SHOE_SIZE_UK;
const ADULT_SHOE_SIZE_EU = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
exports.ADULT_SHOE_SIZE_EU = ADULT_SHOE_SIZE_EU;
const ADULT_SHOE_SIZE_CM = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
exports.ADULT_SHOE_SIZE_CM = ADULT_SHOE_SIZE_CM;
const ADULT_SHOE_SIZE_INCH = [8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
exports.ADULT_SHOE_SIZE_INCH = ADULT_SHOE_SIZE_INCH;
// Kids' shoe sizes
const KIDS_SHOE_SIZE_US = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13.5];
exports.KIDS_SHOE_SIZE_US = KIDS_SHOE_SIZE_US;
const KIDS_SHOE_SIZE_UK = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
exports.KIDS_SHOE_SIZE_UK = KIDS_SHOE_SIZE_UK;
const KIDS_SHOE_SIZE_EU = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 32.5];
exports.KIDS_SHOE_SIZE_EU = KIDS_SHOE_SIZE_EU;
const KIDS_SHOE_SIZE_CM = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
exports.KIDS_SHOE_SIZE_CM = KIDS_SHOE_SIZE_CM;
const KIDS_SHOE_SIZE_INCH = [3.937, 4.331, 4.724, 5.118, 5.512, 5.906, 6.299, 6.693, 7.087, 7.480, 7.874, 8.268];
exports.KIDS_SHOE_SIZE_INCH = KIDS_SHOE_SIZE_INCH;
// Combine all shoe sizes into a single array
const ALL_SHOE_SIZES = [
    ...KIDS_SHOE_SIZE_US,
    ...KIDS_SHOE_SIZE_UK,
    ...KIDS_SHOE_SIZE_EU,
    ...KIDS_SHOE_SIZE_CM,
    ...KIDS_SHOE_SIZE_INCH,
    ...ADULT_SHOE_SIZE_US,
    ...ADULT_SHOE_SIZE_UK,
    ...ADULT_SHOE_SIZE_EU,
    ...ADULT_SHOE_SIZE_CM,
    ...ADULT_SHOE_SIZE_INCH,
];
exports.ALL_SHOE_SIZES = ALL_SHOE_SIZES;
const SHOE_SIZES_GROUPED_BY_SYSTEM = {
    "US": [
        ...KIDS_SHOE_SIZE_US,
        ...ADULT_SHOE_SIZE_US,
    ],
    "UK": [
        ...KIDS_SHOE_SIZE_UK,
        ...ADULT_SHOE_SIZE_UK,
    ],
    "EU": [
        ...KIDS_SHOE_SIZE_EU,
        ...ADULT_SHOE_SIZE_EU,
    ],
    "CM": [
        ...KIDS_SHOE_SIZE_CM,
        ...ADULT_SHOE_SIZE_CM,
    ],
    "Inch": [
        ...KIDS_SHOE_SIZE_INCH,
        ...ADULT_SHOE_SIZE_INCH,
    ],
};
exports.SHOE_SIZES_GROUPED_BY_SYSTEM = SHOE_SIZES_GROUPED_BY_SYSTEM;
// Conversion function between different shoe size systems
function convertShoeSize(size, from, to) {
    if (from === to) {
        return size;
    }
    // Conversion logic for each size system
    switch (from) {
        case "US":
            switch (to) {
                case "UK":
                    return size + 2;
                case "EU":
                    return size + 30;
                case "CM":
                    return sizeToCM(size, "US");
                case "Inch":
                    return sizeToInch(size, "US");
            }
            break;
        case "UK":
            switch (to) {
                case "US":
                    return size - 2;
                case "EU":
                    return size + 28;
                case "CM":
                    return sizeToCM(size, "UK");
                case "Inch":
                    return sizeToInch(size, "UK");
            }
            break;
        case "EU":
            switch (to) {
                case "US":
                    return size - 30;
                case "UK":
                    return size - 28;
                case "CM":
                    return sizeToCM(size, "EU");
                case "Inch":
                    return sizeToInch(size, "EU");
            }
            break;
        case "CM":
            switch (to) {
                case "US":
                    return cmToSize(size, "US");
                case "UK":
                    return cmToSize(size, "UK");
                case "EU":
                    return cmToSize(size, "EU");
                case "Inch":
                    return cmToInch(size);
            }
            break;
        case "Inch":
            switch (to) {
                case "US":
                    return inchToSize(size, "US");
                case "UK":
                    return inchToSize(size, "UK");
                case "EU":
                    return inchToSize(size, "EU");
                case "CM":
                    return inchToCM(size);
            }
            break;
    }
    throw new Error(`Conversion from ${from} to ${to} is not supported.`);
}
// Helper functions for conversions between CM and Inch
function cmToInch(cm) {
    return cm / 2.54;
}
function inchToCM(inch) {
    return inch * 2.54;
}
// Helper functions for conversions between US, UK, and EU sizes to CM and Inch
function sizeToCM(size, system) {
    switch (system) {
        case "US":
            return 0.5 * (size * 1.5 + 18.5);
        case "UK":
            return 1.5 * size + 18.5;
        case "EU":
            return 3.33 * size + 12;
    }
}
function sizeToInch(size, system) {
    switch (system) {
        case "US":
            return size - 18;
        case "UK":
            return 0.666666667 * (size - 11);
        case "EU":
            return 0.394 * (size - 12);
    }
}
function cmToSize(cm, system) {
    switch (system) {
        case "US":
            return (2 * cm - 37) / 3;
        case "UK":
            return (2 * cm - 37) / 3;
        case "EU":
            return (cm - 12) / 3.33;
    }
}
function inchToSize(inch, system) {
    switch (system) {
        case "US":
            return inch + 18;
        case "UK":
            return 1.5 * inch + 11;
        case "EU":
            return 0.3 * inch + 12;
    }
}
//# sourceMappingURL=shoes-sizes.utilities.js.map