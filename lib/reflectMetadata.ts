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
        }

        if (defaultValue !== undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass);
        }

        return value
    }
}
