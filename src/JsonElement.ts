import { createBranch } from "$/utils.ts";
import type { JsonValue, JsonBranch } from "$/types.ts";

/**
 * A customizable element for displaying JSON data.
 */
export default abstract class JsonElement extends HTMLElement {
  protected readonly _value: JsonValue;

  /**
   * @param value A valid JSON value. Can be primitive or an object.
   */
  public constructor(value: JsonValue) {
    super();
    this._value = value;
  }

  /**
   * Invoked when the element is added to the DOM.
   * This is where the child node tree is created.
   */
  connectedCallback(): void {
    const childNode = this._getChild(createBranch(this._value, 1, ""));
    this.append(childNode);
  }

  /**
   * Format a JSON value to any kind of node.
   * @param branch An object containing a JSON value as well as its own depth within the data tree.
   */
  protected abstract _getChild(branch: JsonBranch): Node;
}