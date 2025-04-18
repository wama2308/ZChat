import type { TMode } from "@interfaces/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeStore {
  mode: TMode;
  isDarkMode: boolean;
  setTheme: (mode: TMode, isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "system", // Valor predeterminado para el modo
      isDarkMode: Appearance.getColorScheme() === "dark", // Detectar tema inicial
      setTheme: (mode: TMode, isDark: boolean) => set({ mode: mode, isDarkMode: isDark }), // Establecer tema manualmente
    }),
    {
      name: "theme-preference",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// 🔹 Escuchar cambios en el sistema y actualizar Zustand
Appearance.addChangeListener(({ colorScheme }) => {
  const state = useThemeStore.getState();
  if (state.mode === "system") {
    const isDark = colorScheme === "dark";
    state.setTheme("system", isDark);
  }
});
