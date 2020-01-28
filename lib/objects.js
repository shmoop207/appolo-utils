"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Objects {
    static isPlain(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    static cloneFast(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    static defaults(obj, ...args) {
        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            let keys = Object.keys(arg);
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j];
                if (!(key in obj)) {
                    obj[key] = arg[key];
                }
            }
        }
        return obj;
    }
    ;
    static cloneDeep(obj) {
        let output = Array.isArray(obj) ? [] : {};
        let keys = Object.keys(obj);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i], value = obj[key];
            output[key] = (value == null || typeof value != "object") ? value : Objects.cloneDeep(value);
        }
        return output;
    }
    static compact(obj) {
        let output = {};
        let keys = Object.keys(obj);
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
        try {
            let o = JSON.parse(jsonString);
            return o;
        }
        catch (e) {
        }
        return null;
    }
}
exports.Objects = Objects;
//# sourceMappingURL=objects.js.map