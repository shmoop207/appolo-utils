export class Functions {
    public static memoize(fn: Function, resolver: (args?: any[]) => string | number) {
        let cache = {};
        return (...args) => {
            let key = resolver ? resolver(args) : args[0];
            if (cache.hasOwnProperty(key)) {
                return cache[key];
            }

            let result = fn.apply(null, args);

            cache[key] = result;

            return result;
        }

    }

    public static throttle(func: Function, timeFrame: number) {
        let lastTime = 0;
        return function () {

            let now = Date.now();

            if (now - lastTime >= timeFrame) {
                func.apply(null, arguments);
                lastTime = now;
            }
        };
    }

    public static debounce(func: Function, wait: number, immediate: boolean) {
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
