import BranchKind from "$/BranchKind.ts";
import type { JsonValue, JsonBranch } from "$/types.ts";

export function isObject(arg: unknown): arg is object {
  return typeof arg === "object" && arg !== null;
}

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