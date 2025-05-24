import { SPACES, type AppTheme } from "@config/themes/themes";
import { StyleSheet } from "react-native";

export const getItemContactStyles = (colors: AppTheme["colors"]) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.onSecondary,
      padding: SPACES.p1,
      gap: SPACES.g2,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      // marginRight: SPACES.m1,
    },
    initials: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.secondaryContainer,
    },
    info: {
      flex: 1,
    },
    status: {
      color: colors.outline,
    },
  });
};
