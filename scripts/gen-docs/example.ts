import { BranchKind, JsonElement, type JsonBranch } from "$/mod.ts";

class MyJsonElement extends JsonElement {
  protected override _getChild(branch: JsonBranch): HTMLElement | Text {
    switch (branch.kind) {
      case BranchKind.Primitive: {
        return document.createTextNode(String(branch.value));
      }
      case BranchKind.Array: {
        const ol = document.createElement("ol");
        branch.value.forEach((childBranch) => {
          const li = document.createElement("li");
          li.append(this._getChild(childBranch));
          ol.append(li);
        });
        return ol;
      }
      case BranchKind.Dictionary: {
        const dl = document.createElement("dl");
        Object.entries(branch.value).forEach(([key, childBranch]) => {
          const dt = document.createElement("dt");
          dt.innerText = key;
          const dd = document.createElement("dd");
          dd.append(this._getChild(childBranch));
          dl.append(dt, dd);
        });
        return dl;
      }
    }
  }
}

customElements.define("my-json-element", MyJsonElement);

const element = new MyJsonElement({
  title: "The Three Musketeers",
  publishedYear: 1844,
  authors: [
    {
      name: "Alexandre Dumas",
      country: "France"
    },
    "Auguste Maquet"
  ]
});

document.body.append(element);