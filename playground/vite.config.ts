import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import path from "path";

export default defineConfig({
  plugins: [UnoCSS(path.join(__dirname, "uno.config.ts"))],
});
