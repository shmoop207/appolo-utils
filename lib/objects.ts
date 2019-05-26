export class Objects {
    public static isPlain(obj: { [index: string]: string | number | boolean }): boolean {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    public static isEmpty(obj: { [index: string]: any }): boolean {
        return Object.keys(obj).length === 0
    }

    public static cloneFast(obj: any): any {
        return JSON.parse(JSON.stringify(obj))
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
