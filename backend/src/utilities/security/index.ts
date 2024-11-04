/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */


export const sanitizeKeys = (obj: any): any => {
  function sanitizeKey(key: string): string {
    return key.replace(/\W+/g, '_');
  }

  if (Array.isArray(obj)) {
    return obj.map(value => sanitizeKeys(value));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [sanitizeKey(key)]: sanitizeKeys(obj[key])
      }),
      {}
    );
  }
  return obj;
}

export const sanitizeObjectBooleans = (obj: any): any => {
  function sanitizeBoolean(value: any): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }

  if (Array.isArray(obj)) {
    return obj.map(value => sanitizeObjectBooleans(value));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        [key]: sanitizeObjectBooleans(obj[key])
      }),
      {}
    );
  }
  return sanitizeBoolean(obj);
}



export function fragmentObjectId(str: string): string {
  if (str.length !== 24) {
    throw new Error('Input string must have a length of 24.');
  }

  const segments: string[] = [];

  // Create the first 4 segments, each of length 5
  for (let i = 0; i < 20; i += 5) {
    segments.push(str.substring(i, i + 5));
  }

  // Create the last segment with the remaining 4 characters
  segments.push(str.substring(20));

  return `${segments[4]}-${segments[1]}-${segments[3]}-${segments[2]}-${segments[0]}`;
}

export function ressembleObjectId(str: string): string {
  if (str.length !== 28) {
    throw new Error('Input string must have a length of 28.');
  }

  const segments: string[] = str.split('-');
  return `${segments[4]}${segments[1]}${segments[3]}${segments[2]}${segments[0]}`;

}



export const hashString: (str: string) => number = (str) => {
  return Array.from(str)
    .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
}