/**
 * @format
 */
import React, {useState, useEffect} from 'react';
import {AppRegistry, Appearance} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/themes/themes';

export default function Main() {
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark',
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);
  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <App />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
