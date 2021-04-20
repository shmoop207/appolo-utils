import {Functions} from "../index";

const Charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-"

export class Strings {
    public static stringifyObjectValues(obj: { [index: string]: string | boolean | number }): string {
        let s = '';
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                s = s + obj[k];
            }

        }
        return s;
    }

    public static isString(str: any): str is String {
        return (typeof str === 'string' || str instanceof String);
    }

    public static removeNewLine(str: string): string {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }

    public static replaceFormat(str: string, data: any): string {
        return str.replace(/\$\{([\w\.\_]*)\}/gm, (m, key) => data.hasOwnProperty(key) ? ((!data[key] && data[key] !== false) ? "" : data[key]) : m)
    }

    public static replaceFormatJson(str: string, data: any): string {
        str = (str || "").replace(/\"\$\{([\w\.\_\:]*)\}\"/gm, (_m, key) => {

            let spread = key.split(":"),
                type = spread[1] || "";

            key = spread[0];

            let value = data.hasOwnProperty(key) ? ((!data[key] && data[key] !== false) ? "" : data[key]) : "";

            return type == "number" ? (parseFloat(value) || 0).toString() : (type == "boolean" ? Boolean(value).toString() : `"${value}"`)
        });

        return Strings.replaceFormat(str, data)
    }

    public static sanitizeString(str: string): string {
        // u200B is the hex equivalent of unicode 8203 and it will fuck with our encoding function in the ad server
        // https://stackoverflow.com/questions/24205193/javascript-remove-zero-width-space-unicode-8203-from-string
        str = str.replace(/\u200B/g, '');

        return str;
    }

    public static removeNonAsciiChars(fromString: string): string {
        if (typeof (fromString) === "string") {
            return fromString.replace(/[^\x00-\x7F]/g, "").replace(/\s\s+/g, ' ');
        }

        return fromString;
    }

    public static slugify(text: string): string {
        text = (text || "").toString()
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/&/g, "-and-") // Replace & with 'and'
            .replace(/[^\w\-]+/g, "") // Remove all non-word chars
            .replace(/\--+/g, "-") // Replace multiple - with single -
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, "") // Trim - from end of text

        return text
    }

    public capitalize(str: string) {
        (str || "").replace(/^\w/, (c) => c.toUpperCase());
    }

    public static tryDecodeURIComponent(str): string {

        let [err, output] = Functions.to(() => decodeURIComponent(str || ""));

        return err ? str || "" : output;
    }

    public static serializeToQueryString(obj: any): string {

        let keys = Object.keys(obj || {});

        let output = [];

        for (let i = 0, length = keys.length; i < length; i++) {
            let key = keys[i];
            output.push(`${key}=${obj[key]}`);
        }

        return output.join('&');
    }

    public static convertStringToFloatArray(str: string): number[] {
        if (!str) {
            return [];
        }

        let output = [];

        let arr = str.split(",");

        for (let i = 0, length = arr.length; i < length; i++) {
            let int = parseFloat(arr[i]);
            !isNaN(int) && output.push(int);
        }

        return output;
    }

    public static generatePassword(length: number, charset = Charset) {
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset[Math.floor(Math.random() * n)];
        }
        return retVal;
    }
}
