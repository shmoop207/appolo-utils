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
        return str.replace(/\$\{([\w\.\_]*)\}/gm, (m, key) => data.hasOwnProperty(key) ? ((!data[key] && data[key] !== false) ? "" : data[key]) : m);
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
}
exports.Strings = Strings;
//# sourceMappingURL=strings.js.map