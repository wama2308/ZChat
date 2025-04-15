import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: Appearance.getColorScheme() === "dark", // Detectar tema inicial
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })), // Alternar tema
      setTheme: (isDark: boolean) => set({ isDarkMode: isDark }), // Establecer tema manualmente
    }),
    {
      name: "theme-preference",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// 🔹 Escuchar cambios en el sistema y actualizar Zustand
Appearance.addChangeListener(({ colorScheme }) => {
  useThemeStore.getState().setTheme(colorScheme === "dark");
});
