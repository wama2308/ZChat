// useLanguageStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TLanguage } from '@interfaces/config';

interface LanguageStore {
  language: TLanguage;
  setLanguage: (lng: TLanguage) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'system', // Valor predeterminado para el idioma
      setLanguage: (lng: TLanguage) => set({ language: lng }), // Cambiar el idioma en Zustand
    }),
    {
      name: 'user-language', // Nombre de la clave para el almacenamiento persistente
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage
    },
  ),
);
