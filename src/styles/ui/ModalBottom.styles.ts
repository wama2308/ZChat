import { SPACES, type AppTheme } from "@config/themes/themes";
import { StyleSheet } from "react-native";

export const getMarginBottomStyles = (colors: AppTheme["colors"]) => {
  return StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "black",
    },
    modal: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      gap: SPACES.g1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    viewChildrens: {
      backgroundColor: colors.onSecondary,
      borderRadius: 20,
    },
    viewCancel: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.onSecondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 16,
    },
  });
};
