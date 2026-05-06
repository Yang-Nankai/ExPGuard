"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
// queue.ts
class Queue extends Array {
    constructor() {
        super();
        Object.setPrototypeOf(this, Queue.prototype);
    }
    push(elem) {
        const pos = this.indexOf(elem);
        if (pos !== -1) {
            this.splice(pos, 1);
        }
        return super.push(elem);
    }
}
exports.Queue = Queue;
