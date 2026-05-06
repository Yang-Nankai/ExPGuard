"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Set {
    constructor(elements) {
        this._values = [];
        if (Array.isArray(elements)) {
            elements.forEach(this.add.bind(this));
        }
        else if (elements instanceof Set) {
            elements._values.forEach(this.add.bind(this));
        }
    }
    get size() {
        return this._values.length;
    }
    get length() {
        return this.size;
    }
    _i(elem) {
        return this._values.indexOf(elem);
    }
    add(elem) {
        if (!this.has(elem)) {
            this._values.push(elem);
        }
    }
    has(elem) {
        return this._i(elem) !== -1;
    }
    delete(elem) {
        const i = this._i(elem);
        if (i !== -1) {
            this._values.splice(i, 1);
        }
    }
    clear() {
        this._values.length = 0;
    }
    values() {
        return [...this._values];
    }
    some(callback) {
        return this._values.some(callback);
    }
    map(callback) {
        return this._values.map(callback);
    }
    every(callback) {
        return this._values.every(callback);
    }
    filter(callback) {
        return this._values.filter(callback);
    }
    find(callback) {
        for (let i = 0; i < this._values.length; i++) {
            const value = this._values[i];
            if (callback(value, i, this._values)) {
                return value;
            }
        }
        return undefined;
    }
    forEach(callback) {
        this._values.forEach(callback);
    }
    first() {
        return this._values[0];
    }
    static intersect(a, b) {
        if (!a && b)
            return new Set(b);
        if (!b && a)
            return new Set(a);
        const s = new Set();
        a === null || a === void 0 ? void 0 : a.forEach((val) => {
            if (b === null || b === void 0 ? void 0 : b.has(val))
                s.add(val);
        });
        return s;
    }
    static union(a, b) {
        if (!a && b)
            return new Set(b);
        const s = new Set(a);
        b === null || b === void 0 ? void 0 : b.forEach(s.add.bind(s));
        return s;
    }
    static equals(a, b) {
        if (a.size !== b.size)
            return false;
        return a.every((val) => b.has(val));
    }
    static minus(a, b) {
        const s = new Set(a);
        b.forEach(s.delete.bind(s));
        return s;
    }
    [Symbol.iterator]() {
        return this._values[Symbol.iterator]();
    }
}
exports.default = Set;
