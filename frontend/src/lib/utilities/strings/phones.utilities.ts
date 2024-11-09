/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:50:04
 */

export function isValidPhoneNumber(phoneNumber: string): boolean {
  return isValidAlgerianPhoneNumber(phoneNumber);
}

export function isValidAlgerianPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;

  // Remove whitespace, dashes, and parentheses
  phoneNumber = phoneNumber
    .toString()
    .trim()
    .replaceAll(/[ .\-/]/g, "");

  // Define a regular expression pattern for the desired formats
  const pattern = /^(\(?\+\d{1,3}\)?)?\s?0?\d{8,9}$/;

  // Use the test method to check if the input matches the pattern
  let result = pattern.test(phoneNumber);

  // if (result && phoneNumber.substring(0, 1) !== '0' && phoneNumber.length === 9) {
  // 	return false;
  // }

  if (result) {
    return true;
  }

  if (
    phoneNumber.slice(0, 1) !== "0" &&
    isValidAlgerianPhoneNumber(`0${phoneNumber}`)
  ) {
    return true;
  }
  return result;
}

export function transformAlgerianPhoneNumberToStandardFormat(
  phoneNumber: string,
): string | null {
  if (!phoneNumber) return null;
  // Remove whitespace, dashes, and parentheses
  phoneNumber = phoneNumber
    .toString()
    .trim()
    .replaceAll(/[ .\-/]/g, "");
  // Define a regular expression pattern to match various formats
  const pattern = /(\(?\+\d{1,3}\)?)?\s?0?(\d{8,9})/;

  // Use the replace method to transform the input to the desired format
  const transformedNumber = phoneNumber.replace(pattern, "0$2");

  // Check if the transformation was successful
  if (
    /^0\d{8}$/.test(transformedNumber) &&
    !transformedNumber.startsWith("00")
  ) {
    return transformedNumber;
  }
  if (
    /^0\d{9}$/.test(transformedNumber) &&
    !transformedNumber.startsWith("00")
  ) {
    if (
      transformedNumber &&
      transformedNumber.slice(0, 1) !== "0" &&
      transformedNumber.length === 9
    ) {
      return null;
    }
    return transformedNumber;
  } else {
    return null; // Return null for invalid input
  }
}

export function transformPhoneNumberToStandardFormat(
  phoneNumber: string,
): string | null {
  return transformAlgerianPhoneNumberToStandardFormat(phoneNumber);
}
