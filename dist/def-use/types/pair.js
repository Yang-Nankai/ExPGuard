"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pair Class
 */
class Pair {
    constructor(firstElem, secondElem) {
        this._first = firstElem;
        this._second = secondElem;
    }
    get first() {
        return this._first;
    }
    get second() {
        return this._second;
    }
    toString() {
        return "(" + this._first + "," + this._second + ")";
    }
}
exports.default = Pair;
