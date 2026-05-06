"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selector = void 0;
// selector.ts
class Selector {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
    /* ======================
     * Base
     * ====================== */
    static type(name) {
        return new Selector(name);
    }
    static wildcard() {
        return new Selector("*");
    }
    static raw(selector) {
        return new Selector(selector);
    }
    /* ======================
     * Attribute
     * ====================== */
    attr(name) {
        return this.append(`[${name}]`);
    }
    attrEq(name, value) {
        return this.append(typeof value === "string"
            ? `[${name}="${value}"]`
            : `[${name}=${value}]`);
    }
    attrNe(name, value) {
        return this.append(typeof value === "string"
            ? `[${name}!="${value}"]`
            : `[${name}!=${value}]`);
    }
    attrCmp(name, op, value) {
        return this.append(`[${name}${op}${value}]`);
    }
    attrRegex(name, regex) {
        return this.append(`[${name}=${regex.toString()}]`);
    }
    /* ======================
     * Relation
     * ====================== */
    descendant(sel) {
        return new Selector(`${this} ${sel}`);
    }
    child(sel) {
        return new Selector(`${this} > ${sel}`);
    }
    adjacent(sel) {
        return new Selector(`${this} + ${sel}`);
    }
    sibling(sel) {
        return new Selector(`${this} ~ ${sel}`);
    }
    /* ======================
     * Pseudo
     * ====================== */
    has(sel) {
        return this.append(`:has(${sel})`);
    }
    not(sel) {
        return this.append(`:not(${sel})`);
    }
    is(...sels) {
        return this.append(`:is(${sels.join(", ")})`);
    }
    firstChild() {
        return this.append(":first-child");
    }
    lastChild() {
        return this.append(":last-child");
    }
    nthChild(n) {
        return this.append(`:nth-child(${n})`);
    }
    nthLastChild(n) {
        return this.append(`:nth-last-child(${n})`);
    }
    subject() {
        return new Selector(`!${this}`);
    }
    /* ======================
     * AST
     * ====================== */
    statement() {
        return this.append(":statement");
    }
    expression() {
        return this.append(":expression");
    }
    declaration() {
        return this.append(":declaration");
    }
    function() {
        return this.append(":function");
    }
    pattern() {
        return this.append(":pattern");
    }
    /* ======================
     * Internal
     * ====================== */
    append(suffix) {
        return new Selector(`${this.value}${suffix}`);
    }
}
exports.Selector = Selector;
