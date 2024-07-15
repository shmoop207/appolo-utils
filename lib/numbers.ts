export class Numbers {
    public static toFixed(number: number | string, precision: number = 0): number {
        let pow = Math.pow(10, precision);
        return (Math.round((number as number) * pow) / pow);
    }

    public static random(min: number, max?: number, floating: boolean = false): number {

        if (max === undefined) {
            max = min;
            min = 0;
        }

        let isInt = !floating && Number.isInteger(min) && Number.isInteger(max);

        if (isInt) {
            return Numbers.randomInt(min, max);
        }

        min = Math.min(min, max);
        max = Math.max(min, max);
        return (Math.random() * (max - min)) + min;
    }

    public static isNumber(str: any): str is Number {
        return (typeof str === 'number' || str instanceof Number);
    }

    public static randomInt(min: number, max?: number): number {

        if (max === undefined) {
            max = min;
            min = 0;
        }


        min = Math.ceil(Math.min(min, max));
        max = Math.floor(Math.max(min, max));
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static isValidRandom(num: number): boolean {
        return Numbers.random(1, num) == num
    }

    public static round(value: number, step: number): number {
        step || (step = 1.0);
        let inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }

    public static diff(a: number, b: number): number {
        if (a === 0) {
            return 0;
        }
        const diff = a - b;
        return diff / a;
    }

    public static format(num: number): string {
        return new Intl.NumberFormat().format(num)
    }

    public static sum(arr: number[]): number {

        if (!arr || !arr.length) {
            return 0
        }

        return arr.reduce((a, b) => a + b, 0);
    }

    public static average(arr: number[]) {
        if (!arr || !arr.length) {
            return 0
        }

        let total = Numbers.sum(arr);

        return total / arr.length;
    }

    public static standardDeviation(arr: number[]): number {
        if (!arr || !arr.length) {
            return 0
        }
        let mean = Numbers.average(arr);

        let squaredDevs = arr.map(num => {
            let dev = num - mean;
            return dev * dev;
        });

        let avgSqDev = Numbers.average(squaredDevs);

        return Math.sqrt(avgSqDev);
    }

    public static median(arr: number[]): number {
        if (!arr || !arr.length) {
            return 0
        }
        arr = arr.slice(0);

        arr = arr.sort((a, b) => a - b);

        let half = Math.floor(arr.length / 2);

        if (arr.length % 2 === 0) {
            return (arr[half - 1] + arr[half]) / 2;
        } else {
            return arr[half];
        }
    }

    public static spikes(arr: number[], stDevMultiplier = 2): { spikes: number[], filtered: number[] } {

        if (!arr || !arr.length) {
            return {spikes: [], filtered: []}
        }

        let mean = Numbers.average(arr),
            stdev = Numbers.standardDeviation(arr),
            spikes: number[] = [],
            filtered: number[] = []

        for (let i = 0, len = arr.length; i < len; i++) {
            let num = arr[i];
            (num > mean + (stDevMultiplier * stdev) || num < mean - (stDevMultiplier * stdev))
                ? spikes.push(num)
                : filtered.push(num)

        }

        return {spikes, filtered};

    }

}
