import {Arrays} from "./arrays";

export class Classes {
    public static isClass(v: any): boolean {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }

    public static className(fn: Function): string {
        return fn.name.charAt(0).toLowerCase() + fn.name.slice(1)
    }

    public static functionArgsNames(func: (...args: any[]) => any) {

        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let args = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (args === null) {
            args = [];
        }

        args = Arrays.compact(args);

        return args;
    }
}
