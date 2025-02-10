import BranchKind from "$/BranchKind.ts";
import type { JsonArray, JsonBranch, JsonDictionary, JsonValue } from "$/types.ts";

/**
 * @param arg Any value.
 * @returns `true` the value passed in is a dictionary <u>or</u> an array.
 */
export function isObject(arg: unknown): arg is object {
  return typeof arg === "object" && arg !== null;
}

/**
 * @param value A JSON value.
 * @param depth The depth of branch.
 * @param path The path to the returned branch within the tree.
 * @returns A `JsonBranch` object with a `kind` property matching the type of the value passed in.
 */
export function createBranch(value: JsonValue, depth: number, path: string): JsonBranch {
  if (Array.isArray(value))
    return {
      kind: BranchKind.Array,
      value: createJsonBranchArray(value, depth, path),
      depth,
      path
    };

  if (isObject(value))
    return {
      kind: BranchKind.Dictionary,
      value: createJsonBranchRecord(value, depth, path),
      depth,
      path
    };

  return {
    kind: BranchKind.Primitive,
    value,
    depth,
    path
  };
}

function createJsonBranchArray(value: JsonArray, depth: number, path: string): JsonBranch[] {
  return value.map((item, i) => {
    return createBranch(item, depth + 1, getNextPath(path, i));
  });
}

function createJsonBranchRecord(value: JsonDictionary, depth: number, path: string): Record<string, JsonBranch> {
  return Object.entries(value).reduce((acc, [k, v]) => {
    acc[k] = createBranch(v, depth + 1, getNextPath(path, k));
    return acc;
  }, {} as Record<string, JsonBranch>);
}

function getNextPath(path: string, key: string | number): string {
  return path ? `${path}.${key}` : key.toString();
}