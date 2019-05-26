export class Numbers {
    public static toFixed(number: number | string, precision: number = 0): number {
        let pow = Math.pow(10, precision);
        return (Math.round((number as number) * pow) / pow);
    }

    public static random(min: number, max?: number): number {

        if (max === undefined) {
            max = min;
            min = 0;
        }

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static isValidRandom(num: number): boolean {
        return Numbers.random(1, num) == num
    }
}
