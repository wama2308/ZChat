//LIBRARIES
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { AppRegistry, View } from "react-native";
import Toast from "react-native-toast-message";
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

export const queryClient = new QueryClient();

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
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator animating={true} size={100} />
          </View>
        )}
        <Toast />
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
