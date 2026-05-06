import Scope from "../../scope/scope";
declare class Var {
    private _name;
    private _scope;
    constructor(name: string, scope: Scope);
    /**
     * Type Checker
     */
    static isVar(obj: any): obj is Var;
    /**
     * Check the name is a valid identifier
     */
    static isValidName(name: unknown): boolean;
    /**
     * Validate the values for a Var is valid
     * @throws Error When a value of the Var is invalid
     */
    static validate(name: string, msg?: string): void;
    /**
     * Validate an object is a Var or not
     * @throws Error When the object is not a Var
     */
    static validateType(obj: any, msg?: string): void;
    /**
     * Compare two Vars for equality.
     */
    equals(other: any): boolean;
    /**
     * Represent the object as string
     */
    toString(): string;
    /**
     * Convert the variable to JSON
     */
    toJSON(): {
        name: string;
    };
    get id(): string;
    get name(): string;
    get scope(): Scope;
}
export default Var;
