
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-03-2024 01:53:08
 */
type TUpdatedProperties<T extends object = object> = {
  [K in keyof T]?: T[K] extends object & { push?: never; unshift?: never }
  ? TUpdatedProperties<T[K]>
  : {
    old_value: T[K] | undefined;
    new_value: T[K] | undefined;
  }
}

export class ObjectUpdatedPropertyObject {
  public old_value: any;
  public new_value: any;
  public constructor(old_value: any, new_value: any) {
    this.old_value = old_value;
    this.new_value = new_value;
  }
}


export default class ObjectUpdatedProperties<T extends object, E extends Levelup.CMS.V1.Utils.DocumentProperties<T>> {
  private updates: TUpdatedProperties;
  private _exclude: Array<E>;

  /**
   * 
   * @param {object} oldObj 
   * @param {object} newObj 
   * @param {true | string[]} exclude if true, it will exclude default fields of Entity.General.ICreatable and Entity.General.IHasSearchMeta
   */
  public constructor(oldObj: Partial<T>, newObj: Partial<T>, exclude: true | Array<E> = []) {
    this.updates = this.getUpdatedProperties(oldObj, newObj);
    this._exclude = exclude === true ? [
      '_id',
      'created_at',
      'updated_at',
      'created_by',
      'created_by_original_user',
      'is_deleted',
      'tags',
      'updates',
      'search_meta',
    ] as E[] : exclude;
  }

  private getUpdatedProperties<T extends object>(oldObj: Partial<T>, newObj: Partial<T>) {
    const updatedProperties: TUpdatedProperties<T> = {};

    const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
    keys.forEach(key => {
      if (
        typeof oldObj[key] === 'object'
        && typeof newObj[key] === 'object'
        && oldObj[key] !== null
        && newObj[key] !== null
        && typeof newObj[key] !== 'undefined'
      ) {
        const deepChanges = this.getUpdatedProperties(oldObj[key], newObj[key]);
        if (Object.keys(deepChanges).length > 0) {
          updatedProperties[key] = deepChanges;
        }
      } else if (oldObj[key] !== newObj[key] && typeof newObj[key] !== 'undefined') {
        updatedProperties[key] = new ObjectUpdatedPropertyObject(
          oldObj[key],
          newObj[key],
        )
      }
    });

    return updatedProperties;
  }

  public get asObject() {
    return this.updates;
  }

  public get asArray() {
    const flattenObjectKeys = (obj: Record<string, any>, prefix: string = '') =>
      Object.keys(obj).reduce((acc: { field: Levelup.CMS.V1.Utils.DocumentProperties<T>; old_value: any; new_value: any; }[], k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (this._exclude.includes((pre + k) as E)) return acc;
        if (obj[k] instanceof ObjectUpdatedPropertyObject) {
          acc.push({
            field: (pre + k) as Levelup.CMS.V1.Utils.DocumentProperties<T>,
            old_value: obj[k].old_value,
            new_value: obj[k].new_value
          });
        } else {
          acc.push(...flattenObjectKeys(obj[k], pre + k));
        }
        return acc;
      }, []);
    return flattenObjectKeys(this.updates)
  }

  public isModified(field: Levelup.CMS.V1.Utils.DocumentProperties<T>) {
    return this.asArray.findIndex(x => x.field === field) > -1;
  }

}

