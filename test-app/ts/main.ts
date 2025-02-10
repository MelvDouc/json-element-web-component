import JsonFormContents from "./JsonFormContents.ts";

declare global {
  /**
   * ESBuild dev server param.
   */
  const IS_PRODUCTION: boolean;
}

if (!IS_PRODUCTION) {
  const eventSource = new EventSource("/esbuild");
  eventSource.addEventListener("change", () => location.reload());
}

const testValue = {
  title: "The Three Musketeers",
  publishedYear: 1844,
  authors: [
    {
      name: "Alexandre Dumas",
      country: "France"
    },
    "Auguste Maquet"
  ]
};

const formContents = new JsonFormContents(testValue);
const form = document.createElement("form");
form.append(formContents);
document.body.append(form);