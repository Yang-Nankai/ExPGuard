/**
 * Pair Class
 */
declare class Pair {
    private _first;
    private _second;
    constructor(firstElem: any, secondElem: any);
    get first(): any;
    get second(): any;
    toString(): string;
}
export default Pair;
