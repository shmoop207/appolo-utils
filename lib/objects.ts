import {Arrays} from "./arrays";
import {Functions, Strings} from "../index";
import {Booleans} from "./booleans";

export class Objects {
    public static isPlain(obj: any): boolean {

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

    public static isObject(val: any): boolean {
        return val != null && typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
    }

    public static isEmpty(obj: { [index: string]: any } | any[]): boolean {
        return Object.keys(obj || {}).length === 0
    }

    public static replaceFormatJson(obj: { [index: string]: any }, data: { [index: string]: any }): {
        [index: string]: any
    } {
        return JSON.parse(Strings.replaceFormatJson(JSON.stringify(obj), data));
    }

    public static isBoolean(obj: any): obj is boolean {
        return Booleans.isBoolean(obj);
    }

    public static isNullish(obj: any): boolean {
        return obj === undefined || obj === null || Number.isNaN(obj);
    }

    public static cloneFast<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj))
    }

    public static invert<T extends { [index: string]: any }, K extends { [index: string]: any }>(obj: T): K {

        return Objects.invertBy(obj, (value) => value)
    }

    public static invertBy<T extends { [index: string]: any }, K extends {
        [index: string]: any
    }>(obj: T, criteria: (value: T[keyof T], key: keyof T, i?: number) => string | number): K {

        let output = Object.keys(obj || {}).reduce((output, key, index: number) => {

            let newKey = criteria(obj[key], key, index);
            output[newKey] = key;
            return output;
        }, {});

        return output as K;
    }

    public static defaults<T>(obj: Partial<T>, ...args: Partial<T>[]): T {

        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            let keys = Object.keys(arg || {});
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j];
                if (!(key in obj) || (obj[key] === undefined && arg[key] != undefined)) {
                    obj[key] = arg[key]
                }
            }
        }

        return obj as T;
    };

    public static defaultsDeep<T>(obj: Partial<T>, ...args: Partial<T>[]): T {

        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            let keys = Object.keys(arg || {});
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j], value = arg[key], source = obj[key];

                if (Objects.isPlain(value)) {
                    obj[key] = Objects.defaultsDeep({}, source, value)
                } else if (!(key in obj) || (source === undefined && value != undefined)) {
                    obj[key] = value
                }
            }
        }

        return obj as T;
    };

    public static cloneDeep<T>(obj: T): T {
        let isArray = Array.isArray(obj);

        if (!obj || !isArray && !Objects.isPlain(obj)) {
            return obj
        }

        let output = isArray ? [] : {};

        let keys = Object.keys(obj || {});

        for (let i = 0, len = keys.length; i < len; i++) {

            let key = keys[i], value = obj[key];
            output[key] = (value !== null && value !== undefined)
                ? Objects.cloneDeep(value)
                : value
        }

        return output as any;
    }

    public static cloneJSON<T>(json: T): T {
        if (typeof json !== 'object' || json === null) {
            return json;
        }
        if (Array.isArray(json)) {
            return json.map(value =>
                (typeof value !== 'object' || value === null)
                    ? value
                    : Objects.cloneJSON(value)
            ) as any;

        }
        const output: any = {};
        for (const key in json) {
            const value = json[key];
            output[key] = (typeof value !== 'object' || value === null)
                ? value
                : Objects.cloneJSON(value)
        }
        return output;

    }

    public static clone<T>(obj: T): T {

        if (!obj) {
            return obj;
        }

        let output = Array.isArray(obj) ? [] : {};

        let keys = Object.keys(obj || {});

        for (let i = 0, len = keys.length; i < len; i++) {

            let key = keys[i];
            output[key] = obj[key]
        }

        return output as any;
    }

    public static compact(obj: any): any {

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

    public static tryParseJSON<T>(jsonString: string): T {

        let [err, output] = Functions.to(() => JSON.parse(jsonString));

        return err ? null : output as T;
    }

    public static tryStringifyJSON(json: any): string {

        let [err, str] = Functions.to<any, Error>(() => JSON.stringify(json))

        return err ? "" : str;
    }

    public static pick<T extends object, U extends keyof T>(obj: T, ...pick: U[]): Pick<T, U> {
        let out: any = {};
        obj = obj || {} as T;
        for (let i = 0; i < pick.length; i++) {
            let key = pick[i];
            if (key in obj) {
                out[key] = obj[key];
            }
        }

        return out
    }

    public static omit<T extends object, U extends keyof T>(obj: T, ...omit: U[]): Omit<T, U> {
        let out: any = {}, keys = Object.keys(obj || {}), omitIndex = Arrays.keyBy(omit);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (!omitIndex[key]) {
                out[key] = obj[key];
            }

        }

        return out
    }

    public static get<T>(obj: any, path: string, defValue?: T): T {

        if (!path) {
            return undefined
        }

        const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

        const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj)

        return result === undefined ? defValue : result
    }

    public static set(obj: any, path: string, value: any) {
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

    public static has(obj: any, key: string): boolean {
        if (!obj || !key) {
            return false;
        }

        let keyParts = key.split('.');

        return !!obj && (
            keyParts.length > 1
                ? Objects.has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
                : Object.hasOwnProperty.call(obj, key)
        );
    }

    public static mapObject<T>(obj: any, iteratee: (value: any, key: string) => T): T[] {
        const memo: T[] = [];

        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                const v = obj[k];
                memo.push(iteratee(v, k));
            }
        }

        return memo;
    }

    public static merge<T, S>(target: T, source: S): T & S;
    public static merge<T, S1, S2>(target: T, source1: S1, source2: S2): T & S1 & S2;
    public static merge<T, S1, S2, S3>(target: T, source1: S1, source2: S2, source3: S3): T & S1 & S2 & S3;
    public static merge<T, S1, S2, S3, S4>(target: T, source1: S1, source2: S2, source3: T, source4: S4): T & S1 & S2 & S3 & S4;
    public static merge(target: any, ...sources: any[]): any {
        if (typeof target !== 'object' || target === null) {
            throw new TypeError('Target must be an object');
        }

        for (const source of sources) {
            if (typeof source !== 'object' || source === null) {
                continue;
            }

            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    if (typeof source[key] === 'object' && source[key] !== null) {
                        if (!target.hasOwnProperty(key) || typeof target[key] !== 'object' || target[key] === null) {
                            target[key] = {} as any;
                        }
                        Objects.merge(target[key], source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
            }
        }

        return target as any;
    }

}
