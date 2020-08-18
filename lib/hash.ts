import {Strings} from './strings';

import {createHash, HexBase64Latin1Encoding} from "crypto";

export class Hash {
    public static hashPlainObject(obj: { [index: string]: string | number | boolean }, algorithm: string = 'sha1', encoding: HexBase64Latin1Encoding = 'hex'): string {
        return Hash.hash(Strings.stringifyObjectValues(obj));
    }

    public static hash(str: string, algorithm: string = 'sha1', encoding: HexBase64Latin1Encoding = 'hex'): string {
        return createHash(algorithm).update(str).digest(encoding)
    }

    public static md5(str: string): string {
        return Hash.hash(str, "md5");
    }

    public static sha1(str: string): string {
        return Hash.hash(str, "sha1");
    }

    public static hashCode(s: string, prefix: string = "_"): string {
        let h = 0, l = s.length, i = 0;
        if (l > 0)
            while (i < l)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return prefix + h;
    }
}
