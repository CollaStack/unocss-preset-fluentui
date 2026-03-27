import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "es",
  target: "esnext",
  sourcemap: true,
  clean: true,
  dts: true,
});
