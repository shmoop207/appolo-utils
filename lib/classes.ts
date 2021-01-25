import {Arrays} from "./arrays";
import {Functions} from "../index";

export class Classes {
    public static isClass(v: any): boolean {
        return typeof v === 'function' && v.name && /^\s*class\s+/.test(v.toString());
    }

    public static isFunction(obj: any): boolean {
        return Functions.isFunction(obj);
    };

    public static className(fn: Function): string {
        return fn.name.charAt(0).toLowerCase() + fn.name.slice(1)
    }

    public static functionArgsNames(func: ((...args: any[]) => any) | (new(...args: any[]) => any)) {

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

    public static getClassMethodsName(klass: (new(...args: any[]) => any)): string[] {
        let names = Object.getOwnPropertyNames(klass.prototype).filter(name => (name !== 'constructor' && typeof klass.prototype[name] === 'function'))

        return names;
    }

    public static createClassFromObject<T>(klass: { new(): T }, obj: { [P in keyof T]: T[P] }): T {
        let instance = new klass();
        let keys = Object.keys(obj);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            instance[key] = obj[key];
        }

        return instance;
    }
}
