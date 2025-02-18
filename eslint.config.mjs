import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from 'eslint-plugin-perfectionist';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const perfectionistConfig = {
  plugins: { perfectionist, },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      { type: 'line-length', order: 'asc', },
    ],
  },
}

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  perfectionistConfig
];

export default eslintConfig;