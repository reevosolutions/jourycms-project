import { camelToKebab, capitalizeFirstLetter, kebabToCamel, camelToWords, pluralize, replaceAll, singularize, toSnakeCase, toKebabCase } from "../strings";
import {
  isValidPhoneNumber,
  isValidAlgerianPhoneNumber,
  transformAlgerianPhoneNumberToStandardFormat,
  transformPhoneNumberToStandardFormat,
} from "../strings/phones.utilities";

/* -------------------------------------------------------------------------- */
/*                           extend string prototype                          */
/* -------------------------------------------------------------------------- */

declare global {
  interface String {
    isValidPhoneNumber(): boolean;
    transformPhoneNumberToStandardFormat(): string | null;
    isValidAlgerianPhoneNumber(): boolean;
    transformAlgerianPhoneNumberToStandardFormat(): string | null;
    toSnakeCase(): string;
    toKebabCase(): string;
    capitalizeFirstLetter(): string;
    kebabToCamel(): string;
    camelToKebab(): string;
    pluralize(): string;
    singularize(): string;
    camelToWords(): string;
  }
}

String.prototype.isValidAlgerianPhoneNumber = function () {
  return isValidAlgerianPhoneNumber(this.trim());
};
String.prototype.transformAlgerianPhoneNumberToStandardFormat = function () {
  return transformAlgerianPhoneNumberToStandardFormat(this.trim());
};

String.prototype.isValidPhoneNumber = function () {
  return isValidPhoneNumber(this.trim());
};
String.prototype.transformPhoneNumberToStandardFormat = function () {
  return transformPhoneNumberToStandardFormat(this.trim());
};

String.prototype.toSnakeCase = function () {
  return toSnakeCase(this.trim());
};
String.prototype.toKebabCase = function () {
  return toKebabCase(this.trim());
};
String.prototype.capitalizeFirstLetter = function () {
  return capitalizeFirstLetter(this.trim());
};
String.prototype.kebabToCamel = function () {
  return kebabToCamel(this.trim());
};
String.prototype.camelToKebab = function () {
  return camelToKebab(this.trim());
};
String.prototype.camelToWords = function () {
  return camelToWords(this.trim());
};
String.prototype.pluralize = function () {
  return pluralize(this.trim());
};
String.prototype.singularize = function () {
  return singularize(this.trim());
};
