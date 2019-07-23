"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arrays {
    static clone(arr) {
        return arr.slice(0);
    }
    static arrayify(val) {
        return Array.isArray(val) ? val : [val];
    }
    static compact(array) {
        let index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
            let value = array[index];
            if (value) {
                result[resIndex++] = value;
            }
        }
        return result;
    }
    static random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    static remove(list, item) {
        if (!list || !list.length) {
            return;
        }
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i] === item) {
                list.splice(i, 1);
            }
        }
    }
    static splitToChunks(array, chunkSize) {
        return [].concat.apply([], array.map(function (elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        }));
    }
    static groupBy(arr, key) {
        let output = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i], value = (typeof key === "function") ? key(item) : item[key], dto = output[value] || (output[value] = []);
            dto.push(item);
        }
        return output;
    }
}
exports.Arrays = Arrays;
//# sourceMappingURL=arrays.js.map