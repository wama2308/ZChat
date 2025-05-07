import AuthLayout from "@components/auth/AuthLayout";
import type { NoAuthtStackParamList } from "@navigation/NoAuthNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const StartScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const navigation = useNavigation<NavigationProp<NoAuthtStackParamList>>();

  return (
    <AuthLayout>
      <Text variant="titleMedium">{t("auth.register-start")}</Text>
      <Button
        mode="contained"
        theme={{ roundness: 1 }}
        accessibilityLabel="Botón para registrarse"
        onPress={() => navigation.navigate("Register")}
        style={{ width: "100%" }}
      >
        {t("auth.register")}
      </Button>
      <View style={styles.viewTexts}>
        <Text variant="titleMedium">{t("auth.have-an-account")}</Text>
        <Text variant="titleMedium">{t("auth.log-in-you")}</Text>
      </View>
      <Text
        style={[styles.textLink, { color: colors.primary }]}
        variant="titleMedium"
        onPress={() => navigation.navigate("Login")}
      >
        {t("auth.login")}
      </Text>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  viewTexts: {
    display: "flex",
    alignItems: "center",
  },
  textLink: {
    textDecorationLine: "underline",
  },
});

export default StartScreen;
