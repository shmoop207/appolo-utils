type Resolvable<R> = R | PromiseLike<R>
type IterateFunction<T, R> = (item: T, index: number | string) => Resolvable<R>;

export class Promises {
    public static delay(delay: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    public static map<R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, mapper: IterateFunction<R, U>, options: { concurrency: number } = {concurrency: Infinity}): Promise<U[]> {

        let concurrency = options.concurrency || Infinity;

        let params = {index: 0}, results = [], iterator = iterable[Symbol.iterator](), promises = [];

        while (concurrency-- > 0) {
            let promise = Promises._mapWrapper(mapper, iterator, results, params);

            if (!promise) {
                break;
            }

            promises.push(promise);
        }

        return Promise.all(promises).then(() => results);

    }

    public static props<T>(props: object & { [K in keyof T]: Resolvable<T[K]> }, options: { concurrency: number } = {concurrency: Infinity}): Promise<T> {
        const keys = Object.keys(props);
        const values = Object.values(props);

        return Promises.map(values, (item) => item, {concurrency: options.concurrency})
            .then(resolved => {
                const res: { [K in keyof T]: T[K] } = {} as any;

                for (let i = 0, len = keys.length; i < len; i++) {
                    res[keys[i]] = resolved[i];
                }

                return res
            })
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

    private static _mapWrapper<R, U>(mapper: IterateFunction<R, U>, iterator: IterableIterator<R>, results: any[], params: { index: number }) {

        let next = iterator.next();

        if (next.done) {
            return null;
        }

        let i = params.index++, mapped = mapper(next.value, i);

        return Promise.resolve(mapped).then(resolved => {
            results[i] = resolved;
            return Promises._mapWrapper(mapper, iterator, results, params)
        })
    }

    public static filter<R, U>(iterable: Resolvable<Iterable<Resolvable<R>>>, filterer: IterateFunction<R, U>, options: { concurrency: number } = {concurrency: Infinity}): Promise<U[]> {
        let concurrency = options.concurrency || Infinity;

        let params = {index: 0}, results = [], predicates = [], iterator = iterable[Symbol.iterator](), promises = [];

        while (concurrency-- > 0) {
            let promise = Promises._filterWrapper(filterer, iterator, results, predicates, params);

            if (!promise) {
                break
            }

            promises.push(promise);
        }

        return Promise.all(promises).then(() => results.filter((v, i) => predicates[i]));
    }

    private static _filterWrapper<R, U>(filterer: IterateFunction<R, U>, iterator: IterableIterator<R>, results: any[], predicates: any[], params: { index: number }) {
        let next = iterator.next();
        if (next.done) {
            return null
        }

        let i = params.index++;

        results.push(next.value);

        let predicate = filterer(next.value, i);

        return Promise.resolve(predicate).then(resolved => {
            predicates[i] = resolved;
            return Promises._filterWrapper(filterer, iterator, results, predicates, params)
        })
    }

    public static fromCallback<T>(resolver: (callback: (err: any, result?: T) => void) => void): Promise<T> {
        return new Promise((resolve, reject) => {
            resolver((err, data) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    public static defer<T>(): Deferred<T> {
        return new Deferred();
    }

    public static async to<T,K>(promise:Promise<T>):Promise<[K,T?]>{
        return promise.then(data=>[null,data] as [K,T]).catch(e=>[e] as [K,T?])
    }
}

export class Deferred<T> {

    private _resolveSelf;
    private _rejectSelf;
    private readonly _promise: Promise<T>;

    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._resolveSelf = resolve;
            this._rejectSelf = reject;
        })
    }

    public get promise(): Promise<T> {
        return this._promise;
    }

    public resolve(val: T): void {
        this._resolveSelf(val)
    }

    public reject(reason: any): void {
        this._rejectSelf(reason)
    }

}
