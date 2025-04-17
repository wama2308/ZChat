// eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'; // ← Añade esto


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
      'simple-import-sort': eslintPluginSimpleImportSort,
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
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/split-platform-components': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'simple-import-sort/imports': 'error',  // ← Ordena imports al guardar
      'simple-import-sort/exports': 'error', // ← Ordena exports al guardar
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-unused-vars': ['error', {
        'vars': 'all',   // Aplica la regla para todas las variables
        'args': 'none',  // No marca como error los argumentos de las funciones no utilizados
        'ignoreRestSiblings': false, // No ignora las variables de objetos desestructurados no usadas
      }],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
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
