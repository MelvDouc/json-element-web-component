import { createBranch } from "$/utils.ts";
import type { JsonValue, JsonBranch } from "$/typings/types.ts";

/**
 * A customizable element for displaying JSON data.
 */
export default abstract class JsonElement extends HTMLElement {
  protected readonly _value: JsonValue;

  public constructor(value: JsonValue) {
    super();
    this._value = value;
  }

  connectedCallback(): void {
    const childNode = this._getChild(createBranch(this._value, 1));
    this.append(childNode);
  }

  /**
   * Format a JSON value to any kind of node.
   * @param branch An object containing a JSON value as well as its own depth within the data tree.
   */
  protected abstract _getChild(branch: JsonBranch): Node;

  /**
   * Create a new node from a parent branch and a JSON value.
   * This is typically called when appending a child to a newly created element.
   * @param branch The parent branch.
   * @param value The JSON value of the child branch.
   */
  protected _nextChild(branch: JsonBranch, value: JsonValue): Node {
    return this._getChild(createBranch(value, branch.depth + 1));
  }
}