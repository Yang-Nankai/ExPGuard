import { Range } from "../types/range";

/**
 * Factory for Var
 */
class RangeFactory {
    /**
     * Factory method for creating a range
     */
    create(start: Range | [number, number] | number, end?: number) {
        return new Range(start, end);
    }

    /**
     * Factory method for range of globals
     */
    createGlobalRange() {
        return new Range(Range.GLOBAL_RANGE_START, Range.GLOBAL_RANGE_END);
    }
}

export const rangeFactory = new RangeFactory();
