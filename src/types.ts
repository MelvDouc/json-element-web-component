import type BranchKind from "$/BranchKind.ts";

/**
 * A non-object JSON value.
 */
export type JsonPrimitive = string | number | boolean | null;
/**
 * An indexed collection of values.
 */
export type JsonArray = JsonValue[];
/**
 * Note: I use the term "dictionary" throughout this package
 * as "object" is ambiguous in JavaScript context.
 */
export type JsonDictionary = { [key: string]: JsonValue; };
/**
 * Any data type that constitutes a valid JSON expression on its own.
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonDictionary;

interface AbstractBranch {
  /**
   * How deep into a data tree this branch is found.
   */
  depth: number;
  /**
   * The concatenated dictionary keys / array indices of the path
   * that leads to this object within the data tree.
   */
  path: string;
}

/**
 * A branch with a primitive value.
 */
export interface PrimitiveBranch extends AbstractBranch {
  kind: BranchKind.Primitive;
  value: JsonPrimitive;
}

/**
 * A branch with an array value.
 */
export interface ArrayBranch extends AbstractBranch {
  kind: BranchKind.Array;
  value: JsonBranch[];
}

/**
 * A branch with a dictionary value.
 */
export interface DictionaryBranch extends AbstractBranch {
  kind: BranchKind.Dictionary;
  value: Record<string, JsonBranch>;
}

/**
 * A branch is a node in a JSON data tree.
 */
export type JsonBranch = Readonly<PrimitiveBranch | ArrayBranch | DictionaryBranch>;