class Set<T> implements Iterable<T> {
  private _values: T[];

  constructor(elements?: T[] | Set<T>) {
    this._values = [];
    if (Array.isArray(elements)) {
      elements.forEach(this.add.bind(this));
    } else if (elements instanceof Set) {
      elements._values.forEach(this.add.bind(this));
    }
  }

  get size(): number {
    return this._values.length;
  }

  get length(): number {
    return this.size;
  }

  private _i(elem: T): number {
    return this._values.indexOf(elem);
  }

  add(elem: T): void {
    if (!this.has(elem)) {
      this._values.push(elem);
    }
  }

  has(elem: T): boolean {
    return this._i(elem) !== -1;
  }

  delete(elem: T): void {
    const i = this._i(elem);
    if (i !== -1) {
      this._values.splice(i, 1);
    }
  }

  clear(): void {
    this._values.length = 0;
  }

  values(): T[] {
    return [...this._values];
  }

  some(callback: (value: T, index: number, array: T[]) => boolean): boolean {
    return this._values.some(callback);
  }

  map<U>(callback: (value: T, index: number, array: T[]) => U): U[] {
    return this._values.map(callback);
  }

  every(callback: (value: T, index: number, array: T[]) => boolean): boolean {
    return this._values.every(callback);
  }

  filter(callback: (value: T, index: number, array: T[]) => boolean): T[] {
    return this._values.filter(callback);
  }

  find(callback: (value: T, index: number, array: T[]) => boolean): T | undefined {
    for (let i = 0; i < this._values.length; i++) {
      const value = this._values[i];
      if (callback(value, i, this._values)) {
        return value;
      }
    }
    return undefined;
  }

  forEach(callback: (value: T, index: number, array: T[]) => void): void {
    this._values.forEach(callback);
  }

  first(): T | undefined {
    return this._values[0];
  }

  static intersect<T>(a?: Set<T>, b?: Set<T>): Set<T> {
    if (!a && b) return new Set(b);
    if (!b && a) return new Set(a);
    const s = new Set<T>();
    a?.forEach((val) => {
      if (b?.has(val)) s.add(val);
    });
    return s;
  }

  static union<T>(a?: Set<T>, b?: Set<T>): Set<T> {
    if (!a && b) return new Set(b);
    const s = new Set(a);
    b?.forEach(s.add.bind(s));
    return s;
  }

  static equals<T>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false;
    return a.every((val) => b.has(val));
  }

  static minus<T>(a: Set<T>, b: Set<T>): Set<T> {
    const s = new Set(a);
    b.forEach(s.delete.bind(s));
    return s;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this._values[Symbol.iterator]();
  }
}

export default Set;
