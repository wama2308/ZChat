import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importa las pantallas
import StartScreen from '@screens/start/StartScreen';
import RegisterScreen from '@screens/register/RegisterScreen';
import LoginScreen from '@screens/login/Login';
import { CombinedDarkTheme, CombinedLightTheme } from '@config/themes/themes';
import { useThemeStore } from '@store/config/useThemeStore';
import { useTranslation } from 'react-i18next';

// Definir los tipos de la navegación
export type RootStackParamList = {
  Start: undefined;
  Register: undefined; // Parámetro opcional
  Login: undefined; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeStore();

  return (
    <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedLightTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerTitle: '', headerBackTitle: t('label-back') }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
