/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import { flatten } from "lodash";
import { randomInt } from "crypto";

/**
 * @description Uses lodash flatten to split a string by , / ; +
 * @param str string to split
 * @returns {string[]}
 */
export const splitString = (
  str: string,
  use_plus_character: boolean = true
): string[] => {
  return flatten(
    flatten(
      flatten(str.split(",").map((v) => v.split("/"))).map((v) => v.split(";"))
    ).map((v) => (use_plus_character ? v.split("+") : v))
  )
    .map((v) => v.trim())
    .filter((v) => !!v);
};

export const stringToBoolean = (str: string): boolean => {
  if (!str.length) return false;
  str = str.trim().toLowerCase();
  if (["1", "true", "yes", "oui", "y"].includes(str)) return true;
  return false;
};

export const addLeadingZeros = (num: number, totalLength: number): string => {
  return String(num).padStart(totalLength, "0");
};

export const toPriceAmount = (str: string): number => {
  if (!str.length) return 0;

  const str2 = str
    .toLowerCase()
    // start excel number format to number
    .replace(",", "#")
    .replace(".", ",")
    .replace("#", ".")
    // end excel number format to number

    .replace("dza", "")
    .replace("dz", "")
    .replace("da", "")
    .replace(",", "")
    .trim();
  try {
    console.log("EXCEL_NUMBER", str, str2, parseFloat(str2));
    if (!str2.length) return 0;
    return parseFloat(str2);
  } catch (error) {
    return 0;
  }
};

export const isNumeric = (val: string) => {
  return !isNaN(val as unknown as number);
};

