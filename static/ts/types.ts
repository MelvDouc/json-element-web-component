import type NodeKind from "$/NodeKind";

declare global {
  interface Window {
    readonly IS_PRODUCTION: boolean;
  }
}

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonDictionary = { [key: string]: JsonValue; };
export type JsonValue = JsonPrimitive | JsonArray | JsonDictionary;

export interface PrimitiveFormNode {
  kind: NodeKind.Primitive;
  value: JsonPrimitive;
  depth: number;
  parent: HTMLElement;
}

export interface ArrayFormNode {
  kind: NodeKind.Array;
  value: JsonArray;
  depth: number;
  parent: HTMLElement;
}

export interface DictionaryFormNode {
  kind: NodeKind.Dictionary;
  value: JsonDictionary;
  depth: number;
  parent: HTMLElement;
}

export type PseudoFormNode = PrimitiveFormNode | ArrayFormNode | DictionaryFormNode;