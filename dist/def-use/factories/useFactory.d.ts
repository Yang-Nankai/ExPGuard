import { FlowNode } from "../../flownode/flownode";
import Use from '../types/use';
import { Range } from "../types/range";
/**
 * Factory for Use
 */
declare class UseFactory {
    /**
     * General factory method of Use objects
     */
    create(from: FlowNode, range: Range): Use;
}
export declare const useFactory: UseFactory;
export {};
