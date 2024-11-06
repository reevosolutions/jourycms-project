"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUpdatedPropertyObject = void 0;
class ObjectUpdatedPropertyObject {
    constructor(old_value, new_value) {
        this.old_value = old_value;
        this.new_value = new_value;
    }
}
exports.ObjectUpdatedPropertyObject = ObjectUpdatedPropertyObject;
class ObjectUpdatedProperties {
    /**
     *
     * @param {object} oldObj
     * @param {object} newObj
     * @param {true | string[]} exclude if true, it will exclude default fields of Entity.General.ICreatable and Entity.General.IHasSearchMeta
     */
    constructor(oldObj, newObj, exclude = []) {
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
        ] : exclude;
    }
    getUpdatedProperties(oldObj, newObj) {
        const updatedProperties = {};
        const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
        keys.forEach(key => {
            if (typeof oldObj[key] === 'object'
                && typeof newObj[key] === 'object'
                && oldObj[key] !== null
                && newObj[key] !== null
                && typeof newObj[key] !== 'undefined') {
                const deepChanges = this.getUpdatedProperties(oldObj[key], newObj[key]);
                if (Object.keys(deepChanges).length > 0) {
                    updatedProperties[key] = deepChanges;
                }
            }
            else if (oldObj[key] !== newObj[key] && typeof newObj[key] !== 'undefined') {
                updatedProperties[key] = new ObjectUpdatedPropertyObject(oldObj[key], newObj[key]);
            }
        });
        return updatedProperties;
    }
    get asObject() {
        return this.updates;
    }
    get asArray() {
        const flattenObjectKeys = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (this._exclude.includes((pre + k)))
                return acc;
            if (obj[k] instanceof ObjectUpdatedPropertyObject) {
                acc.push({
                    field: (pre + k),
                    old_value: obj[k].old_value,
                    new_value: obj[k].new_value
                });
            }
            else {
                acc.push(...flattenObjectKeys(obj[k], pre + k));
            }
            return acc;
        }, []);
        return flattenObjectKeys(this.updates);
    }
    isModified(field) {
        return this.asArray.findIndex(x => x.field === field) > -1;
    }
}
exports.default = ObjectUpdatedProperties;
//# sourceMappingURL=update-calculator.class.js.map