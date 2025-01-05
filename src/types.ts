import type BranchKind from "$/BranchKind.ts";

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonDictionary = { [key: string]: JsonValue; };
export type JsonValue = JsonPrimitive | JsonArray | JsonDictionary;

interface AbstractBranch {
  depth: number;
}

export interface PrimitiveBranch extends AbstractBranch {
  kind: BranchKind.Primitive;
  value: JsonPrimitive;
}

export interface ArrayBranch extends AbstractBranch {
  kind: BranchKind.Array;
  value: JsonArray;
}

export interface DictionaryBranch extends AbstractBranch {
  kind: BranchKind.Dictionary;
  value: JsonDictionary;
}

/**
 * A branch is a node in a JSON data tree.
 */
export type JsonBranch = Readonly<PrimitiveBranch | ArrayBranch | DictionaryBranch>;