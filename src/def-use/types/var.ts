import Scope from "../../scope/scope";
import { Errors } from "../../utils/errorCode";

const IDENTIFIER_REGEX = /^[\p{L}_$][\p{L}\p{N}_$]*$/u;

/*
 * Model of variable
 */
class Var {
  private _name: string;
  private _scope: Scope;

  constructor(name: string, scope: Scope) {
    this._name = name;
    this._scope = scope;
  }

  /**
   * Type Checker
   */
  static isVar(obj: any) {
    return obj instanceof Var;
  }

  /**
   * Check the name is a valid identifier
   */
  static isValidName(name: unknown) {
    return (
      typeof name === "string" && name.length > 0 && IDENTIFIER_REGEX.test(name)
    );
  }

  /**
   * Validate the values for a Var is valid
   * @throws Error When a value of the Var is invalid
   */
  static validate(name: string, msg?: string): void {
    if (!Var.isValidName(name)) {
      Errors.ValidatorError(msg || "Invalid value for a Var");
    }
  }

  /**
   * Validate an object is a Var or not
   * @throws Error When the object is not a Var
   */
  static validateType(obj: any, msg?: string): void {
    if (!Var.isVar(obj)) {
      Errors.ValidatorError(msg || "Not a Var");
    }
  }

  /**
   * Compare two Vars for equality.
   */
  equals(other: any): boolean {
    if (!(other instanceof Var)) return false;
    return this.id === other.id;
  }

  /**
   * Represent the object as string
   */
  toString(): string {
    return this._name;
  }

  /**
   * Convert the variable to JSON
   */
  toJSON(): { name: string } {
    return { name: this._name };
  }

  get id(): string {
    return `${this._scope.name}:${this._name}`;
  }

  get name() {
    return this._name;
  }

  get scope() {
    return this._scope;
  }
}

export default Var;
