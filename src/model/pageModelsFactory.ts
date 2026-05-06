import ScopeTree from "../scope/scopeTree";
import PageModels from "./pageModels";


/*
 * Simple factory for PageModels
 */
class PageModelsFactory {
    create(scopeTree: ScopeTree) {
        return new PageModels(scopeTree);
    }
}

export const pageModelsFactory = new PageModelsFactory();