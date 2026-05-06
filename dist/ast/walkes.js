"use strict";
/**
 * Very simple walker for estree AST
 * Reference: https://github.com/Swatinem/walkes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseSimple = traverseSimple;
exports.traverseAncestor = traverseAncestor;
exports.traverseFull = traverseFull;
exports.traverseFullAncestor = traverseFullAncestor;
exports.traverseRecursive = traverseRecursive;
const walk = __importStar(require("acorn-walk"));
/**
 * Walkes the AST and applies the function from the function table to each node.
 * @param astNode astNode to walk
 * @param functionTable function table to apply to each node
 * @param offset offset to limit the recursion to a specific range
 * @returns returns the result of the function applied to the node
 */
function walkes(astNode, functionTable, offset) {
    function stop() {
        throw stop;
    }
    const recurse = (astNode) => {
        if (!astNode || typeof astNode !== "object" || !astNode.type) {
            return astNode;
        }
        // Range-based recursion: only recurse when the astNode is in range
        if (offset !== undefined &&
            astNode.range &&
            Array.isArray(astNode.range) &&
            (astNode.range[0] > offset || astNode.range[1] < offset)) {
            return astNode;
        }
        const fn = functionTable[astNode.type] || functionTable.default || checkProps;
        return fn(astNode, recurse, stop);
    };
    let ret;
    try {
        ret = recurse(astNode);
    }
    catch (e) {
        if (e !== stop) {
            throw e;
        }
    }
    return ret;
}
/**
 * Checks the properties of the AST node and applies the recursive function to each property.
 * @param node The AST node to check
 * @param recurse recursive function to apply to each property of the node
 * @returns record of the properties of the node
 */
function checkProps(node, recurse) {
    const mapped = {};
    Object.keys(node).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
            const prop = node[key];
            mapped[key] = Array.isArray(prop) ? prop.map(recurse) : recurse(prop);
        }
    });
    return mapped;
}
walkes.checkProps = checkProps;
// ================================
// acorn-walk wrappers
// ================================
/**
 * Traverse AST using acorn-walk.simple
 *
 * @param ast - The AST root node
 * @param visitors - An object where keys are node types and values are visitor functions
 * @param state - Optional shared state object passed during traversal
 */
function traverseSimple(ast, visitors, state = {}) {
    walk.simple(ast, visitors, walk.base, state);
}
/**
 * Traverse AST using acorn-walk.ancestor, allowing access to ancestor nodes.
 *
 * @param ast - The AST root node
 * @param visitors - An object mapping node types to visitor functions
 *                   The visitor receives (node, state, ancestors)
 * @param state - Optional state object
 */
function traverseAncestor(ast, visitors, state = {}) {
    walk.ancestor(ast, visitors, walk.base, state);
}
/**
 * Traverse AST using acorn-walk.full, calling a single callback for every node.
 *
 * @param ast - The AST root node
 * @param callback - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
function traverseFull(ast, callback, state = {}) {
    walk.full(ast, callback, walk.base, state);
}
/**
 * Traverse AST using acorn-walk.fullAncestor, where callback gets ancestor array.
 *
 * @param ast - The AST root node
 * @param callback - Function receiving (node, state, ancestors)
 * @param state - Optional shared state object
 */
function traverseFullAncestor(ast, callback, state = {}) {
    walk.fullAncestor(ast, callback, walk.base, state);
}
/**
 * Traverse AST using acorn-walk.recursive, calling a recursive callback for every node.
 *
 * @param ast - The AST root node
 * @param functions - A callback executed for every node (node, state, type)
 * @param state - Optional state object
 */
function traverseRecursive(ast, functions, state = {}) {
    walk.recursive(ast, functions, walk.base, state);
}
// default export of walkes
exports.default = walkes;
