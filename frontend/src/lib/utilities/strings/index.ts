/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import { flatten } from "lodash";

/**
 * @description Uses lodash flatten to split a string by , / ; +
 * @param str string to split
 * @returns {string[]}
 */
export const splitString = (
  string_: string,
  use_plus_character: boolean = true,
): string[] => {
  return flatten(
    flatten(
      flatten(string_.split(",").map(v => v.split("/"))).map(v => v.split(";")),
    ).map(v => (use_plus_character ? v.split("+") : v)),
  )
    .map(v => v.trim())
    .filter(v => !!v);
};

export const stringToBoolean = (string_: string): boolean => {
  if (string_.length === 0) return false;
  string_ = string_.trim().toLowerCase();
  if (["1", "true", "yes", "oui", "y"].includes(string_)) return true;
  return false;
};

export const addLeadingZeros = (number_: number, totalLength: number) => {
  return String(number_).padStart(totalLength, "0");
};

export const toPriceAmount = (string_: string): number => {
  if (string_.length === 0) return 0;

  const string2 = string_
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
    console.log("EXCEL_NUMBER", string_, string2, Number.parseFloat(string2));
    if (string2.length === 0) return 0;
    return Number.parseFloat(string2);
  } catch {
    return 0;
  }
};

export const isNumeric = (value: string) => {
  return !Number.isNaN(value as unknown as number);
};

export const abbreviateNumber: (n: number) => string = n => {
  function rnd(number_: number, precision: number) {
    const prec = 10 ** precision;
    return Math.round(number_ * prec) / prec;
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
  for (let index = 0; index < input.length; ++index) {
    vector.push(input.slice(index, index + 2));
  }
  return vector;
};

export const checkSimilarity = (a: string, b: string) => {
  if (a.length > 0 && b.length > 0) {
    const aBigram = createBigram(a);
    const bBigram = createBigram(b);
    let hits = 0;
    for (const element of aBigram) {
      for (const element_ of bBigram) {
        if (element === element_) {
          hits += 1;
        }
      }
    }
    if (hits > 0) {
      const union = aBigram.length + bBigram.length;
      return (2 * hits) / union;
    }
  }
  return 0;
};

export const generateStringNgrams = (string_: string) => {
  // Remove non-alphanumeric characters
  if (!string_) return [];
  const sanitizedText = string_.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  const ngrams: string[] = [];

  for (let n = 2; n <= sanitizedText.length; n++) {
    for (let index = 0; index <= sanitizedText.length - n; index++) {
      ngrams.push(sanitizedText.slice(index, index + n));
    }
  }

  return ngrams;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Byte";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const index = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, index)).toFixed(decimals)) + " " + sizes[index]
  );
};

export const generateSlug = async (title: string): Promise<string> => {
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

export const toSnakeCase = (string_: string): string => {
  return string_.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
};

export const toKebabCase = (input: string): string => {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Add a dash between camelCase text.
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with a dash.
    .toLowerCase(); // Convert to lowercase.
};

export function capitalizeFirstLetter(string_: string): string {
  if (string_.length === 0) return string_;
  return string_.charAt(0).toUpperCase() + string_.slice(1);
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
  replace: string,
): string {
  const regex = new RegExp(search, "g");
  return input.replace(regex, replace);
}

export function buildUserFullName(
  names?: {
    first_name?: string | null;
    family_name?: string | null;
  } | null,
): string {
  return `${names?.family_name || ""} ${names?.first_name || ""}`.trim();
}

export const formatAmount = (
  x: number,
  separator: string = ",",
  decimals: number = 2,
): string => {
  const string_ = x.toFixed(decimals).split(".");
  const part1 = string_[0].replace(
    /\.(.*)|(\d)(?=(?:\d{3})+(?:\.|$))/g,
    `$2${separator}$1`,
  );
  return string_.length === 2 ? `${part1}.${string_[1]}` : part1;
};

export const formatNotificationSpace = (
  space: string,
  infos: {
    user?: string;
    role?: string;
  },
): string | null => {
  if (!Object.values(infos).reduce((previous, current) => previous || !!current, false))
    return null;
  return space
    .replace("[USER]", infos.user || "")
    .replace("[ROLE]", infos.role || "")
};
