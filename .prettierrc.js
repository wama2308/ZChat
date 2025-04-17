module.exports = {
  plugins: ["prettier-plugin-organize-imports"],
  organizeImportsSkipDestructiveCodeActions: true,
  importOrder: [
    "^react", // 1. React (opcional)
    "^@?\\w", // 2. Paquetes externos (axios, lodash, etc.)
    "^@/(.*)$", // 3. Alias internos (@/components, @/utils)
    "^[./]", // 4. Imports relativos (./, ../)
  ],
  importOrderSeparation: true, // Añade líneas vacías entre grupos
  importOrderSortSpecifiers: true,
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  endOfLine: "lf",
  arrowParens: "always",
  printWidth: 110,
};
