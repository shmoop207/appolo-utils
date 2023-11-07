"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Numbers = void 0;
class Numbers {
    static toFixed(number, precision = 0) {
        let pow = Math.pow(10, precision);
        return (Math.round(number * pow) / pow);
    }
    static random(min, max, floating = false) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        let isInt = !floating && Number.isInteger(min) && Number.isInteger(min);
        if (isInt) {
            return Numbers.randomInt(min, max);
        }
        min = Math.min(min, max);
        max = Math.max(max, max);
        return (Math.random() * (max - min + 1)) + min;
    }
    static isNumber(str) {
        return (typeof str === 'number' || str instanceof Number);
    }
    static randomInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        min = Math.ceil(Math.min(min, max));
        max = Math.floor(Math.max(min, max));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static isValidRandom(num) {
        return Numbers.random(1, num) == num;
    }
    static round(value, step) {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    static diff(a, b) {
        if (a === 0) {
            return 0;
        }
        const diff = a - b;
        return diff / a;
    }
    static format(num) {
        return new Intl.NumberFormat().format(num);
    }
    static sum(arr) {
        if (!arr || !arr.length) {
            return 0;
        }
        return arr.reduce((a, b) => a + b, 0);
    }
    static average(arr) {
        if (!arr || !arr.length) {
            return 0;
        }
        let total = Numbers.sum(arr);
        return total / arr.length;
    }
    static standardDeviation(arr) {
        if (!arr || !arr.length) {
            return 0;
        }
        let mean = Numbers.average(arr);
        let squaredDevs = arr.map(num => {
            let dev = num - mean;
            return dev * dev;
        });
        let avgSqDev = Numbers.average(squaredDevs);
        return Math.sqrt(avgSqDev);
    }
    static median(arr) {
        if (!arr || !arr.length) {
            return 0;
        }
        arr = arr.slice(0);
        arr = arr.sort((a, b) => a - b);
        let half = Math.floor(arr.length / 2);
        if (arr.length % 2 === 0) {
            return (arr[half - 1] + arr[half]) / 2;
        }
        else {
            return arr[half];
        }
    }
    static spikes(arr, stDevMultiplier = 2) {
        if (!arr || !arr.length) {
            return { spikes: [], filtered: [] };
        }
        let mean = Numbers.average(arr), stdev = Numbers.standardDeviation(arr), spikes = [], filtered = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let num = arr[i];
            (num > mean + (stDevMultiplier * stdev) || num < mean - (stDevMultiplier * stdev))
                ? spikes.push(num)
                : filtered.push(num);
        }
        return { spikes, filtered };
    }
}
exports.Numbers = Numbers;
//# sourceMappingURL=numbers.js.map