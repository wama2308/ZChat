import Icon from "@react-native-vector-icons/ionicons";
import { ComponentProps } from "react";

export type TLanguage = "system" | "en" | "es";

export type TIconName = ComponentProps<typeof Icon>["name"];

export interface IConfigItemProps {
  id: string;
  leftIconName: TIconName;
  label: string;
  onPress?: () => void;
  showRightArrow?: boolean;
  rightIconName?: TIconName;
  rightIconColor?: string;
}
