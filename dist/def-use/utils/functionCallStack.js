"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCallStack = void 0;
class FunctionCallStack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
    }
    pop() {
        return this.stack.pop();
    }
    peek() {
        return this.stack[this.stack.length - 1];
    }
    depth() {
        return this.stack.length;
    }
    clear() {
        this.stack.length = 0;
    }
    list() {
        return this.stack;
    }
    /**
     * Check for excessive recursion
     */
    isReentrant(frame) {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (this.stack[i].callee.key === frame.callee.key)
                return true;
        }
        return false;
    }
    isMaxDepth() {
        return this.depth() >= FunctionCallStack.MAX_DEPTH;
    }
}
exports.FunctionCallStack = FunctionCallStack;
FunctionCallStack.MAX_DEPTH = 20; // Reduced for performance
