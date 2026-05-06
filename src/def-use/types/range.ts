import { Errors } from "../../utils/errorCode";

/**
 * Range Class
 */
export type PairNumber = [number, number];

class CustomRange {
  private _start: number;
  private _end: number;

  static readonly GLOBAL_RANGE_START = 0;
  static readonly GLOBAL_RANGE_END = 0;

  constructor(
    start: CustomRange | PairNumber | number | undefined,
    end?: number
  ) {
    if (start instanceof CustomRange) {
      this._start = start.start;
      this._end = start.end;
    } else if (Array.isArray(start) && start.length === 2) {
      [this._start, this._end] = start;
    } else if (typeof start === "number" && typeof end === "number") {
      this._start = start;
      this._end = end;
    } else {
      throw Errors.ValidatorError(
        "Failed to initialize the range class because the type is incorrect."
      );
    }
  }

  static equals(range1: CustomRange, range2: CustomRange): boolean {
    return (
      range1 === range2 ||
      (range1.start === range2.start && range1.end === range2.end)
    );
  }

  static isValidValue(start: any, end?: any): boolean {
    if (start instanceof CustomRange) {
      return true;
    } else if (Array.isArray(start) && start.length === 2) {
      return (
        (typeof start[0] === "number" &&
          typeof start[1] === "number" &&
          start[0] === CustomRange.GLOBAL_RANGE_START &&
          start[1] === CustomRange.GLOBAL_RANGE_END) ||
        (start[0] >= 0 && start[1] > start[0])
      );
    }
    return (
      (typeof start === "number" &&
        typeof end === "number" &&
        start === CustomRange.GLOBAL_RANGE_START &&
        end === CustomRange.GLOBAL_RANGE_END) ||
      ((start as number) >= 0 && (end as number) > (start as number))
    );
  }

  static isRange(obj: any): obj is CustomRange {
    return obj instanceof CustomRange;
  }

  static validate(start: any, end?: any, msg?: string): void {
    if (!CustomRange.isValidValue(start, end)) {
      Errors.ValidatorError(msg || "Invalid Range value");
    }
  }

  static validateType(obj: any, msg?: string): void {
    if (!CustomRange.isRange(obj)) {
      Errors.ValidatorError(msg || "Not a Range");
    }
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  toArray(): [number, number] {
    return [this._start, this._end];
  }

  toString(): string {
    return `[${this._start},${this._end}]`;
  }

  isEqualTo(range: CustomRange): boolean {
    return CustomRange.equals(this, range);
  }
}

export { CustomRange as Range };
