// @ts-check

import * as esbuild from "esbuild";

/** @type {import("esbuild").BuildOptions} */
const buildOptions = {
  entryPoints: ["static/ts/app.ts"],
  outfile: "static/js/index.js",
  bundle: true,
  format: "esm",
  platform: "browser"
};

const command = process.argv[2];

switch (command) {
  case "dev": {
    const ctx = await esbuild.context({
      ...buildOptions,
      define: {
        "window.IS_PRODUCTION": "false"
      }
    });
    await ctx.watch();
    await ctx.serve({
      servedir: ".",
      onRequest: ({ method, path, status }) => {
        console.log(`[${method}] ${path} (${status})`);
      }
    });
    break;
  }
  case "build": {
    await esbuild.build({
      ...buildOptions,
      define: {
        "window.IS_PRODUCTION": "true"
      }
    });
    await esbuild.stop();
    break;
  }
  default: {
    console.error(`Unknown option: ${command}.`);
  }
}
