import { TaintManager } from "./manager";

export * from "./types";
export * from "./report";
export { TaintManager } from "./manager";

// Singleton
export const taintManager = new TaintManager();