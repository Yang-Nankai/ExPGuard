import { SourceType } from "../../taint";
export type BuiltinSchema = ConstructorSchema | FunctionSchema | ObjectSchema;
interface BaseSchema {
    name: string;
    alias?: string;
}
interface PropertyOwner {
    props?: BuiltinProps;
}
export type BuiltinProps = Record<string, FunctionSchema | ObjectSchema | AttributeSchema>;
export interface ConstructorSchema extends BaseSchema {
    type: "constructor";
    proto?: string;
    prototypeName: string;
    prototypeProto?: string;
    staticMethods?: BuiltinProps;
    prototypeMethods?: BuiltinProps;
}
export interface FunctionSchema extends BaseSchema, PropertyOwner {
    type: "function";
    effect?: string;
}
export interface ObjectSchema extends BaseSchema, PropertyOwner {
    type: "object";
}
export interface AttributeSchema {
    type: "attribute";
    name: string;
    sourceType?: SourceType;
    readonly?: boolean;
}
export {};
