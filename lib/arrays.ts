export class Arrays {
    public static clone<T>(arr: T[]): T[] {
        return arr.slice(0);
    }

    public static arrayify<T>(val: any): T[] {
        return Array.isArray(val) ? val : [val];
    }

    public static compact<T>(array: T[]): T[] {
        let index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];

        while (++index < length) {
            let value = array[index];
            if (value) {
                result[resIndex++] = value;
            }
        }
        return result;
    }

    public static random<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    public static remove<T>(list: T[], item: T): void {

        if (!list || !list.length) {
            return;
        }

        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i] === item) {
                list.splice(i, 1);
            }
        }
    }
}
