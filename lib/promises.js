"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Promises {
    static delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    static map(iterable, mapper, options = { concurrency: Infinity }) {
        let concurrency = options.concurrency || Infinity;
        let params = { index: 0 }, results = [], iterator = iterable[Symbol.iterator](), promises = [];
        while (concurrency-- > 0) {
            let promise = Promises._mapWrapper(mapper, iterator, results, params);
            if (!promise) {
                break;
            }
            promises.push(promise);
        }
        return Promise.all(promises).then(() => results);
    }
    static props(props, options = { concurrency: Infinity }) {
        const keys = Object.keys(props);
        const values = Object.values(props);
        return Promises.map(values, (item) => item, { concurrency: options.concurrency })
            .then(resolved => {
            const res = {};
            for (let i = 0, len = keys.length; i < len; i++) {
                res[keys[i]] = resolved[i];
            }
            return res;
        });
    }
    // public static propsMap<R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, mapper: (output: { [index: string]: Resolvable<U> }, item: R, index: number | string) => void, options: { concurrency: number } = {concurrency: Infinity}): Promise<{ [index: string]: U }> {
    //
    //     let dto = {},index=0;
    //
    //     for (let item of iterable[Symbol.iterator]()) {
    //         mapper(dto, item,index)
    //         index++;
    //     }
    //
    //
    //     return Promises.props(dto, {concurrency: options.concurrency})
    // }
    static _mapWrapper(mapper, iterator, results, params) {
        let next = iterator.next();
        if (next.done) {
            return null;
        }
        let i = params.index++, mapped = mapper(next.value, i);
        return Promise.resolve(mapped).then(resolved => {
            results[i] = resolved;
            return Promises._mapWrapper(mapper, iterator, results, params);
        });
    }
    static filter(iterable, filterer, options = { concurrency: Infinity }) {
        let concurrency = options.concurrency || Infinity;
        let params = { index: 0 }, results = [], predicates = [], iterator = iterable[Symbol.iterator](), promises = [];
        while (concurrency-- > 0) {
            let promise = Promises._filterWrapper(filterer, iterator, results, predicates, params);
            if (!promise) {
                break;
            }
            promises.push(promise);
        }
        return Promise.all(promises).then(() => results.filter((v, i) => predicates[i]));
    }
    static _filterWrapper(filterer, iterator, results, predicates, params) {
        let next = iterator.next();
        if (next.done) {
            return null;
        }
        let i = params.index++;
        results.push(next.value);
        let predicate = filterer(next.value, i);
        return Promise.resolve(predicate).then(resolved => {
            predicates[i] = resolved;
            return Promises._filterWrapper(filterer, iterator, results, predicates, params);
        });
    }
    static fromCallback(resolver) {
        return new Promise((resolve, reject) => {
            resolver((err, data) => {
                if (err == null) {
                    resolve(data);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    static defer() {
        return new Deferred();
    }
    static to(promise) {
        return promise.then(data => [null, data]).catch(e => [e]);
    }
}
exports.Promises = Promises;
class Deferred {
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolveSelf = resolve;
            this._rejectSelf = reject;
        });
    }
    get promise() {
        return this._promise;
    }
    resolve(val) {
        this._resolveSelf(val);
    }
    reject(reason) {
        this._rejectSelf(reason);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=promises.js.map