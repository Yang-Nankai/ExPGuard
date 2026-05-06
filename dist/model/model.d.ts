import Scope from "../scope/scope";
import Set from "../utils/set";
import { CFGResult } from "../cfg/cfgResult";
import Var from "../def-use/types/var";
import DUPair from "../def-use/types/duPair";
import Def from "../def-use/types/def";
import { FeatureModelSemantic } from "../def-use/features/features";
declare class Model {
    private _relatedScopes;
    private _mainlyRelatedScope;
    private _graph;
    private _dupairs;
    private _returnDef;
    private _hasTaintAnalyzed;
    featureSemantic?: FeatureModelSemantic;
    constructor();
    /**
     * Check for the object is an Model
     * @param {Object} obj An object to be checked
     * @returns {boolean} True, if it is; false, otherwise
     */
    static isModel(obj: any): boolean;
    /**
     * Check for the scope is related
     * @param {Scope} scope A Scope to be checked
     * @returns {boolean}
     */
    isRelatedToTheScope(scope: Scope): boolean;
    /**
     * Check the scope is mainly related, which means this model is derive from the scope's intra-procedural model
     * @param {Scope} scope A Scope to be checked
     * @returns {boolean} True, if it is; false, otherwise
     */
    isMainlyRelatedToTheScope(scope: Scope): boolean;
    /**
     * Add a related scope
     * @param {Scope} scope Related scope
     */
    addRelatedScope(scope: Scope): void;
    /**
     * Check for DUPair has found
     * @param {DUPair} dupair
     * @returns {boolean} True, if found; false, otherwise
     */
    hasDUPair(dupair: DUPair): boolean;
    /**
     * Data Methods
     */
    get graph(): CFGResult | null;
    set graph(graph: CFGResult | null);
    get relatedScopes(): Scope[];
    set relatedScopes(scopes: Scope[]);
    get dupairs(): Map<Var, Set<DUPair>>;
    set dupairs(dupairs: Map<Var, Set<DUPair>>);
    get mainlyRelatedScope(): Scope | null;
    set mainlyRelatedScope(scope: Scope | null);
    get returnDef(): Def | null;
    set returnDef(def: Def | null);
    set hasTaintAnalyzed(p: boolean);
    get hasTaintAnalyzed(): boolean;
    isFeatureModel(): boolean;
}
export default Model;
