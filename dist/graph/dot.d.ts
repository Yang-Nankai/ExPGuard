import PageModels from "../model/pageModels";
export interface DotOptions {
    counter?: number;
    source?: string;
}
/**
 * Generate a complete DOT graph for all page models
 */
export default function generateDot(pageModels: PageModels, options?: DotOptions): string;
