"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFactory = void 0;
const range_1 = require("../types/range");
/**
 * Factory for Var
 */
class RangeFactory {
    /**
     * Factory method for creating a range
     */
    create(start, end) {
        return new range_1.Range(start, end);
    }
    /**
     * Factory method for range of globals
     */
    createGlobalRange() {
        return new range_1.Range(range_1.Range.GLOBAL_RANGE_START, range_1.Range.GLOBAL_RANGE_END);
    }
}
exports.rangeFactory = new RangeFactory();
