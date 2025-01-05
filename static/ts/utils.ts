import NodeKind from "$/NodeKind";
import type { JsonValue, PseudoFormNode } from "$/types";

export function isObject(arg: unknown): arg is object {
  return typeof arg === "object" && arg !== null;
}

export function getNode(value: JsonValue, parent: HTMLElement, depth: number): PseudoFormNode {
  if (Array.isArray(value))
    return {
      kind: NodeKind.Array,
      value,
      parent,
      depth
    };

  if (isObject(value))
    return {
      kind: NodeKind.Dictionary,
      value,
      parent,
      depth
    };

  return {
    kind: NodeKind.Primitive,
    value,
    parent,
    depth
  };
}