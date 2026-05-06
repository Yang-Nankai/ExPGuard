// nodeQuery.ts
import esquery from "esquery";
import { Node } from "estree";
import { Selector } from "./selector";

export class NodeQuery<T extends Node = Node> {
  private nodes: Node[];

  private constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  static from(ast: Node): NodeQuery {
    return new NodeQuery([ast]);
  }

  query<U extends Node = Node>(s: string): NodeQuery<U> {
    const out: Node[] = [];

    for (const n of this.nodes) {
      out.push(...esquery(n, s));
    }

    return new NodeQuery(out);
  }


  select<U extends Node = Node>(sel: Selector): NodeQuery<U> {
    const out: Node[] = [];

    for (const n of this.nodes) {
      out.push(...esquery(n, sel.toString()));
    }

    return new NodeQuery(out);
  }

  has(sel: Selector): NodeQuery<T> {
    return new NodeQuery(
      this.nodes.filter(
        (n) => esquery(n, sel.toString()).length > 0
      )
    );
  }

  where(fn: any): NodeQuery<T> {
    return new NodeQuery(this.nodes.filter(fn));
  }

  result(): T[] {
    return this.nodes as T[];
  }

  exists(): boolean {
    return this.nodes.length > 0;
  }
}
