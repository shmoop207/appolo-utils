"use strict";

export class Xor {
    private static b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    private static b64_encode(data: number[]): string {
        if (!data) {
            return "";
        }

        let length = data.length, bits, r, i = 0, j = 0, enc = "", output = [];

        do {

            bits = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            i = i + 3;
            output[j] = Xor.b64_table[bits >> 18 & 0x3f] + Xor.b64_table[bits >> 12 & 0x3f] + Xor.b64_table[bits >> 6 & 0x3f] + Xor.b64_table[bits & 0x3f];
            j++;
        } while (i < length);
        enc = output.join("");
        r = length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    }

    private static b64_decode(data: string): number[] {

        if (!data) {
            return [];
        }

        let h3, h4, bits, i = 0, result = [], length = data.length, j = 0;

        do {

            h3 = Xor.b64_table.indexOf(data[i + 2]);
            h4 = Xor.b64_table.indexOf(data[i + 3]);
            bits = Xor.b64_table.indexOf(data[i]) << 18 | Xor.b64_table.indexOf(data[i + 1]) << 12 | h3 << 6 | h4;


            result[j] = bits >> 16 & 0xff;
            j++;
            if (h3 != 64) {
                result[j] = bits >> 8 & 0xff;
                j++;
                if (h4 != 64) {
                    result[j] = bits & 0xff;
                    j++;
                }
            }

            i = i + 4;
        } while (i < length);
        return result;
    }

    private static xor_encrypt(key: string, data: string): number[] {
        if (!data) {
            return [];
        }

        let dataLen = data.length, keyLen = key.length;
        let output = new Array(dataLen);


        for (let i = 0; i < dataLen; i++) {
            let charCode = data.charCodeAt(i);
            output[i] = (charCode == 8203 ? 32 : charCode) ^ key.charCodeAt(i % keyLen);
        }

        return output;
    }

    private static xor_decrypt(key: string, data: number[]): string {

        if (!data) {
            return "";
        }
        let dataLen = data.length, keyLen = key.length;
        let output: string[] = new Array(dataLen);

        for (let i = 0; i < dataLen; i++) {
            output[i] = String.fromCharCode(data[i] ^ key.charCodeAt(i % keyLen))
        }


        return output.join("");
    }

    public static encode(key: string, data: any): string {
        data = Xor.xor_encrypt(key, data);
        return Xor.b64_encode(data);
    }

    public static decode(key: string, data: string): any {
        let result = Xor.b64_decode(data);
        return Xor.xor_decrypt(key, result);
    }

}

