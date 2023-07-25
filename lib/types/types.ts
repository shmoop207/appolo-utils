export type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>;

export interface IRetry {
    retires: number,
    max?: number,
    random?: number,
    min?: number,
    fixed?: number,
    linear?: number,
    exponential?: number
}