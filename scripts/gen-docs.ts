import { dirname, join } from "@std/path";
import denoJson from "../deno.json" with { type: "json" };

const dir = import.meta.dirname as string;
const docsDir = join(dir, "gen-docs");
const rootDir = dirname(dir);

const examplePath = join(docsDir, "example.ts");
const example = await Deno.readTextFile(examplePath);

const templatePath = join(docsDir, "README.template.md");
const template = await Deno.readTextFile(templatePath);

const readMe = template.replace(
  "/* EXAMPLE */",
  example.replace("$/mod.ts", denoJson.name)
);
await Deno.writeTextFile(join(rootDir, "README.md"), readMe);