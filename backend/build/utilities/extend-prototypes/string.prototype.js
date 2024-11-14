"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../strings");
const phones_utilities_1 = require("../strings/phones.utilities");
String.prototype.isValidAlgerianPhoneNumber = function () {
    return (0, phones_utilities_1.isValidAlgerianPhoneNumber)(this.trim());
};
String.prototype.transformAlgerianPhoneNumberToStandardFormat = function () {
    return (0, phones_utilities_1.transformAlgerianPhoneNumberToStandardFormat)(this.trim());
};
String.prototype.isValidPhoneNumber = function () {
    return (0, phones_utilities_1.isValidPhoneNumber)(this.trim());
};
String.prototype.transformPhoneNumberToStandardFormat = function () {
    return (0, phones_utilities_1.transformPhoneNumberToStandardFormat)(this.trim());
};
String.prototype.toSnakeCase = function () {
    return (0, strings_1.toSnakeCase)(this.trim());
};
String.prototype.toKebabCase = function () {
    return (0, strings_1.toKebabCase)(this.trim());
};
String.prototype.capitalizeFirstLetter = function () {
    return (0, strings_1.capitalizeFirstLetter)(this.trim());
};
String.prototype.kebabToCamel = function () {
    return (0, strings_1.kebabToCamel)(this.trim());
};
String.prototype.camelToKebab = function () {
    return (0, strings_1.camelToKebab)(this.trim());
};
String.prototype.camelToWords = function () {
    return (0, strings_1.camelToWords)(this.trim());
};
String.prototype.pluralize = function () {
    return (0, strings_1.pluralize)(this.trim());
};
String.prototype.singularize = function () {
    return (0, strings_1.singularize)(this.trim());
};
String.prototype.replaceAll = function (search, replace) {
    return (0, strings_1.replaceAll)(this, search, replace);
};
//# sourceMappingURL=string.prototype.js.map