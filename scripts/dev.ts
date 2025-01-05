import * as esbuild from "esbuild";

const SERVE_DIR = "test-app";

const ctx = await esbuild.context({
  entryPoints: [`${SERVE_DIR}/ts/main.ts`],
  outfile: `${SERVE_DIR}/main.js`,
  bundle: true,
  format: "esm",
  platform: "browser",
  define: {
    "IS_PRODUCTION": "false"
  },
  tsconfigRaw: {
    compilerOptions: {
      baseUrl: "src",
      paths: {
        "$/*": ["./*"]
      }
    }
  }
});

await ctx.watch();

await ctx.serve({
  servedir: SERVE_DIR,
  onRequest: ({ method, path, status }) => {
    console.log(
      `%c[${method}] %c${path} %c(${status})`,
      "color: blue",
      "color: yellow",
      "color: green"
    );
  }
});