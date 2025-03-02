import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from 'eslint-plugin-perfectionist';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

// Сортировки
const alphabetical = [
  'error',
  { order: 'asc', type: 'alphabetical' },
]
const lineLength = [
  'error',
  { order: 'asc', type: 'line-length' },
]

const perfectionistConfig = {
  plugins: { perfectionist, },
  rules: {
    'perfectionist/sort-array-includes': alphabetical, // Сортировка массивов
    'perfectionist/sort-classes': alphabetical,        // Сортировка всего (?) в классе
    'perfectionist/sort-enums': lineLength,            // Сортировка enum
    'perfectionist/sort-exports': lineLength,          // Сортировка экспортов
    'perfectionist/sort-imports': [                    // Сортировка импортов
      'error',
      { newlinesBetween: 'always', order: 'asc', partitionByComment: true, type: 'line-length' },
    ],
    'perfectionist/sort-interfaces': lineLength,            // Сортировка интерфейсов
    'perfectionist/sort-intersection-types': lineLength,    // Сортировка наследования типов
    'perfectionist/sort-jsx-props': lineLength,             // Сортировка пропсов
    'perfectionist/sort-maps': lineLength,                  // Сортировка Map
    'perfectionist/sort-named-exports': lineLength,         // Сортировка экспортов
    'perfectionist/sort-named-imports': lineLength,         // Сортировка имён импортов
    'perfectionist/sort-objects': alphabetical,             // Сортировка объектов
    'perfectionist/sort-switch-case': alphabetical,         // Сортировка switch-case
    'perfectionist/sort-union-types': alphabetical,         // Сортировка union типов
    'perfectionist/sort-variable-declarations': lineLength, // Сортировка объявления переменных
  },
}

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  perfectionistConfig
];

export default eslintConfig;