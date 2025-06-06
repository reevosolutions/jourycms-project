/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-03-2024 01:17:09
 */
import deepmerge from "deepmerge";
import { Assign, Overwrite, DeepRequired, Diff } from 'utility-types';

/**
 * Merges two objects, with properties from the second object taking precedence over the first object.
 * If a property is found on both objects, the property from the first object is returned.
 * @param x - The first object to merge.
 * @param y - The second object to merge.
 * @param options - The options for merging.
 * @returns The merged object.
 */
export const defaults = <T extends object, Y extends object = Partial<T>>(
  x: T,
  y: Y,
  options?: deepmerge.Options
): Assign<Diff<T, Y>, DeepRequired<Y>> => {
  const res: any = deepmerge(y, x || {}, {
    ...(options || {}),
    arrayMerge: (target, source) => source,
  }) as any;
  return res;
};




/**
 * Gets the item IDs from the new and old data.
 * @param new_value - The new value.
 * @param old_value - The old value.
 * @returns The item IDs.
 */
export const getItemIdsFromOldAndNewData = <T extends string | string[] | null>(
  new_value?: T,
  old_value?: T
): T => {
  if (Array.isArray(new_value) || Array.isArray(old_value)) {
    if (Array.isArray(new_value)) return new_value;
    if (old_value) return old_value;
    return [] as unknown as T;
  }
  if (typeof new_value !== "undefined") return new_value;
  if (typeof old_value !== "undefined") return old_value;
  return null as unknown as T;
};

/**
 * Checks if the current environment is development.
 * @returns A boolean indicating if the current environment is development.
 */
export const isDevelopmentDev = (): boolean =>
  process.env.NODE_ENV !== "production";

/**
 * Checks if the current environment is production.
 * @returns A boolean indicating if the current environment is production.
 */
export const isProductionDev = (): boolean =>
  process.env.NODE_ENV === "production";

/**
 * Merges two objects deeply, excluding properties with null or undefined values.
 * @param x - The first object to merge.
 * @param y - The second object to merge.
 * @returns The merged object.
 */
export function deepMergeUnlessNull<X extends object, Y extends object>(
  x: X,
  y: Y
): X & Y {
  const result = { ...x };

  for (const key in y) {
    if (Object.prototype.hasOwnProperty.call(y, key)) {
      if (y[key] === null || y[key] === undefined) {
        continue;
      } else if (
        typeof y[key] === "object" &&
        y[key] !== null &&
        !Array.isArray(y[key])
      ) {
        if (
          typeof result[key as any] === "object" &&
          result[key as any] !== null
        ) {
          result[key as any] = deepMergeUnlessNull(
            result[key as any],
            y[key as any]
          );
        } else {
          result[key as any] = deepMergeUnlessNull({}, y[key as any]);
        }
      } else {
        result[key as any] = y[key];
      }
    }
  }

  return result as X & Y;
}

