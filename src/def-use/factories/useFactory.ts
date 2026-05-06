import { Node } from "acorn";
import { FlowNode } from "../../flownode/flownode";
import Use from '../types/use';
import { Range } from "../types/range";

/**
 * Factory for Use
 */
class UseFactory {
    /**
     * General factory method of Use objects
     */
    create(from: FlowNode, range: Range) {
        return new Use(from, range);
    }
};


export const useFactory = new UseFactory();
