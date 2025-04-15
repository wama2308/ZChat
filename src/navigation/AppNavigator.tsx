import { CombinedDarkTheme, CombinedLightTheme } from "@config/themes/themes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@screens/login/Login";
import RegisterScreen from "@screens/register/RegisterScreen";
import StartScreen from "@screens/start/StartScreen";
import { useAuthStore } from "@store/auth/useAuthStore";
import { useThemeStore } from "@store/config/useThemeStore";
import { useTranslation } from "react-i18next";

import BottomTabsNavigator from "./BottomTabsNavigator";

// Definir los tipos de la navegación
export type RootStackParamList = {
  Start: undefined;
  Register: undefined; // Parámetro opcional
  Login: undefined; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();
console.log(12);
export default function AppNavigator() {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedLightTheme}>
      {isLoggedIn ? (
        <BottomTabsNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerTitle: "", headerBackTitle: t("common.label-back") }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTitle: "", headerBackTitle: t("common.label-back") }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
