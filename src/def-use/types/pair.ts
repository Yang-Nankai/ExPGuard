/**
 * Pair Class
 */
class Pair {
  private _first: any;
  private _second: any;

  constructor(firstElem: any, secondElem: any) {
    this._first = firstElem;
    this._second = secondElem;
  }

  get first() {
    return this._first;
  }

  get second() {
    return this._second;
  }

  toString(): string {
    return "(" + this._first + "," + this._second + ")";
  }
}

export default Pair;
