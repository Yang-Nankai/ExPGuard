"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const errorCode_1 = require("../../utils/errorCode");
class CustomRange {
    constructor(start, end) {
        if (start instanceof CustomRange) {
            this._start = start.start;
            this._end = start.end;
        }
        else if (Array.isArray(start) && start.length === 2) {
            [this._start, this._end] = start;
        }
        else if (typeof start === "number" && typeof end === "number") {
            this._start = start;
            this._end = end;
        }
        else {
            throw errorCode_1.Errors.ValidatorError("Failed to initialize the range class because the type is incorrect.");
        }
    }
    static equals(range1, range2) {
        return (range1 === range2 ||
            (range1.start === range2.start && range1.end === range2.end));
    }
    static isValidValue(start, end) {
        if (start instanceof CustomRange) {
            return true;
        }
        else if (Array.isArray(start) && start.length === 2) {
            return ((typeof start[0] === "number" &&
                typeof start[1] === "number" &&
                start[0] === CustomRange.GLOBAL_RANGE_START &&
                start[1] === CustomRange.GLOBAL_RANGE_END) ||
                (start[0] >= 0 && start[1] > start[0]));
        }
        return ((typeof start === "number" &&
            typeof end === "number" &&
            start === CustomRange.GLOBAL_RANGE_START &&
            end === CustomRange.GLOBAL_RANGE_END) ||
            (start >= 0 && end > start));
    }
    static isRange(obj) {
        return obj instanceof CustomRange;
    }
    static validate(start, end, msg) {
        if (!CustomRange.isValidValue(start, end)) {
            errorCode_1.Errors.ValidatorError(msg || "Invalid Range value");
        }
    }
    static validateType(obj, msg) {
        if (!CustomRange.isRange(obj)) {
            errorCode_1.Errors.ValidatorError(msg || "Not a Range");
        }
    }
    get start() {
        return this._start;
    }
    get end() {
        return this._end;
    }
    toArray() {
        return [this._start, this._end];
    }
    toString() {
        return `[${this._start},${this._end}]`;
    }
    isEqualTo(range) {
        return CustomRange.equals(this, range);
    }
}
exports.Range = CustomRange;
CustomRange.GLOBAL_RANGE_START = 0;
CustomRange.GLOBAL_RANGE_END = 0;
