import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "jsr/**", "generated/**", "docs/**", "vite.config.ts", "eslint.config.js", "tests/unit/shared-mock-setup.ts"]
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest"
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        NodeJS: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "no-dupe-class-members": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-empty": "warn",
      "max-lines": ["warn", { max: 750, skipBlankLines: true, skipComments: true }]
    },
  },
  {
    files: ["tests/unit/terminal-*.test.ts"],
    // Uses /// #include to inline shared-mock-setup.ts defining mockedWs + sentFrameText.
    // ESLint runs on source files before Vite transforms, so it sees these as undefined.
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["src/api/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Auto-generated API types (cluster/types.ts, nodes/types.ts) exceed max-lines.
      // See header comments in each file for rationale.
      "max-lines": "off",
    },
  },
];
