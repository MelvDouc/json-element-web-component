# JsonElement

Create a customizable element out of JSON data.

## Usage

```ts
import { BranchKind, JsonElement, type JsonElementTypes as JE } from "@melvdouc/json-element";

class MyJsonElement extends JsonElement {
  protected override _getChild(branch: JE.JsonBranch): HTMLElement | Text {
    switch (branch.kind) {
      case BranchKind.Primitive: {
        return document.createTextNode(String(branch.value));
      }
      case BranchKind.Array: {
        const ol = document.createElement("ol");
        branch.value.forEach((value) => {
          const li = document.createElement("li");
          li.append(this._nextChild(branch, value));
          ol.append(li);
        });
        return ol;
      }
      case BranchKind.Dictionary: {
        const dl = document.createElement("dl");
        Object.entries(branch.value).forEach(([key, value]) => {
          const dt = document.createElement("dt");
          dt.innerText = key;
          const dd = document.createElement("dd");
          dd.append(this._nextChild(branch, value));
          dl.append(dt, dd);
        });
        return dl;
      }
    }
  }
}

customElements.define("my-json-element", MyJsonElement);

const element = new JsonElement({
  title: "The Three Musketeers",
  publishedYear: 1844,
  authors: [
    "Alexandre Dumas",
    "Auguste Maquet"
  ]
});
```

outputs:

```html
<my-json-element>
  <dl>
    <dt>title</dt>
    <dd>The Three Musketeers</dd>
    <dt>publishedYear</dt>
    <dd>1844</dd>
    <dt>authors</dt>
    <dd>
      <ol>
        <li>Alexandre Dumas</li>
        <li>Auguste Maquet</li>
      </ol>
    </dd>
  </dl>
</my-json-element>
```
