// ESLint flat config for TypeScript projects (ESLint v9+)
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest"
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
  },
  {
    files: ["examples/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest"
      },
      globals: {
        process: "readonly",
        console: "readonly",
        require: "readonly",
        __dirname: "readonly",
        module: "readonly",
        Buffer: "readonly",
        setInterval: "readonly",
        NodeJS: "readonly",
        fetch: "readonly"
      }
    },
    rules: {}
  },
];
