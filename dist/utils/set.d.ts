declare class Set<T> implements Iterable<T> {
    private _values;
    constructor(elements?: T[] | Set<T>);
    get size(): number;
    get length(): number;
    private _i;
    add(elem: T): void;
    has(elem: T): boolean;
    delete(elem: T): void;
    clear(): void;
    values(): T[];
    some(callback: (value: T, index: number, array: T[]) => boolean): boolean;
    map<U>(callback: (value: T, index: number, array: T[]) => U): U[];
    every(callback: (value: T, index: number, array: T[]) => boolean): boolean;
    filter(callback: (value: T, index: number, array: T[]) => boolean): T[];
    find(callback: (value: T, index: number, array: T[]) => boolean): T | undefined;
    forEach(callback: (value: T, index: number, array: T[]) => void): void;
    first(): T | undefined;
    static intersect<T>(a?: Set<T>, b?: Set<T>): Set<T>;
    static union<T>(a?: Set<T>, b?: Set<T>): Set<T>;
    static equals<T>(a: Set<T>, b: Set<T>): boolean;
    static minus<T>(a: Set<T>, b: Set<T>): Set<T>;
    [Symbol.iterator](): IterableIterator<T>;
}
export default Set;
