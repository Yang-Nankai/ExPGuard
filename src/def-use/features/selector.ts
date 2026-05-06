// selector.ts
export class Selector {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  /* ======================
   * Base
   * ====================== */

  static type(name: string): Selector {
    return new Selector(name);
  }

  static wildcard(): Selector {
    return new Selector("*");
  }

  static raw(selector: string): Selector {
    return new Selector(selector);
  }

  /* ======================
   * Attribute
   * ====================== */

  attr(name: string): Selector {
    return this.append(`[${name}]`);
  }

  attrEq(name: string, value: string | number): Selector {
    return this.append(
      typeof value === "string"
        ? `[${name}="${value}"]`
        : `[${name}=${value}]`
    );
  }

  attrNe(name: string, value: string | number): Selector {
    return this.append(
      typeof value === "string"
        ? `[${name}!="${value}"]`
        : `[${name}!=${value}]`
    );
  }

  attrCmp(
    name: string,
    op: ">" | "<" | ">=" | "<=",
    value: number
  ): Selector {
    return this.append(`[${name}${op}${value}]`);
  }

  attrRegex(name: string, regex: RegExp): Selector {
    return this.append(`[${name}=${regex.toString()}]`);
  }

  /* ======================
   * Relation
   * ====================== */

  descendant(sel: Selector): Selector {
    return new Selector(`${this} ${sel}`);
  }

  child(sel: Selector): Selector {
    return new Selector(`${this} > ${sel}`);
  }

  adjacent(sel: Selector): Selector {
    return new Selector(`${this} + ${sel}`);
  }

  sibling(sel: Selector): Selector {
    return new Selector(`${this} ~ ${sel}`);
  }

  /* ======================
   * Pseudo
   * ====================== */

  has(sel: Selector): Selector {
    return this.append(`:has(${sel})`);
  }

  not(sel: Selector): Selector {
    return this.append(`:not(${sel})`);
  }

  is(...sels: Selector[]): Selector {
    return this.append(`:is(${sels.join(", ")})`);
  }

  firstChild(): Selector {
    return this.append(":first-child");
  }

  lastChild(): Selector {
    return this.append(":last-child");
  }

  nthChild(n: number): Selector {
    return this.append(`:nth-child(${n})`);
  }

  nthLastChild(n: number): Selector {
    return this.append(`:nth-last-child(${n})`);
  }

  subject(): Selector {
    return new Selector(`!${this}`);
  }

  /* ======================
   * AST
   * ====================== */

  statement(): Selector {
    return this.append(":statement");
  }

  expression(): Selector {
    return this.append(":expression");
  }

  declaration(): Selector {
    return this.append(":declaration");
  }

  function(): Selector {
    return this.append(":function");
  }

  pattern(): Selector {
    return this.append(":pattern");
  }

  /* ======================
   * Internal
   * ====================== */

  private append(suffix: string): Selector {
    return new Selector(`${this.value}${suffix}`);
  }
}
