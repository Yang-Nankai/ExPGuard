import "acorn";
import { FlowNode } from "./flownode/flownode";
import { Node } from "acorn";
import Scope from "./scope/scope";
import ScopeTree from "./scope/scopeTree";

export declare module "acorn" {
  interface Node {
    _id?: number;
    cfg?: FlowNode;
    scope: Scope;
  }
}
