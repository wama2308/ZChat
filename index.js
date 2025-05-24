//LIBRARIES
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
// COMPONENTS
import { ActivityIndicator, PaperProvider, configureFonts } from "react-native-paper";
import App from "./src/App";
// CONFIG
import { darkTheme, lightTheme } from "./src/config/themes/themes";
// STORES
import { useLanguageSetup } from "./src/hooks/config/useLanguageSetup";
import { useFontScale } from "./src/store/config/useFontScale";
import { useThemeStore } from "./src/store/config/useThemeStore";
// UTILS
import { getFontConfig } from "./src/config/themes/changeFontsSizes";

if (__DEV__) {
  require("./ReactotronConfig");
}

const queryClient = new QueryClient();
export default function Main() {
  const { isDarkMode } = useThemeStore();
  const { scale } = useFontScale();
  const isLanguageLoaded = useLanguageSetup();

  const theme = useMemo(
    () => ({
      ...(isDarkMode ? darkTheme : lightTheme),
      fonts: configureFonts({ config: getFontConfig(scale) }),
    }),
    [scale, isDarkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        {isLanguageLoaded ? (
          <App />
        ) : (
          <ActivityIndicator
            animating={true}
            size={100}
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          />
        )}
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
