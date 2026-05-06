import { FlowNode } from "../../flownode/flownode";
import { defFactory } from "../factories/defFactory";
import Def, { FunctionDef } from "../types/def";

export class FunctionCallItem {
  readonly caller: FlowNode;
  readonly callee: FunctionDef;
  readonly argDefs: Def[];
  readonly thisDef: Def | null;

  private _returnDef: Def | null = null;
  private _hasSideEffects = false;
  private _key?: string;

  constructor(
    caller: FlowNode,
    callee: FunctionDef,
    argDefs: Def[],
    thisDef: Def | null = null
  ) {
    this.caller = caller;
    this.callee = callee;
    this.argDefs = argDefs;
    this.thisDef = thisDef;
  }

  set returnDef(def: Def | null) {
    this._returnDef = def;
  }

  get returnDef(): Def {
    return (
      this._returnDef ??
      defFactory.createUndefinedDef(this.caller)
    );
  }

  markHasSideEffects(): void {
    this._hasSideEffects = true;
  }

  get hasSideEffects(): boolean {
    return this._hasSideEffects;
  }

  get key(): string {
    if (!this._key) {
      this._key =
        this.callee.key +
        "|" +
        this.argDefs.map((d) => d.key).join(",") +
        "|this=" +
        (this.thisDef?.key ?? "null");
    }
    return this._key;
  }
}
