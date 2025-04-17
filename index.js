// Main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";

import { name as appName } from "./app.json";
import App from "./src/App";
import { darkTheme, lightTheme } from "./src/config/themes/themes";
import { useLanguageSetup } from "./src/hooks/config/useLanguageSetup";
import { useThemeStore } from "./src/store/config/useThemeStore";

if (__DEV__) {
  require("./ReactotronConfig");
}

const queryClient = new QueryClient();
export default function Main() {
  const { isDarkMode } = useThemeStore();
  const isLanguageLoaded = useLanguageSetup();

  if (!isLanguageLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <App />
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
