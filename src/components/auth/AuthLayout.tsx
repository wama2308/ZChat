import { SPACES } from "@config/themes/themes";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TextLogo from "./TextLogo";

interface Props {
  children: React.ReactNode;
  contentCenter?: boolean;
}

const AuthLayout = ({ children, contentCenter = true }: Props) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: colors.background, marginTop: insets.top, marginBottom: insets.bottom },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={100} // ajusta según tu diseño
      >
        <ScrollView
          contentContainerStyle={[
            styles.contentContainer,
            { justifyContent: contentCenter ? "center" : "flex-start" },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Surface style={styles.surface} elevation={0}>
            {children}
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
      <TextLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: SPACES.p3,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    width: "100%",
  },
  surface: {
    display: "flex",
    flexDirection: "column",
    gap: SPACES.g3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthLayout;
