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