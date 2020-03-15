import {Objects} from "../index";
import "reflect-metadata";

export class ReflectMetadata {
    public static getNestedMetadata<T>(symbol: Symbol | string, klass, defaultValue?: T): T {
        let value = Reflect.getOwnMetadata(symbol, klass);

        if (value !== undefined) {
            return value;
        }

        if (Reflect.hasMetadata(symbol, klass)) {
            value = Objects.cloneDeep(Reflect.getMetadata(symbol, klass));
            Reflect.defineMetadata(symbol, value, klass);
            return value;
        }

        if (defaultValue !== undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass);
        }

        return value
    }

    public static findReflectData<T, K extends { fn: Function }>(symbol: Symbol | string, exported: K[]): K & { metaData: T } {

        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);

            if (result !== undefined) {
                return {...exported[i], metaData: result}
            }
        }

        return null;
    }

    public static findAllReflectData<T, K extends { fn: Function }>(symbol: Symbol | string, exported: K[]): (K & { metaData: T })[] {

        let results = [];

        for (let i = 0, len = (exported ? exported.length : 0); i < len; i++) {
            let result = Reflect.getOwnMetadata(symbol, exported[i].fn);

            if (result !== undefined) {
                results.push({...exported[i], metaData: result})
            }
        }

        return results;
    }

    public static setMetadata(key: string | Symbol, value: any, target: any, propertyKey?: string) {
        if (propertyKey) {
            Reflect.defineMetadata(key, value, target.constructor, propertyKey)
        } else {
            Reflect.defineMetadata(key, value, target.constructor)

        }
    }

    public static getOwnMetadata<T>(symbol: Symbol | string, klass: any, propertyName?: string, defaultValue?: T): T {

        let value = Reflect.getOwnMetadata(symbol, klass, propertyName);

        if (!value && defaultValue != undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass, propertyName);
        }

        return value
    }

    public static decorateMetadata(key: string | Symbol, value: any) {
        return function (target: any, propertyKey?: string) {
            ReflectMetadata.setMetadata(key, value, propertyKey ? target.constructor : target, propertyKey);
        }
    }
}
