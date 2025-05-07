import { CombinedDarkTheme, CombinedLightTheme } from "@config/themes/themes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "@store/auth/useAuthStore";
import { useThemeStore } from "@store/config/useThemeStore";
import BottomTabsNavigator from "./BottomTabsNavigator";
import NoAuthNavigator from "./NoAuthNavigator";

// Definir los tipos de la navegación
export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isDarkMode } = useThemeStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedLightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainApp" component={BottomTabsNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={NoAuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
