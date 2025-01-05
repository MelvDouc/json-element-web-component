import { createBranch } from "$/utils.ts";
import type { JsonValue, JsonBranch } from "$/types.ts";

/**
 * A customizable element for displaying JSON data.
 */
export default abstract class JsonElement extends HTMLElement {
  public constructor(value: JsonValue) {
    super();
    const childNode = this._getChild(createBranch(value, 1));
    this.append(childNode);
  }

  /**
   * Format a JSON value to any kind of node.
   * @param branch An object containing a JSON value as well as its own depth within the data tree.
   */
  protected abstract _getChild(branch: JsonBranch): Node;

  /**
   * Create a new node from a parent branch and a JSON value. This is typically called when appending an child to a newly created element.
   */
  protected _nextChild(branch: JsonBranch, value: JsonValue): Node {
    return this._getChild(createBranch(value, branch.depth + 1));
  }
}