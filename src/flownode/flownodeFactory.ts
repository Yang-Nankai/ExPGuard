import { Node } from "acorn";
import { FlowNode, NodeType } from "./flownode";
import { nodeGenerator } from "../utils/uuid";


/**
 * FlowNode Factory
 */
class FlowNodeFactory {
  public create(type: NodeType, astNode?: Node, parent?: Node): FlowNode {
    const node = new FlowNode(type, astNode, parent);

    if (astNode?._id) {
      node.cfgId = astNode._id; // have the id
    } else {
      node.cfgId = nodeGenerator.nextId();
    }

    return node;
  }

  createNormalNode(astNode?: Node, parent?: Node): FlowNode {
    return this.create(FlowNode.NORMAL_NODE_TYPE, astNode, parent);
  }

  createEntryNode(astNode?: Node): FlowNode {
    return this.create(FlowNode.ENTRY_NODE_TYPE, astNode);
  }

  createExitNode(): FlowNode {
    return this.create(FlowNode.EXIT_NODE_TYPE);
  }

  createBuiltInNode(): FlowNode {
    return this.create(FlowNode.BUILTIN_NODE_TYPE);
  }
}

// Singleton instance
export const flownodeFactory = new FlowNodeFactory();
