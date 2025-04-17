// useLanguageStore.ts
import { TLanguage } from "@interfaces/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LanguageStore {
  language: TLanguage;
  setLanguage: (lng: TLanguage) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "system", // Valor predeterminado para el idioma
      setLanguage: (lng: TLanguage) => set({ language: lng }), // Cambiar el idioma en Zustand
    }),
    {
      name: "user-language", // Nombre de la clave para el almacenamiento persistente
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage
    }
  )
);
