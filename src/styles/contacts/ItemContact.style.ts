import { SPACES, type AppTheme } from "@config/themes/themes";
import { StyleSheet } from "react-native";

export const getItemContactStyles = (colors: AppTheme["colors"]) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.onSecondary,
      padding: SPACES.p1,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: SPACES.m2,
    },
    initials: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.secondaryContainer,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 16,
    },
    status: {
      fontSize: 14,
      color: colors.outline,
    },
  });
};
