// src/hooks/useDynamicStyles.ts
import { useMemo } from "react";
import { type ImageStyle, StyleSheet, type TextStyle, type ViewStyle } from "react-native";

type NamedStyles<T> = Record<keyof T, ViewStyle | TextStyle | ImageStyle>;

export function useDynamicStyles<T extends NamedStyles<T>>(stylesObject: T, deps: any[] = []) {
  return useMemo(() => StyleSheet.create(stylesObject), deps);
}
