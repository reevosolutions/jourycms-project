"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROUPED_CLOTHING_SIZES_GROUPS = exports.GROUPED_CLOTHING_SIZES = exports.ALL_CLOTHING_SIZES = exports.ADULT_CLOTHING_SIZES = exports.ALL_KID_CLOTHING_SIZES = exports.SCHOOL_AGE_SIZES = exports.PRESCHOOLER_SIZES = exports.TODDLER_SIZES = exports.INFANT_SIZES = void 0;
const INFANT_SIZES = [
    { size: "Newborn" },
    { size: "3-6 months" },
    { size: "6-9 months" },
    { size: "9-12 months" },
    { size: "12-18 months" },
    { size: "18-24 months" },
    { size: "24-30 months" },
];
exports.INFANT_SIZES = INFANT_SIZES;
const TODDLER_SIZES = [
    { size: "2T", age: "2 years" },
    { size: "3T", age: "3 years" },
    { size: "4T", age: "4 years" },
];
exports.TODDLER_SIZES = TODDLER_SIZES;
const PRESCHOOLER_SIZES = [
    { size: "4-5 years" },
    { size: "5T", age: "5 years" },
];
exports.PRESCHOOLER_SIZES = PRESCHOOLER_SIZES;
const SCHOOL_AGE_SIZES = [
    { size: "6-7 years" },
    { size: "7-8 years" },
    { size: "8-9 years" },
    { size: "9-10 years" },
    { size: "10-11 years" },
    { size: "11-12 years" },
];
exports.SCHOOL_AGE_SIZES = SCHOOL_AGE_SIZES;
const ADULT_CLOTHING_SIZES = [
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "XXL" },
    { size: "3XL" },
    { size: "4XL" },
    { size: "5XL" },
    { size: "6XL" },
];
exports.ADULT_CLOTHING_SIZES = ADULT_CLOTHING_SIZES;
const ALL_KID_CLOTHING_SIZES = [
    ...INFANT_SIZES,
    ...TODDLER_SIZES,
    ...PRESCHOOLER_SIZES,
    ...SCHOOL_AGE_SIZES,
];
exports.ALL_KID_CLOTHING_SIZES = ALL_KID_CLOTHING_SIZES;
const ALL_CLOTHING_SIZES = [
    ...ALL_KID_CLOTHING_SIZES,
    ...ADULT_CLOTHING_SIZES,
];
exports.ALL_CLOTHING_SIZES = ALL_CLOTHING_SIZES;
const GROUPED_CLOTHING_SIZES = {
    "infant": INFANT_SIZES,
    "toddler": TODDLER_SIZES,
    "preschooler": PRESCHOOLER_SIZES,
    "schoolAge": SCHOOL_AGE_SIZES,
    "adult": ADULT_CLOTHING_SIZES,
};
exports.GROUPED_CLOTHING_SIZES = GROUPED_CLOTHING_SIZES;
const GROUPED_CLOTHING_SIZES_GROUPS = [
    "infant",
    "toddler",
    "preschooler",
    "schoolAge",
    "adult",
];
exports.GROUPED_CLOTHING_SIZES_GROUPS = GROUPED_CLOTHING_SIZES_GROUPS;
//# sourceMappingURL=clothing-sizes.utilities.js.map