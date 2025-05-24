// src/store/useFontScale.ts
import type { TTextSize } from "@interfaces/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const scaleMap: Record<TTextSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.15,
  xLarge: 1.3,
};

interface FontScaleState {
  size: TTextSize;
  scale: number;
  setFontSize: (size: TTextSize) => void;
}

export const useFontScale = create<FontScaleState>()(
  persist(
    (set) => ({
      size: "medium",
      scale: scaleMap.medium,
      setFontSize: (size) => set({ size, scale: scaleMap[size] }),
    }),
    {
      name: "sizeText-preference",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
