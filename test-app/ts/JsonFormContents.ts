import {
  JsonElement,
  BranchKind,
  type ArrayBranch,
  type DictionaryBranch,
  type JsonBranch
} from "$/mod.ts";

export default class JsonFormContents extends JsonElement {
  protected _getChild(branch: JsonBranch) {
    console.log(branch);
    switch (branch.kind) {
      case BranchKind.Primitive:
        return document.createTextNode(String(branch.value));
      case BranchKind.Array:
        return this._createArrayList(branch);
      case BranchKind.Dictionary:
        return this._createDictList(branch);
    }
  }

  private _createArrayList(branch: ArrayBranch) {
    const ol = document.createElement("ol");

    branch.value.forEach((childBranch) => {
      const li = document.createElement("li");
      li.append(this._getChild(childBranch));
      ol.append(li);
    });

    return ol;
  }

  private _createDictList(branch: DictionaryBranch) {
    const ul = document.createElement("ul");

    Object.entries(branch.value).forEach(([key, childBranch]) => {
      const li = document.createElement("li");

      const keyElement = document.createElement("div");
      keyElement.classList.add("dict-key");
      keyElement.innerText = key;

      const valueElement = document.createElement("div");
      valueElement.classList.add("dict-value");
      valueElement.append(this._getChild(childBranch));

      li.append(keyElement, valueElement);
      ul.append(li);
    });

    return ul;
  }
}

customElements.define("json-pseudo-form", JsonFormContents);