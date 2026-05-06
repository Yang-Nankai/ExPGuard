import ScopeTree from "../scope/scopeTree";
import PageModels from "./pageModels";
declare class PageModelsFactory {
    create(scopeTree: ScopeTree): PageModels;
}
export declare const pageModelsFactory: PageModelsFactory;
export {};
