/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import moment from 'moment';
import ObjectUpdatedProperties, { ObjectUpdatedPropertyObject } from './update-calculator.class';
import { isNumber } from 'lodash';



export const transformObjectToString = (obj: any): any => {
  if (obj === undefined) {
    return 'undefined'
  }
  if (obj === null) {
    return 'null'
  } else if (typeof obj === 'string') {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(v => transformObjectToString(v)).join(', ');
  } else if (typeof obj === 'object') {
    if (Object.prototype.hasOwnProperty.call(obj, 'start') && Object.prototype.hasOwnProperty.call(obj, 'end')) {
      return `${moment((obj as { start?: Date }).start).format('DD-MM-YYYY')} - ${moment((obj as { end?: Date }).end).format('DD-MM-YYYY')}`;
    }
    else {
      return transformObjectToString(Object.keys(obj).map(k => `${k}: ${transformObjectToString(obj[k])}`))
    }
  }
  return obj;
}




/**
 * @since 11-12-2023 15:41:03
 */
export const flattenObjectKeys = (obj: Record<string, any>, prefix: string = ''): string[] =>
  Object.keys(obj).reduce((acc: string[], k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k]) {
      if (obj[k] instanceof Array)
        for (let idx = 0; idx < obj[k].length; idx++) {
          if (typeof obj[k][idx] === 'object' && obj[k][idx])
            acc.push(...flattenObjectKeys(obj[k][idx], pre + k));
        }
      else
        acc.push(...flattenObjectKeys(obj[k], pre + k));
    } else {
      if (!isNumber(k))
        acc.push(pre + k);
    }
    return acc;
  }, []);


/**
 * @since 11-12-2023 15:41:10
 */
export const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, any> =>
  Object.keys(obj).reduce((acc: Record<string, any>, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k]) Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});


export const extractPartialObject = <D extends object, P extends keyof D>(obj: D, properties: P[]): Pick<D, P> => {
  const subObject: Partial<D> = {};
  properties.forEach(property => {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      subObject[property] = obj[property];
    }
  });
  return subObject as Pick<D, P>;
}

export function deletePropertyRecursively<T extends object, P extends keyof T>(obj: T, property: P): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key as any === property) {
        delete obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        deletePropertyRecursively((obj as any)[key], property);
      }
    }
  }
}

/**
 * Update : added
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 18-07-2024 21:24:07
 */
export const unflattenObjectArray = <
  T extends {
    _id: string;
    parent: string | null;
    children: string[];
  }
>(
  items: T[]
): (T & {
  children: T[];
})[] => {
  const itemMap = new Map<
    string,
    T & {
      children: T[];
    }
  >();

  // Initialize each item with a children array and map them by _id
  items.forEach((item) => {
    item.children = [];
    itemMap.set(item._id, { ...item, children: [] });
  });

  // Link children to their parent, and find root items
  const roots: (T & {
    children: T[];
  })[] = [];
  items.forEach((item) => {
    if (item.parent) {
      const parentItem = itemMap.get(item.parent);
      parentItem?.children.push(itemMap.get(item._id)!);
    } else {
      roots.push(
        itemMap.get(item._id) as T & {
          children: T[];
        }
      );
    }
  });

  return roots;
};


export { ObjectUpdatedProperties, ObjectUpdatedPropertyObject }
