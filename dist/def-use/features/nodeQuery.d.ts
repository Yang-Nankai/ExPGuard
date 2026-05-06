import { Node } from "estree";
import { Selector } from "./selector";
export declare class NodeQuery<T extends Node = Node> {
    private nodes;
    private constructor();
    static from(ast: Node): NodeQuery;
    query<U extends Node = Node>(s: string): NodeQuery<U>;
    select<U extends Node = Node>(sel: Selector): NodeQuery<U>;
    has(sel: Selector): NodeQuery<T>;
    where(fn: any): NodeQuery<T>;
    result(): T[];
    exists(): boolean;
}
