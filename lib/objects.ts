export class Objects {
    public static isPlain(obj: { [index: string]: string | number | boolean }): boolean {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    public static isEmpty(obj: { [index: string]: any }): boolean {
        return Object.keys(obj).length === 0
    }

    public static cloneFast<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj))
    }

    public static defaults<T>(obj: Partial<T>, ...args: Partial<T>[]): T {

        for (let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            let keys = Object.keys(arg);
            for (let j = 0, len2 = keys.length; j < len2; j++) {
                let key = keys[j];
                if (!(key in obj)) {
                    obj[key] = arg[key]
                }
            }
        }

        return obj as T;
    };

    public static cloneDeep<T>(obj: T): T {

        let output = Array.isArray(obj) ? [] : {};

        let keys = Object.keys(obj);

        for (let i = 0, len = keys.length; i < len; i++) {

            let key = keys[i], value = obj[key];
            output[key] = (value == null || typeof value != "object") ? value : Objects.cloneDeep(value)
        }

        return output as any;
    }

    public static compact(obj: any): any {

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

    public static tryParseJSON(jsonString: string): any {
        try {

            let o = JSON.parse(jsonString);

            return o;
        } catch (e) {
        }

        return null;
    }
}
