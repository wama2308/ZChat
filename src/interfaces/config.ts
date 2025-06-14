import type Icon from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";

export type TLanguage = "system" | "en" | "es";
export type TMode = "system" | "dark" | "light";
export type TTextSize = "small" | "medium" | "large" | "xLarge";

export type TIconName = ComponentProps<typeof Icon>["name"];

export interface IConfigItemProps {
  id: string;
  leftIconName: TIconName;
  label: string;
  onPress?: () => void;
  showRightArrow?: boolean;
  rightIconName?: TIconName;
  rightIconColor?: string;
  backColorIcon?: string;
}

export interface ISettingsLanguage {
  id: TLanguage;
  label: string;
}

export interface AssetImageCrop {
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  fileSize?: number;
  fileName?: string;
}

export type TAlert = "error" | "warning" | "info" | "success";

export type TClassifyContacts = "byName" | "byLastSeen";
