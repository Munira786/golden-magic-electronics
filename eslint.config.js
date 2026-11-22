// ESLint flat config, based on Vite's official React template.
// Run with `npm run lint`. CI runs it on every pull request (.github/workflows/ci.yml).
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  // Browser code (the site itself).
  {
    files: ["src/**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, __BUILD_YEAR__: "readonly" }, // __BUILD_YEAR__: see vite.config.js
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Core ESLint cannot see that a component is "used" when it only appears in JSX (<Navbar />),
      // so ignore capitalised names (components) and constants.
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },

  // Tests run in Node + jsdom (Vitest).
  {
    files: ["src/**/*.test.{js,jsx}", "src/test/**/*.{js,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // Test files export nothing for Fast Refresh to preserve.
      "react-refresh/only-export-components": "off",
    },
  },

  // Build-time server entry (scripts/prerender.js): exports a render function, never hot-reloaded.
  {
    files: ["src/entry-server.jsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },

  // Config files and build scripts run in Node.
  {
    files: ["*.config.js", "scripts/**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: "latest", sourceType: "module", globals: globals.node },
  },
]);
