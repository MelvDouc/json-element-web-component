import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/mod.ts"],
  outdir: "dist",
  bundle: true,
  format: "esm",
  platform: "browser",
  define: {
    "IS_PRODUCTION": "true"
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

await esbuild.stop();