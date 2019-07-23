export class Enums {

    public static enumNames<T>(enm: T): string[] {
        let res = [],keys = Object.keys(enm),i=0,len=keys.length;

        for (;i<len; i++) {
            let key = keys[i];
            if (isNaN(key as any) && res.indexOf(key) === -1 && res.indexOf(enm[key]) === -1) {
                res.push(key);
            }
        }

        return res;
    }

    public static enumValues<T>(enm: T): string[] {
        let res = [],keys = Object.keys(enm),i=0,len=keys.length;

        for (;i<len; i++) {
            let key = keys[i];
            let useValue = enm[key] as any;

            if (!isNaN(key as any)) {
                useValue = +key;
            }

            if (res.indexOf(useValue) === -1 && res.indexOf(key) === -1) {
                res.push(useValue);
            }
        }

        return res;
    }

}
