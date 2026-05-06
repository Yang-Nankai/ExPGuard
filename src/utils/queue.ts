// queue.ts
export class Queue<T> extends Array<T> {
    constructor() {
        super();
        Object.setPrototypeOf(this, Queue.prototype);
    }

    push(elem: T): number {
        const pos = this.indexOf(elem);
        if (pos !== -1) {
            this.splice(pos, 1);
        }
        return super.push(elem);
    }
}

