import { FlowNode } from "../../flownode/flownode";
import { Errors } from "../../utils/errorCode";
import { rangeFactory } from "../factories/rangeFactory";
import { Range } from "./range";

/**
 * Use class
 */
export class Use {
  private _fromNode: FlowNode;
  private _range: Range;

  constructor(fromNode: FlowNode, range: Range) {
    this._fromNode = fromNode;
    this._range = rangeFactory.create(range);
  }

  static fromValidNode(node: any) {
    return FlowNode.isFlowNode(node);
  }

  static isValidUseRange(range: any) {
    return Range.isValidValue(range);
  }

  static validate(from: any, range: any, msg?: string): void {
    if (!Use.fromValidNode(from) || !Use.isValidUseRange(range)) {
      Errors.ValidatorError(msg || "Invalid value for a Use");
    }
  }

  static isUse(obj: any): boolean {
    return obj instanceof Use;
  }

  static validateType(obj: any, msg?: string): void {
    if (!Use.isUse(obj)) {
      Errors.ValidatorError(msg || "Not a Use");
    }
  }

  get fromNode() {
    return this._fromNode;
  }

  get range() {
    return this._range;
  }

  toString(): string {
    return `use@${this._fromNode.cfgId}`;
  }

  toJSON(): object {
    return {
      fromNode: this._fromNode.cfgId,
      range: this._range.toArray(),
    };
  }
}

export default Use;
