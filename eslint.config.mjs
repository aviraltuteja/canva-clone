import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Step 1: Ignore Prisma generated files
  {
    ignores: ["app/generated/**"],
  },

  // Step 2: Your normal Next.js + TypeScript lint rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Step 3: Add some gentle auto-fix-friendly tweaks
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        { allowShortCircuit: true },
      ],
      "@typescript-eslint/no-this-alias": "off", // prevent fails on legacy patterns
    },
  },
];

export default eslintConfig;
