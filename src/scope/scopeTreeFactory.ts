/*
 * Simple factory for ScopeTree
 */

import { ExtensionScript } from "../extension/extensionScript";
import ScopeTree from "./scopeTree";


class ScopeTreeFactory {
    /**
     * Create a ScopeTree
     * @returns A ScopeTree
     */
    create(script: ExtensionScript) {
        return new ScopeTree(script);
    }
}

export const scopeTreeFactory = new ScopeTreeFactory();