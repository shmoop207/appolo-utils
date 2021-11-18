"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strings = void 0;
const index_1 = require("../index");
const Charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-";
class Strings {
    static stringifyObjectValues(obj) {
        let s = '';
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                s = s + obj[k];
            }
        }
        return s;
    }
    static isString(str) {
        return (typeof str === 'string' || str instanceof String);
    }
    static removeNewLine(str) {
        return str.replace(/(\r\n|\n|\r)/gm, "");
    }
    static replaceFormat(str, data) {
        return str.replace(/\$\{([\w\.\_]*)\}/gm, (m, key) => {
            if (!data.hasOwnProperty(key)) {
                return m;
            }
            let value = data[key];
            if (index_1.Objects.isNullish(value)) {
                value = "";
            }
            return value;
        });
    }
    static replaceFormatJson(str, data) {
        str = (str || "").replace(/\"\$\{([\w\.\_\:]*)\}\"/gm, (_m, key) => {
            let spread = key.split(":"), type = spread[1] || "";
            key = spread[0];
            if (!data.hasOwnProperty(key)) {
                return _m;
            }
            let value = data[key];
            if (index_1.Objects.isNullish(value)) {
                value = "";
            }
            if (type == "number") {
                return (parseFloat(value) || 0).toString();
            }
            else if (type == "integer") {
                return (parseInt(value) || 0).toString();
            }
            else if (type == "boolean") {
                return Boolean(value).toString();
            }
            else {
                return `"${value}"`;
            }
        });
        return Strings.replaceFormat(str, data);
    }
    static sanitizeString(str) {
        // u200B is the hex equivalent of unicode 8203 and it will fuck with our encoding function in the ad server
        // https://stackoverflow.com/questions/24205193/javascript-remove-zero-width-space-unicode-8203-from-string
        str = str.replace(/\u200B/g, '');
        return str;
    }
    static removeNonAsciiChars(fromString) {
        if (typeof (fromString) === "string") {
            return fromString.replace(/[^\x00-\x7F]/g, "").replace(/\s\s+/g, ' ');
        }
        return fromString;
    }
    static slugify(text) {
        text = (text || "").toString()
            .toLowerCase()
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/&/g, "-and-") // Replace & with 'and'
            .replace(/[^\w\-]+/g, "") // Remove all non-word chars
            .replace(/\--+/g, "-") // Replace multiple - with single -
            .replace(/^-+/, "") // Trim - from start of text
            .replace(/-+$/, ""); // Trim - from end of text
        return text;
    }
    capitalize(str) {
        (str || "").replace(/^\w/, (c) => c.toUpperCase());
    }
    static tryDecodeURIComponent(str) {
        let [err, output] = index_1.Functions.to(() => decodeURIComponent(str || ""));
        return err ? str || "" : output;
    }
    static serializeToQueryString(obj) {
        let keys = Object.keys(obj || {});
        let output = [];
        for (let i = 0, length = keys.length; i < length; i++) {
            let key = keys[i];
            output.push(`${key}=${obj[key]}`);
        }
        return output.join('&');
    }
    static convertStringToFloatArray(str) {
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
    static generatePassword(length, charset = Charset) {
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset[Math.floor(Math.random() * n)];
        }
        return retVal;
    }
    static truncate(input, n) {
        if (input.length > n) {
            return input.substring(0, n) + '...';
        }
        return input;
    }
    ;
}
exports.Strings = Strings;
//# sourceMappingURL=strings.js.map