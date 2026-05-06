import Scope from "./scope";


/**
 * Extension Scope
 */
class ExtensionScope extends Scope {
    constructor() {
        super(null, Scope.NAME_EXTENSION, Scope.TYPE_EXTENSION, null);
    }
}

export default ExtensionScope;
