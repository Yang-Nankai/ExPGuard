import { CFGResult } from "./cfgResult";
/**
 * Validate CFG
 */
declare class CFGValidator {
    /**
     * Check for a cfg is valid
     */
    isValidCFG(cfg: CFGResult | null): boolean;
}
export declare const cfgValidator: CFGValidator;
export {};
