// Main.tsx
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/config/themes/themes';
import {useThemeStore} from './src/store/config/useThemeStore';
import {useLanguageSetup} from './src/hooks/config/useLanguageSetup';

export default function Main() {
  const {isDarkMode} = useThemeStore();
  const isLanguageLoaded = useLanguageSetup();

  if (!isLanguageLoaded) return null;

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
