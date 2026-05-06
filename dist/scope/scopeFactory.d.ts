import { Node } from "acorn";
import PageScope from "./pageScope";
import Scope from "./scope";
import ExtensionScope from "./extensionScope";
import FunctionScope from "./functionScope";
import CatchScope from "./catchScope";
import SwitchScope from "./switchScope";
import WithScope from "./withScope";
import BlockScope from "./blockScope";
import ForScope from "./forScope";
import ClassScope from "./classScope";
/**
 * Simple factory for the Scope class
 */
declare class ScopeFactory {
    /**
     * Reset the counter of number of anonymous function Scope
     */
    resetAnonymousFunctionScopeCounter(): void;
    /**
     * Reset the counter of number of page scopes
     */
    resetPageScopeCounter(): void;
    /**
     * Factory method for page scopes
     */
    createPageScope(ast: Node, parent?: Scope): PageScope;
    /**
     * Factory method for the extension scope
     */
    createExtensionScope(): ExtensionScope;
    /**
     * Factory method for function scopes
     */
    createFunctionScope(ast: Node, funName: string | null, isExpressionNameFuncton: boolean, parent?: Scope): FunctionScope;
    /**
     * Factory method for catch scopes
     */
    createCatchScope(ast: Node, parent?: Scope): CatchScope;
    /**
     * Factory method for switch scopes
     */
    createSwitchScope(ast: Node, parent?: Scope): SwitchScope;
    /**
     * Factory method for with scopes
     */
    createWithScope(ast: Node, parent?: Scope): WithScope;
    /**
     * Factory method for block scopes
     */
    createBlockScope(ast: Node, parent?: Scope): BlockScope;
    /**
     * Factory method for for scopes
     */
    createForScope(ast: Node, parent?: Scope): ForScope;
    /**
     * Factory method for class scopes
     */
    createClassScope(ast: Node, className: string, parent?: Scope): ClassScope;
}
export declare const scopeFactory: ScopeFactory;
export {};
