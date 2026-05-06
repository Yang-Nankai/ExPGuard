import { FunctionCallItem } from "./functionCallItem";

export class FunctionCallStack {
  private static readonly MAX_DEPTH = 20; // Reduced for performance
  private readonly stack: FunctionCallItem[] = [];

  push(item: FunctionCallItem): void {
    this.stack.push(item);
  }

  pop(): FunctionCallItem | undefined {
    return this.stack.pop();
  }

  peek(): FunctionCallItem | undefined {
    return this.stack[this.stack.length - 1];
  }

  depth(): number {
    return this.stack.length;
  }

  clear(): void {
    this.stack.length = 0;
  }

  list(): FunctionCallItem[] {
    return this.stack;
  }

  /**
   * Check for excessive recursion
   */
  isReentrant(frame: FunctionCallItem): boolean {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (this.stack[i].callee.key === frame.callee.key) return true;
    }
    return false;
  }

  isMaxDepth(): boolean {
    return this.depth() >= FunctionCallStack.MAX_DEPTH;
  }
}
