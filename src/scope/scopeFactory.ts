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
class ScopeFactory {
  /**
   * Reset the counter of number of anonymous function Scope
   */
  resetAnonymousFunctionScopeCounter() {
    FunctionScope.resetAnonymousCounter();
  }

  /**
   * Reset the counter of number of page scopes
   */
  resetPageScopeCounter() {
    PageScope.resetCounter();
  }

  /**
   * Factory method for page scopes
   */
  createPageScope(ast: Node, parent?: Scope) {
    return new PageScope(ast, parent ?? null);
  }

  /**
   * Factory method for the extension scope
   */
  createExtensionScope() {
    return new ExtensionScope();
  }

  /**
   * Factory method for function scopes
   */
  createFunctionScope(
    ast: Node,
    funName: string | null,
    isExpressionNameFuncton: boolean,
    parent?: Scope
  ) {
    return new FunctionScope(
      ast,
      funName,
      isExpressionNameFuncton,
      parent ?? null
    );
  }

  /**
   * Factory method for catch scopes
   */
  createCatchScope(ast: Node, parent?: Scope) {
    return new CatchScope(ast, parent ?? null);
  }

  /**
   * Factory method for switch scopes
   */
  createSwitchScope(ast: Node, parent?: Scope) {
    return new SwitchScope(ast, parent ?? null);
  }

  /**
   * Factory method for with scopes
   */
  createWithScope(ast: Node, parent?: Scope) {
    return new WithScope(ast, parent ?? null);
  }

  /**
   * Factory method for block scopes
   */
  createBlockScope(ast: Node, parent?: Scope) {
    return new BlockScope(ast, parent ?? null);
  }

  /**
   * Factory method for for scopes
   */
  createForScope(ast: Node, parent?: Scope) {
    return new ForScope(ast, parent ?? null);
  }

  /**
   * Factory method for class scopes
   */
  createClassScope(ast: Node, className: string, parent?: Scope) {
    return new ClassScope(ast, className, parent ?? null);
  }
}

export const scopeFactory = new ScopeFactory();
