import {Arrays} from "./arrays";

export class Chain<K> {
    constructor(private _value: any[]) {

    }

    public arrayify(val: any): this {
        this._value = Arrays.arrayify(this._value);
        return this
    }

    public clone(): this {
        this._value = Arrays.clone(this._value);
        return this;
    }

    public compact(): this {
        this._value = Arrays.compact(this._value);
        return this;
    }

    public removeBy(criteria: (value: K, i?: number) => boolean): this {
        Arrays.removeBy(this._value, criteria);
        return this;
    }

    public remove(item: K): this {
        Arrays.remove(this._value, item)

        return this;
    }

    public chunk(size: number): this {
        this._value = Arrays.chunk(this._value, size);
        return this;
    }

    public flat(): this {
        this._value = Arrays.flat(this._value);
        return this;
    }

    public flatDeep(depth: number = 1): this {
        this._value = Arrays.flatDeep(this._value, depth);
        return this;
    }

    public sortBy(criteria: (value: K) => any): this {
        this._value = Arrays.sortBy(this._value, criteria);
        return this;
    }

    public sort<T>(): this {
        this._value = Arrays.sort(this._value);
        return this;
    }

    public zip(...args: Array<K>): this {
        this._value = Arrays.zip(this._value, args);
        return this;
    }


    public uniqBy<T>(criteria: (value: T, i?: number) => any): this {
        this._value = Arrays.uniqBy(this._value, criteria);
        return this
    }

    public uniq(): this {
        this._value = Arrays.uniq(this._value);
        return this
    }

    public difference<T>(arr2: T[]): this {
        this._value = Arrays.difference(this._value, arr2);
        return this
    }

    public differenceBy<T>(arr2: T[], criteria: (value: T, i?: number) => any): this {
        this._value = Arrays.differenceBy(this._value, arr2, criteria);
        return this
    }

    public map<U>(predicate: (value: K, index: number, array: K[]) => U): this {
        this._value = this._value.map(predicate);
        return this
    }

    public filter<S extends K>(predicate: (value: K, index?: number, array?: K[]) => boolean): this {
        this._value = this._value.filter(predicate);
        return this
    }

    public find<S extends K>(predicate: (value: K, index?: number, array?: K[]) => boolean): S | undefined {
        return this._value.find(predicate);
    }

    public forEach<S extends K>(predicate: (value: K, index?: number, array?: K[]) => void): void {
        this._value.forEach(predicate);
    }

    public includes(searchElement: K, fromIndex?: number): boolean {
        return this._value.includes(searchElement, fromIndex);
    }

    public indexOf(searchElement: K, fromIndex?: number): number {
        return this._value.indexOf(searchElement, fromIndex);
    }

    public every<S extends K>(predicate: (value: K, index: number, array: K[]) => boolean): boolean {
        return this._value.every(predicate);
    }

    public some<S extends K>(predicate: (value: K, index: number, array: K[]) => boolean): boolean {
        return this._value.some(predicate);
    }

    public concat(...items: (K)[]): this {
        this._value.concat(...items);

        return this;
    }

    public shift<T = K>() {
        return this._value.shift() as T
    }

    public pop<T = K>() {
        return this._value.pop() as T
    }

    public length(): number {
        return this._value.length
    }

    public push(...items: K[]): this {

        this._value.push(...items);

        return this;
    }

    public unshift(...items: K[]): this {

        this._value.unshift(...items);

        return this;
    }

    public keyBy(key?: string | ((item: K, index: number) => string)): { [index: string]: T } {
        return Arrays.keyBy(this._value, key)
    }

    public groupBy(key: string | number | ((item: K) => string | number)): { [index: string]: T[] } {

        return Arrays.groupBy(this._value, key);
    }

    public random<T>(arr: T[]): T {
        return Arrays.random(this._value);
    }

    public value<T = K>(): T[] {
        return this._value as T[]
    }
}

export function _<T>(arr: T[]): Chain<T> {
    return new Chain(arr);
}
