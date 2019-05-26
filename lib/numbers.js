"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Numbers {
    static toFixed(number, precision = 0) {
        let pow = Math.pow(10, precision);
        return (Math.round(number * pow) / pow);
    }
    static random(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static isValidRandom(num) {
        return Numbers.random(1, num) == num;
    }
}
exports.Numbers = Numbers;
//# sourceMappingURL=numbers.js.map