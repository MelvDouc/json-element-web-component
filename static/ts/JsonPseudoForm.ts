import { getNode } from "$/utils";
import type { JsonValue, PseudoFormNode } from "$/types";

export default abstract class JsonPseudoForm extends HTMLElement {
  protected static _getNode(value: JsonValue, parent: HTMLElement, depth: number): PseudoFormNode {
    return getNode(value, parent, depth);
  }

  public constructor(value: JsonValue) {
    super();
    this._format(JsonPseudoForm._getNode(value, this, 0));
  }

  protected abstract _format(node: PseudoFormNode): void;
}