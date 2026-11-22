import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Computed once per build, so the browser bundle and the pre-render (server) bundle agree.
const BUILD_YEAR = new Date().getFullYear();

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_YEAR__: JSON.stringify(BUILD_YEAR),
  },
  // Vitest (npm test): run components in jsdom, a browser-like environment inside Node.
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
  },
});
