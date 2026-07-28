import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Build output and generated files. These must mirror .prettierignore and
  // the build-artifact entries of .gitignore, because eslint-plugin-prettier
  // enforces prettier's opinion on every file eslint reaches: any path prettier
  // skips but eslint lints turns into thousands of unfixable "errors". That is
  // exactly what .netlify did — its bundled vendor libs (0.6 MB of react-router
  // in one .mjs) accounted for 56,708 of the 56,716 problems `bun run lint`
  // reported, while `prettier --check .` called the repo clean. Prettier skips
  // dot-directories by default; eslint does not.
  {
    ignores: [
      "dist",
      "dist-ssr",
      ".output",
      ".vinxi",
      ".netlify",
      ".tanstack",
      ".lovable",
      "src/routeTree.gen.ts",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);
