"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrays_1 = require("./arrays");
class Classes {
    static isClass(v) {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }
    static isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    ;
    static className(fn) {
        return fn.name.charAt(0).toLowerCase() + fn.name.slice(1);
    }
    static functionArgsNames(func) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;
        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (args === null) {
            args = [];
        }
        args = arrays_1.Arrays.compact(args);
        return args;
    }
}
exports.Classes = Classes;
//# sourceMappingURL=classes.js.map