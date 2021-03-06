"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Objects = void 0;
const arrays_1 = require("./arrays");
const index_1 = require("../index");
class Objects {
    static isPlain(obj) {
        if (!Objects.isObject(obj)) {
            return false;
        }
        let ctor = obj.constructor;
        if (typeof ctor !== 'function') {
            return false;
        }
        let proto = ctor.prototype;
        if (!Objects.isObject(proto) || !proto.hasOwnProperty('isPrototypeOf')) {
            return false;
        }
        return true;
    }
    static isObject(val) {
        return val != null && typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
    }
    static isEmpty(obj) {
        return Object.keys(obj || {}).length === 0;
    }
    static isBoolean(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }
    static cloneFast(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static defaults(obj, ...args) {
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            let keys = Object.keys(arg || {});
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j];
                if (!(key in obj) || (obj[key] === undefined && arg[key] != undefined)) {
                    obj[key] = arg[key];
                }
            }
        }
        return obj;
    }
    ;
    static cloneDeep(obj) {
        let isArray = Array.isArray(obj);
        if (!obj || !isArray && !Objects.isPlain(obj)) {
            return obj;
        }
        let output = isArray ? [] : {};
        let keys = Object.keys(obj || {});
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], value = obj[key];
            output[key] = (value !== null && value !== undefined)
                ? Objects.cloneDeep(value)
                : value;
        }
        return output;
    }
    static clone(obj) {
        if (!obj) {
            return obj;
        }
        let output = Array.isArray(obj) ? [] : {};
        let keys = Object.keys(obj || {});
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            output[key] = obj[key];
        }
        return output;
    }
    static compact(obj) {
        let output = {};
        let keys = Object.keys(obj || {});
        for (let i = 0, length = keys.length; i < length; i++) {
            let key = keys[i], item = obj[key];
            if (!item && !(item == 0 || item == false)) {
                continue;
            }
            output[key] = item;
        }
        return output;
    }
    static tryParseJSON(jsonString) {
        let [err, output] = index_1.Functions.to(() => JSON.parse(jsonString));
        return err ? null : output;
    }
    static tryStringifyJSON(json) {
        let [err, str] = index_1.Functions.to(() => JSON.stringify(json));
        return err ? "" : str;
    }
    static pick(obj, ...pick) {
        let out = {};
        obj = obj || {};
        for (let i = 0; i < pick.length; i++) {
            let key = pick[i];
            if (key in obj) {
                out[key] = obj[key];
            }
        }
        return out;
    }
    static omit(obj, ...omit) {
        let out = {}, keys = Object.keys(obj || {}), omitIndex = arrays_1.Arrays.keyBy(omit);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (!omitIndex[key]) {
                out[key] = obj[key];
            }
        }
        return out;
    }
    static set(obj, path, value) {
        if (!obj) {
            return;
        }
        const parts = path.split('.');
        let current = obj;
        for (let i = 0, len = parts.length; i < len - 1; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        }
        current[parts[parts.length - 1]] = value;
    }
    static mapObject(obj, iteratee) {
        const memo = [];
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                const v = obj[k];
                memo.push(iteratee(v, k));
            }
        }
        return memo;
    }
}
exports.Objects = Objects;
//# sourceMappingURL=objects.js.map