// HeaderContacts.styles.ts
import { SPACES, type AppTheme } from "@config/themes/themes";
import { StyleSheet } from "react-native";

export const getHeaderStyles = (colors: AppTheme["colors"], marginTop: number) => {
  return StyleSheet.create({
    viewContainer: {
      flexDirection: "column",
      backgroundColor: colors.background,
      marginHorizontal: SPACES.m2,
      marginTop,
      paddingBottom: SPACES.p3,
      shadowOpacity: 0.3,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0.3 },
      shadowColor: colors.borderBottonHeader,
      borderBottomColor: colors.outline,
    },
    viewHeader: {
      flexDirection: "row",
      alignItems: "center",
      height: 60,
      overflow: "hidden",
    },
    viewTitle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingRight: SPACES.p2,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.onBackground,
    },
    touchableText: {
      marginHorizontal: SPACES.m2,
      width: 60,
    },
    text: {
      color: colors.brightBlue,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACES.m1,
    },
    searchBar: {
      flex: 1,
    },
    cancelButton: {
      marginLeft: SPACES.m1,
    },
  });
};
