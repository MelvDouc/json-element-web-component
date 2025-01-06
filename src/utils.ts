import BranchKind from "$/BranchKind.ts";
import type { JsonValue, JsonBranch } from "$/types.ts";

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
 * @returns A `Branch` object with a `kind` property matching the value passed in.
 */
export function createBranch(value: JsonValue, depth: number): JsonBranch {
  if (Array.isArray(value))
    return {
      kind: BranchKind.Array,
      value,
      depth
    };

  if (isObject(value))
    return {
      kind: BranchKind.Dictionary,
      value,
      depth
    };

  return {
    kind: BranchKind.Primitive,
    value,
    depth
  };
}