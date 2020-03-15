"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Functions {
    static memoize(fn, resolver) {
        let cache = {};
        return (...args) => {
            let key = resolver ? resolver(args) : args[0];
            if (cache.hasOwnProperty(key)) {
                return cache[key];
            }
            let result = fn.apply(null, args);
            cache[key] = result;
            return result;
        };
    }
    static throttle(func, timeFrame) {
        let lastTime = 0;
        return function () {
            let now = Date.now();
            if (now - lastTime >= timeFrame) {
                func.apply(null, arguments);
                lastTime = now;
            }
        };
    }
    static debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }, wait);
            if (immediate && !timeout) {
                func.apply(context, args);
            }
        };
    }
}
exports.Functions = Functions;
//# sourceMappingURL=functions.js.map