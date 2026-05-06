"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flownodeFactory = void 0;
const flownode_1 = require("./flownode");
const uuid_1 = require("../utils/uuid");
/**
 * FlowNode Factory
 */
class FlowNodeFactory {
    create(type, astNode, parent) {
        const node = new flownode_1.FlowNode(type, astNode, parent);
        if (astNode === null || astNode === void 0 ? void 0 : astNode._id) {
            node.cfgId = astNode._id; // have the id
        }
        else {
            node.cfgId = uuid_1.nodeGenerator.nextId();
        }
        return node;
    }
    createNormalNode(astNode, parent) {
        return this.create(flownode_1.FlowNode.NORMAL_NODE_TYPE, astNode, parent);
    }
    createEntryNode(astNode) {
        return this.create(flownode_1.FlowNode.ENTRY_NODE_TYPE, astNode);
    }
    createExitNode() {
        return this.create(flownode_1.FlowNode.EXIT_NODE_TYPE);
    }
    createBuiltInNode() {
        return this.create(flownode_1.FlowNode.BUILTIN_NODE_TYPE);
    }
}
// Singleton instance
exports.flownodeFactory = new FlowNodeFactory();
