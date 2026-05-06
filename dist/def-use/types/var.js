"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCode_1 = require("../../utils/errorCode");
const IDENTIFIER_REGEX = /^[\p{L}_$][\p{L}\p{N}_$]*$/u;
/*
 * Model of variable
 */
class Var {
    constructor(name, scope) {
        this._name = name;
        this._scope = scope;
    }
    /**
     * Type Checker
     */
    static isVar(obj) {
        return obj instanceof Var;
    }
    /**
     * Check the name is a valid identifier
     */
    static isValidName(name) {
        return (typeof name === "string" && name.length > 0 && IDENTIFIER_REGEX.test(name));
    }
    /**
     * Validate the values for a Var is valid
     * @throws Error When a value of the Var is invalid
     */
    static validate(name, msg) {
        if (!Var.isValidName(name)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid value for a Var");
        }
    }
    /**
     * Validate an object is a Var or not
     * @throws Error When the object is not a Var
     */
    static validateType(obj, msg) {
        if (!Var.isVar(obj)) {
            errorCode_1.Errors.ValidatorError(msg || "Not a Var");
        }
    }
    /**
     * Compare two Vars for equality.
     */
    equals(other) {
        if (!(other instanceof Var))
            return false;
        return this.id === other.id;
    }
    /**
     * Represent the object as string
     */
    toString() {
        return this._name;
    }
    /**
     * Convert the variable to JSON
     */
    toJSON() {
        return { name: this._name };
    }
    get id() {
        return `${this._scope.name}:${this._name}`;
    }
    get name() {
        return this._name;
    }
    get scope() {
        return this._scope;
    }
}
exports.default = Var;
