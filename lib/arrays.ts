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

    public static groupBy<T>(arr: T[], key: string | number | ((item: T) => string | number)) {

        let output = {};

        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i],
                value = (typeof key === "function") ? key(item) : item[key],
                dto = output[value] || (output[value] = []);

            dto.push(item);
        }

        return output;
    }

}
