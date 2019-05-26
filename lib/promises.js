"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Promises {
    static delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}
exports.Promises = Promises;
//# sourceMappingURL=promises.js.map