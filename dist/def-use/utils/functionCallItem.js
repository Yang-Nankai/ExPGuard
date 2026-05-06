"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCallItem = void 0;
const defFactory_1 = require("../factories/defFactory");
class FunctionCallItem {
    constructor(caller, callee, argDefs, thisDef = null) {
        this._returnDef = null;
        this._hasSideEffects = false;
        this.caller = caller;
        this.callee = callee;
        this.argDefs = argDefs;
        this.thisDef = thisDef;
    }
    set returnDef(def) {
        this._returnDef = def;
    }
    get returnDef() {
        var _a;
        return ((_a = this._returnDef) !== null && _a !== void 0 ? _a : defFactory_1.defFactory.createUndefinedDef(this.caller));
    }
    markHasSideEffects() {
        this._hasSideEffects = true;
    }
    get hasSideEffects() {
        return this._hasSideEffects;
    }
    get key() {
        var _a, _b;
        if (!this._key) {
            this._key =
                this.callee.key +
                    "|" +
                    this.argDefs.map((d) => d.key).join(",") +
                    "|this=" +
                    ((_b = (_a = this.thisDef) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : "null");
        }
        return this._key;
    }
}
exports.FunctionCallItem = FunctionCallItem;
