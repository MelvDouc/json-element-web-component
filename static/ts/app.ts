import { JsonPseudoForm, NodeKind, type JsonPseudoFormTypes as JPF } from "$/mod";

if (!window.IS_PRODUCTION) {
  const eventSource = new EventSource("/esbuild");
  eventSource.addEventListener("change", () => location.reload());
}

const testValue = {
  title: "The Three Musketeers",
  publishedYear: 1844,
  authors: [
    "Alexandre Dumas",
    "Auguste Maquet"
  ]
};

class TestForm extends JsonPseudoForm {
  protected _format(node: JPF.PseudoFormNode) {
    switch (node.kind) {
      case NodeKind.Primitive: {
        node.parent.innerText = String(node.value);
        break;
      }
      case NodeKind.Array: {
        const ol = document.createElement("ol");
        node.value.forEach((value) => {
          const li = document.createElement("li");
          this._format(JsonPseudoForm._getNode(value, li, node.depth + 1));
          ol.append(li);
        });
        node.parent.append(ol);
        break;
      }
      case NodeKind.Dictionary: {
        this._formatDictionary(node);
      }
    }
  }

  private _formatDictionary(node: JPF.DictionaryFormNode) {
    const ul = document.createElement("ul");

    Object.entries(node.value).forEach(([key, value]) => {
      const li = document.createElement("li");

      const keyElement = document.createElement("div");
      keyElement.classList.add("dict-key");
      keyElement.innerText = key;

      const valueElement = document.createElement("div");
      valueElement.classList.add("dict-value");
      this._format(JsonPseudoForm._getNode(value, valueElement, node.depth + 1));

      li.append(keyElement, valueElement);
      ul.append(li);
    });

    node.parent.append(ul);
  }
}

customElements.define("json-pseudo-form", TestForm);

const pseudoForm = new TestForm(testValue);
document.body.append(pseudoForm);