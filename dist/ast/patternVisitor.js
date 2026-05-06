"use strict";
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
exports.PatternVisitor = void 0;
exports.extractPatternNames = extractPatternNames;
const walk = __importStar(require("acorn-walk"));
/**
 * Utility function: get the last element of an array or null.
 */
function getLast(xs) {
    return xs.length > 0 ? xs[xs.length - 1] : null;
}
/**
 * PatternVisitor is designed to walk through destructuring patterns
 * and collect information about declared identifiers, rest elements,
 * assignments, and right-hand-side nodes.
 *
 * It mimics the behavior of esrecurse-based visitor but uses acorn-walk.
 */
class PatternVisitor {
    constructor(rootPattern, callback) {
        this.assignments = [];
        this.rightHandNodes = [];
        this.restElements = [];
        this.rootPattern = rootPattern;
        this.callback = callback;
    }
    /**
     * Determine whether a node is a destructuring pattern.
     */
    static isPattern(node) {
        const type = node.type;
        return (type === "Identifier" ||
            type === "ObjectPattern" ||
            type === "ArrayPattern" ||
            type === "SpreadElement" ||
            type === "RestElement" ||
            type === "AssignmentPattern");
    }
    /**
     * Begin traversing the given node.
     */
    visit(node) {
        if (!node)
            return;
        const handlers = {
            Identifier: (pattern, state, c) => {
                const lastRestElement = getLast(this.restElements);
                this.callback(pattern, {
                    topLevel: pattern === this.rootPattern,
                    rest: lastRestElement != null && lastRestElement.argument === pattern,
                    assignments: [...this.assignments],
                });
            },
            Property: (property, state, c) => {
                if (property.computed) {
                    this.rightHandNodes.push(property.key);
                }
                c(property.value, state);
            },
            ArrayPattern: (pattern, state, c) => {
                for (const element of pattern.elements) {
                    if (element)
                        c(element, state);
                }
            },
            ObjectPattern: (pattern, state, c) => {
                for (const prop of pattern.properties) {
                    if (!prop)
                        continue;
                    // prop.type may be "Property" or "RestElement"
                    c(prop, state);
                }
            },
            AssignmentPattern: (pattern, state, c) => {
                this.assignments.push(pattern);
                c(pattern.left, state);
                this.rightHandNodes.push(pattern.right);
                this.assignments.pop();
            },
            RestElement: (pattern, state, c) => {
                this.restElements.push(pattern);
                c(pattern.argument, state);
                this.restElements.pop();
            },
            MemberExpression: (node, state, c) => {
                if (node.computed) {
                    this.rightHandNodes.push(node.property);
                }
                this.rightHandNodes.push(node.object);
            },
            SpreadElement: (node, state, c) => {
                c(node.argument, state);
            },
            ArrayExpression: (node, state, c) => {
                for (const elem of node.elements) {
                    if (elem)
                        c(elem, state);
                }
            },
            AssignmentExpression: (node, state, c) => {
                this.assignments.push(node);
                c(node.left, state);
                this.rightHandNodes.push(node.right);
                this.assignments.pop();
            },
            CallExpression: (node, state, c) => {
                node.arguments.forEach((arg) => this.rightHandNodes.push(arg));
                c(node.callee, state);
            },
        };
        walk.recursive(node, null, handlers);
    }
    /**
     * Get all collected right-hand-side nodes (e.g. default values, RHS of assignment).
     */
    getRightHandNodes() {
        return this.rightHandNodes;
    }
}
exports.PatternVisitor = PatternVisitor;
/**
 * Recursively extract variable names from a pattern.
 */
function extractPatternNames(node) {
    const names = [];
    if (!node)
        return names;
    if (PatternVisitor.isPattern(node)) {
        const visitor = new PatternVisitor(node, (pattern) => {
            if (pattern.name)
                names.push(pattern.name);
        });
        visitor.visit(node);
    }
    return names;
}
