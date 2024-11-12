export const sanitizeObjectStrings = <T extends object>(body: T) => {
  const keys = Object.keys(body || {}) as (keyof T)[];
  keys.forEach(key => {
    if (typeof body[key] === 'string') {
      body[key] = (body[key] as string).trim() as any;
    }
    if (typeof body[key] === 'object' && typeof body['push'] === "undefined") {
      body[key] = sanitizeObjectStrings((body[key] as T)) as any;
    }
  });
  return body;
}