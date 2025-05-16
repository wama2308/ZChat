import { CombinedDarkTheme, CombinedLightTheme } from "@config/themes/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "@store/auth/useAuthStore";
import { useThemeStore } from "@store/config/useThemeStore";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import BottomTabsNavigator from "./BottomTabsNavigator";
import NoAuthNavigator from "./NoAuthNavigator";

// Definir los tipos de la navegación
export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined; // Parámetro opcional
};

const Stack = createStackNavigator<RootStackParamList>();
const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export default function AppNavigator() {
  const { isDarkMode } = useThemeStore();
  const { isLoggedIn } = useAuthStore();
  const [isReady, setIsReady] = useState(__DEV__ ? false : true); // Solo no restaurar en desarrollo
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        // Solo restauramos el estado si no hay deep link
        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state); // Restaurar el estado guardado
          }
        }
      } catch (error) {
        console.error("Error al restaurar estado:", error);

        // Si está en desarrollo, eliminar el estado persistente en caso de error
        if (__DEV__) {
          await AsyncStorage.removeItem(PERSISTENCE_KEY);
        }

        // En producción, verificar si el error es crítico y borrar el estado persistente
        if (!__DEV__) {
          // Asegurarse de borrar el estado persistente si detectas que la app está en un estado erróneo
          await AsyncStorage.removeItem(PERSISTENCE_KEY);
        }
      } finally {
        setIsReady(true); // Cambiar a 'true' para indicar que ya estamos listos
      }
    };

    if (!isReady) {
      restoreState(); // Llamar solo una vez para restaurar el estado
    }
  }, [isReady]); // El efecto se ejecuta solo si 'isReady' es false

  if (!isReady) {
    return null; // Mostrar un indicador de carga o regresar cuando esté listo
  }

  return (
    <NavigationContainer
      theme={isDarkMode ? CombinedDarkTheme : CombinedLightTheme}
      initialState={initialState} // Usar el estado restaurado si existe
      onStateChange={(state) => {
        try {
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state)); // Guardar el estado cada vez que cambie
        } catch (error) {
          console.error("Error al guardar el estado:", error);

          // Si ocurre un error en la grabación del estado, en producción también se elimina el estado
          if (!__DEV__) {
            AsyncStorage.removeItem(PERSISTENCE_KEY);
          }
        }
      }}
    >
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
