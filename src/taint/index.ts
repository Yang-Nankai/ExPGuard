import { TaintManager } from "./manager";

export * from "./types";
export * from "./report";
export * from "./htmlReport";
export * from "./sourceReport";
export { TaintManager } from "./manager";

// Singleton
export const taintManager = new TaintManager();