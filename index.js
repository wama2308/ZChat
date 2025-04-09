// Main.tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './src/config/themes/themes';
import { useThemeStore } from './src/store/config/useThemeStore';
import { useLanguageSetup } from './src/hooks/config/useLanguageSetup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
