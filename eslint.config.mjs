// eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: parserTS,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
      'react-hooks': eslintPluginReactHooks,
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTS,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          semi: true,
          tabWidth: 2,
          singleQuote: false,
          jsxSingleQuote: false,
          endOfLine: 'lf',
          arrowParens: 'always',
          printWidth: 110,
          organizeImportsSkipDestructiveCodeActions: true,
          plugins: ['prettier-plugin-organize-imports'],
          importOrder: [
            '^react',       // 1. React (opcional)
            '^@?\\w',       // 2. Paquetes externos (axios, lodash, etc.)
            '^@/(.*)$',     // 3. Alias internos (@/components, @/utils)
            '^[./]',        // 4. Imports relativos (./, ../)
          ],
          importOrderSeparation: true, // Añade líneas vacías entre grupos
          importOrderSortSpecifiers: true,
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/split-platform-components': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/order': 'off',
      'no-unused-vars': ['error', {
        'vars': 'all',   // Aplica la regla para todas las variables
        'args': 'none',  // No marca como error los argumentos de las funciones no utilizados
        'ignoreRestSiblings': false, // No ignora las variables de objetos desestructurados no usadas
      }],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "@typescript-eslint/consistent-type-imports": "error",
      "max-params": ["error", 4],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];