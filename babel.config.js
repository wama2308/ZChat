module.exports = {
  presets: ["module:@react-native/babel-preset"],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "module-resolver",
      {
        root: ["./src"], // Indica que tu raíz está en `src`
        alias: {
          "@components": "./src/components",
          "@config": "./src/config",
          "@hooks": "./src/hooks",
          "@locales": "./src/locales",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@store": "./src/store",
          "@interfaces": "./src/interfaces",
          "@utils": "./src/utils",
          "@styles": "./src/styles",
          "@constants": "./src/constants",
          "@database": "./src/database",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