export const abbreviateNumber: (n: number) => string = (n) => {
  function rnd(num: number, precision: number) {
    const prec = 10 ** precision;
    return Math.round(num * prec) / prec;
  }
  const abbrev = ["K", "M", "B"]; // abbreviations in steps of 1000x; extensible if need to edit
  let base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
  const suffix = abbrev[Math.min(abbrev.length - 1, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? `${rnd(n / 1000 ** base, 2)} ${suffix}` : "" + n;
};

// Similarity
// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
export const createBigram = (word: string) => {
  const input = word.toLowerCase();
  const vector: string[] = [];
  for (let i = 0; i < input.length; ++i) {
    vector.push(input.slice(i, i + 2));
  }
  return vector;
};

export const checkSimilarity = (a: string, b: string) => {
  if (a.length > 0 && b.length > 0) {
    const aBigram = createBigram(a);
    const bBigram = createBigram(b);
    let hits = 0;
    for (let x = 0; x < aBigram.length; ++x) {
      for (let y = 0; y < bBigram.length; ++y) {
        if (aBigram[x] === bBigram[y]) {
          hits += 1;
        }
      }
    }
    if (hits > 0) {
      const union = aBigram.length + bBigram.length;
      return (2.0 * hits) / union;
    }
  }
  return 0;
};

export const generateStringNgrams = (str: string) => {
  // Remove non-alphanumeric characters
  if (!str) return [];
  const sanitizedText = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  const ngrams: string[] = [];

  for (let n = 2; n <= sanitizedText.length; n++) {
    for (let i = 0; i <= sanitizedText.length - n; i++) {
      ngrams.push(sanitizedText.slice(i, i + n));
    }
  }

  return ngrams;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Byte";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
};

export const generateSlug = async (title: string): Promise<string> => {
  return toKebabCase(title);
  // Replace Arabic and other non-ASCII characters with ASCII equivalents if possible
  const arabicMap: { [key: string]: string } = {
    ش: "sh",
    س: "s",
    ذ: "z",
    ز: "z",
    ض: "d",
    ص: "s",
    ث: "t",
    ق: "q",
    ف: "f",
    غ: "gh",
    // Add more mappings as needed
  };

  // const replacedTitle = title.replace(/[\u0621-\u064A]/g, (char) => arabicMap[char] || char);
  const replacedTitle = title;

  // Convert to lowercase
  const lowerCaseTitle = replacedTitle.toLowerCase();

  // Remove non-word characters, except for Arabic characters, dashes, and spaces
  const cleanedTitle = lowerCaseTitle.replace(/[^\u0621-\u064A\w\s-]/g, "");

  // Replace spaces and dashes with a single dash
  const dashedTitle = cleanedTitle.replace(/[\s-]+/g, "-");

  return dashedTitle;
};

export const toSnakeCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
};

export const toKebabCase = (input: string): string => {
  return (
    input
      .toLowerCase() // Convert to lowercase
      .replace(/[^\p{L}\p{N}]+/gu, "-") // Replace non-letter and non-digit characters with a dash
      // .replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]+/g, '-') // Replace non-alphanumeric and non-Latin chars with a dash
      .replace(/^-+|-+$/g, "") // Remove leading or trailing dashes
      .replace(/-{2,}/g, "-")
  ); // Replace multiple dashes with a single dash
};

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function kebabToCamel(kebabString: string): string {
  return kebabString.replace(/-([a-z])/g, (_, match) => match.toUpperCase());
}

export function camelToKebab(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
export function camelToWords(camelCaseString: string): string {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

export function pluralize(word: string): string {
  if (word.endsWith("ing")) {
    // Words ending with 's' or 'es', return the word as is
    return word;
  } else if (
    word.endsWith("y") &&
    !word.endsWith("ay") &&
    !word.endsWith("ey") &&
    !word.endsWith("oy") &&
    !word.endsWith("uy") &&
    !word.endsWith("iy")
  ) {
    // Words ending with 'y', replace 'y' with 'ies'
    return word.slice(0, -1) + "ies";
  } else {
    // For other words, simply add 's'
    return word + "s";
  }
}

export function singularize(word: string): string {
  if (word.endsWith("ies")) {
    // Words ending with 'ies', replace 'ies' with 'y'
    return word.slice(0, -3) + "y";
  } else if (word.endsWith("s")) {
    // Words ending with 's', remove 's'
    return word.slice(0, -1);
  } else {
    // For other words, return the word as is
    return word;
  }
}

export function replaceAll(
  input: string,
  search: string,
  replace: string
): string {
  const regex = new RegExp(search, "g");
  return input.replace(regex, replace);
}

export function buildUserFullName(names: {
  first_name?: string | null;
  family_name?: string | null;
}): string {
  return `${names.family_name || ""} ${names.first_name || ""}`.trim();
}

export const formatAmount = (
  x: number,
  separator: string = ",",
  decimals: number = 2
): string => {
  const str = x.toFixed(decimals).split(".");
  const part1 = str[0].replace(
    /\.(.*)|(\d)(?=(?:\d{3})+(?:\.|$))/g,
    `$2${separator}$1`
  );
  return str.length === 2 ? `${part1}.${str[1]}` : part1;
};

export const formatNotificationSpace = (
  space: string,
  infos: {
    user?: string;
    company?: string | null;
    office?: string;
    store?: string;
    role?: string;
    role_group?: Levelup.V2.Auth.Entity.TRoleGroup;
    parcelStatus?: Levelup.V2.Shipping.Entity.TParcelStatus;
  }
): string | null => {
  if (!Object.values(infos).reduce((prev, curr) => prev || !!curr, false))
    return null;
  return space
    .replace("[COMPANY]", infos.company || "")
    .replace("[OFFICE]", infos.office || "")
    .replace("[STORE]", infos.store || "")
    .replace("[USER]", infos.user || "")
    .replace("[ROLE]", infos.role || "")
    .replace("[ROLE_GROUP]", infos.role_group || "")
    .replace("[PARCEL_STATUS]", infos.parcelStatus || "");
};

/**
 * @description Generate a random 4-digit pin code between 1000 and 9999 (inclusive)
 * @returns {string} a random 4-digit pin code
 */
export function generatePinCode(): string {
  const pin = randomInt(1000, 10000);
  return pin.toString();
}

/**
 * Function to get a substring from position 0 to the first whitespace after threshold characters
 * @param str - The input string
 * @param threshold - The threshold number of characters
 * @returns - The extracted substring
 */
export function getSubstringUntilFirstWhitespaceAfterNChars(
  str: string,
  threshold = 100,
  dots = " ..."
): string {
  // Define the start position and the threshold length
  const startPos = 0;

  // Find the first whitespace position after the threshold
  const substring = str.substring(threshold);
  const firstWhitespacePos = substring.search(/\s/);

  if (firstWhitespacePos === -1) {
    // If no whitespace is found, return the substring from 0 to the end of the string
    return str;
  }

  // Calculate the actual position in the original string
  const endPos = threshold + firstWhitespacePos;

  // Return the substring from 0 to the first whitespace after the threshold
  return str.length > threshold
    ? `${str.substring(startPos, endPos)}${dots}`
    : str;
}

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 23-07-2024 08:43:03
 */
export function generateItemAlphabetCode(usedCodes: string[]): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = alphabet.length;

  // Converts a number to a base-26 "column name"
  const toCode = (number: number): string => {
    let code = "";
    while (number > 0) {
      number -= 1; // Adjust for 0-indexing in modulo calculation
      code = alphabet[number % base] + code;
      number = Math.floor(number / base);
    }
    return code || "A"; // Default to "A" if number is 0
  };

  // Generate a set of used codes for quick lookup
  const usedCodesSet = new Set(usedCodes);
  let index = 1; // Start from 1 which corresponds to "A"
  let code = toCode(index);

  // Find the first code that is not used
  while (usedCodesSet.has(code)) {
    index++;
    code = toCode(index);
  }

  return code;
}


export function countCharacterOccurrenceInString(str: string, character: string): number {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === ".") {
      count++;
    }
  }

  return count;
}