import { ObjectId } from "mongodb";

export const createStringFilter: <F = string, Q = any, T = any>(
  q: Q,
  totalQ: T | null,
  value: any,
  fields: F | F[],
  omit?: boolean,
  operator?: "and" | "or"
) => {
  q: Q;
  totalQ: T;
} = (q, totalQ, value, field, omit, operator = "or") => {
  if (ObjectId.isValid(value)) {
    value = value.toString();
  }
  if (value && typeof value === "object" && "0" in value && "1" in value) {
    value = Object.values(value);
  }
  if (
    (value && typeof value !== "object") ||
    (value instanceof Array && value.length) ||
    value === null
  ) {
    if (Array.isArray(field)) {
      q = (q as any).where({
        [omit ? "$and" : "$or"]: field.map((_field) => ({
          [_field as unknown as string]:
            value instanceof Array
              ? { [omit ? "$nin" : "$in"]: value }
              : omit
              ? { $ne: value }
              : value,
        })),
      });
      totalQ = totalQ
        ? (totalQ as any).where({
            [omit || operator === "and" ? "$and" : "$or"]: field.map(
              (_field) => ({
                [_field as unknown as string]:
                  value instanceof Array
                    ? { [omit ? "$nin" : "$in"]: value }
                    : omit
                    ? { $ne: value }
                    : value,
              })
            ),
          })
        : totalQ;
    } else {
      q = (q as any).where({
        [field as unknown as string]:
          value instanceof Array
            ? { [omit ? "$nin" : "$in"]: value }
            : omit
            ? { $ne: value }
            : value,
      });
      totalQ = totalQ
        ? (totalQ as any).where({
            [field as unknown as string]:
              value instanceof Array
                ? { [omit ? "$nin" : "$in"]: value }
                : omit
                ? { $ne: value }
                : value,
          })
        : totalQ;
    }
  }
  return { q, totalQ };
};

/**
 * @deprecated now using multi fileds with AND OR operators
 */
export const _createStringFilter: <F = string, Q = any, T = any>(
  q: Q,
  totalQ: T | null,
  value: any,
  field: F,
  omit?: boolean
) => {
  q: Q;
  totalQ: T;
} = (q, totalQ, value, field, omit) => {
  if (ObjectId.isValid(value)) {
    value = value.toString();
  }
  if (value && typeof value === "object" && "0" in value && "1" in value) {
    value = Object.values(value);
  }
  if (
    (value && typeof value !== "object") ||
    (value instanceof Array && value.length) ||
    value === null
  ) {
    q = (q as any).where({
      [field as unknown as string]:
        value instanceof Array
          ? { [omit ? "$nin" : "$in"]: value }
          : omit
          ? { $ne: value }
          : value,
    });
    totalQ = totalQ
      ? (totalQ as any).where({
          [field as unknown as string]:
            value instanceof Array
              ? { [omit ? "$nin" : "$in"]: value }
              : omit
              ? { $ne: value }
              : value,
        })
      : totalQ;
  }
  return { q, totalQ };
};

export const createBooleanFilter: <F = string, Q = any, T = any>(
  q: Q,
  totalQ: T | null,
  value: any,
  field: F
) => {
  q: Q;
  totalQ: T;
} = (q, totalQ, value, field) => {
  if (value === "true" || value === "1" || value === 1 || value === true)
    value = true;
  else if (value === "false" || value === "0" || value === 0 || value === false)
    value = false;
  else value = undefined;
  if (value !== undefined) {
    q = (q as any).where({ [field as unknown as string]: value });
    totalQ = totalQ
      ? (totalQ as any).where({ [field as unknown as string]: value })
      : totalQ;
  }
  return { q, totalQ };
};

export const createDateRangeFilter: <F = string, Q = any, T = any>(
  q: Q,
  totalQ: T | null,
  value: any,
  field: F
) => {
  q: Q;
  totalQ: T;
} = (q, totalQ, value, field) => {
  if (value) {
    if (
      typeof value === "object" &&
      (value as Levelup.CMS.V1.Utils.Entity.General.HasStartEnd).start
    ) {
      if (value.end) {
        q = (q as any).where({
          [field as unknown as string]: {
            $gte: new Date(value.start),
            $lte: new Date(value.end),
          },
        });
        totalQ = totalQ
          ? (totalQ as any).where({
              [field as unknown as string]: {
                $gte: new Date(value.start),
                $lte: new Date(value.end),
              },
            })
          : totalQ;
      } else {
        q = (q as any).where({
          [field as unknown as string]: { $gte: new Date(value.start) },
        });
        totalQ = totalQ
          ? (totalQ as any).where({
              [field as unknown as string]: { $gte: new Date(value.start) },
            })
          : totalQ;
      }
    } else {
      q = (q as any).where({
        [field as unknown as string]: { $gte: new Date(value as string) },
      });
      totalQ = totalQ
        ? (totalQ as any).where({
            [field as unknown as string]: { $gte: new Date(value as string) },
          })
        : totalQ;
    }
  }
  return { q, totalQ };
};

export const createAggregateStringFilter: <F extends string = string>(
  match: { [key: string]: any },
  value: string | string[] | undefined | unknown,
  field: F
) => { [key: string]: any } = (match, value, field) => {
  if (!value) return match;
  if (typeof value === "object" && "0" in value && "1" in value) {
    value = Object.values(value);
  }
  if (
    (value && typeof value === "string") ||
    (value instanceof Array && value.length > 0)
  )
    match[field as unknown as string] =
      value instanceof Array ? { $in: value } : value;
  return match;
};

export const createAggregateDateRangeFilter: <F extends string = string>(
  match: { [key: string]: any },
  value: any,
  field: F
) => { [key: string]: any } = (match, value, field) => {
  if (value) {
    if (
      typeof value === "object" &&
      (value as Levelup.CMS.V1.Utils.Entity.General.HasStartEnd).start
    ) {
      if (value.end)
        match[field as unknown as string] = {
          $gte: new Date(value.start),
          $lte: new Date(value.end),
        };
      else match[field as unknown as string] = { $gte: new Date(value.start) };
    } else
      match[field as unknown as string] = { $gte: new Date(value as string) };
  }
  return match;
};
