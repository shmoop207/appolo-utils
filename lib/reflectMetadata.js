"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
require("reflect-metadata");
class ReflectMetadata {
    static getNestedMetadata(symbol, klass, defaultValue) {
        let value = Reflect.getOwnMetadata(symbol, klass);
        if (value !== undefined) {
            return value;
        }
        if (Reflect.hasMetadata(symbol, klass)) {
            value = index_1.Objects.cloneDeep(Reflect.getMetadata(symbol, klass));
            Reflect.defineMetadata(symbol, value, klass);
            return value;
        }
        if (defaultValue !== undefined) {
            value = defaultValue;
            Reflect.defineMetadata(symbol, value, klass);
        }
        return value;
    }
}
exports.ReflectMetadata = ReflectMetadata;
//# sourceMappingURL=ReflectMetadata.js.map