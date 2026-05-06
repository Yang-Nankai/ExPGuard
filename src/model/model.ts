import { cfgValidator } from "../cfg/cfgValidator";
import Scope from "../scope/scope";
import Set from "../utils/set";
import { CFGResult } from "../cfg/cfgResult";
import Var from "../def-use/types/var";
import DUPair from "../def-use/types/duPair";
import Def from "../def-use/types/def";
import { FeatureModelSemantic } from "../def-use/features/features";

/*
 * Model: the Program node and every function is a model
 */
class Model {
  private _relatedScopes: Scope[];
  private _mainlyRelatedScope: Scope | null = null;
  private _graph: CFGResult | null = null;
  private _dupairs: Map<Var, Set<DUPair>>; // (Var, Set)
  private _returnDef: Def | null = null;
  private _hasTaintAnalyzed: boolean = false;

  public featureSemantic?: FeatureModelSemantic;

  constructor() {
    this._relatedScopes = [];
    this._dupairs = new Map();
  }

  /**
   * Check for the object is an Model
   * @param {Object} obj An object to be checked
   * @returns {boolean} True, if it is; false, otherwise
   */
  static isModel(obj: any): boolean {
    return obj instanceof Model;
  }

  /**
   * Check for the scope is related
   * @param {Scope} scope A Scope to be checked
   * @returns {boolean}
   */
  isRelatedToTheScope(scope: Scope): boolean {
    return this._relatedScopes.indexOf(scope) !== -1;
  }

  /**
   * Check the scope is mainly related, which means this model is derive from the scope's intra-procedural model
   * @param {Scope} scope A Scope to be checked
   * @returns {boolean} True, if it is; false, otherwise
   */
  isMainlyRelatedToTheScope(scope: Scope): boolean {
    return this._mainlyRelatedScope === scope;
  }

  /**
   * Add a related scope
   * @param {Scope} scope Related scope
   */
  addRelatedScope(scope: Scope): void {
    if (Scope.isScope(scope) && !this.isRelatedToTheScope(scope)) {
      if (this._relatedScopes.length === 0) {
        this._mainlyRelatedScope = scope;
      }
      this._relatedScopes.push(scope);
    }
  }

  /**
   * Check for DUPair has found
   * @param {DUPair} dupair
   * @returns {boolean} True, if found; false, otherwise
   */
  hasDUPair(dupair: DUPair): boolean {
    if (!DUPair.isDUPair(dupair)) return false;

    for (const pairs of this._dupairs.values()) {
      for (const pair of pairs) {
        if (pair.def === dupair.def && pair.use === dupair.use) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Data Methods
   */
  get graph() {
    return this._graph ? this._graph : null;
  }

  set graph(graph) {
    if (graph && cfgValidator.isValidCFG(graph)) {
      this._graph = graph;
    }
  }

  get relatedScopes() {
    return [...this._relatedScopes];
  }

  set relatedScopes(scopes) {
    if (Array.isArray(scopes)) {
      this._relatedScopes = [...scopes];
    }
  }

  get dupairs() {
    return new Map(this._dupairs);
  }

  set dupairs(dupairs) {
    if (dupairs instanceof Map) {
      this._dupairs = new Map(dupairs);
    }
  }

  get mainlyRelatedScope() {
    return this._mainlyRelatedScope;
  }

  set mainlyRelatedScope(scope) {
    if (Scope.isScope(scope)) {
      this._mainlyRelatedScope = scope;
    }
  }

  get returnDef() {
    return this._returnDef;
  }

  set returnDef(def) {
    if (Def.isDef(def)) {
      this._returnDef = def;
    }
  }

  set hasTaintAnalyzed(p: boolean) {
    this._hasTaintAnalyzed = p;
  }

  get hasTaintAnalyzed() {
    return this._hasTaintAnalyzed;
  }

  isFeatureModel(): boolean {
    return !!this.featureSemantic;
  }

}

export default Model;
