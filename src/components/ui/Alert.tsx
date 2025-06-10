import { type AppTheme, SPACES } from "@config/themes/themes";
import type { TAlert } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { type ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  message: ReactNode;
  type: TAlert;
  action?: () => void;
}

const ICONS: Record<TAlert, (theme: AppTheme) => ReactNode> = {
  success: (theme) => <Icon name="checkmark-circle-outline" size={24} color={theme.colors.successFont} />,
  error: (theme) => <Icon name="close-circle-outline" size={24} color={theme.colors.errorFont} />,
  info: (theme) => <Icon name="information-circle-outline" size={24} color={theme.colors.infoFont} />,
  warning: (theme) => <Icon name="warning-outline" size={24} color={theme.colors.warningFont} />,
};

const ALERT_COLORS: Record<TAlert, (theme: AppTheme) => { font: string; background: string }> = {
  success: (theme) => ({
    font: theme.colors.successFont,
    background: theme.colors.success,
  }),
  error: (theme) => ({
    font: theme.colors.errorFont,
    background: theme.colors.error20,
  }),
  info: (theme) => ({
    font: theme.colors.infoFont,
    background: theme.colors.info,
  }),
  warning: (theme) => ({
    font: theme.colors.warningFont,
    background: theme.colors.warning,
  }),
};

const Alert = ({ message, type, action }: Props) => {
  const theme = useTheme<AppTheme>(); // Extract the entire theme
  const { font, background } = ALERT_COLORS[type](theme);

  return (
    <Pressable onPress={() => action?.()}>
      <View style={[styles.container, { backgroundColor: background }]}>
        {ICONS[type](theme)}
        <Text style={[styles.text, { color: font }]}>{message}</Text>
      </View>
    </Pressable>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACES.g2,
    margin: SPACES.m2,
    padding: SPACES.p2,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    maxWidth: "100%", // Limita el ancho al padre
  },
  text: {
    fontWeight: "700",
    flexShrink: 1,
    flexWrap: "wrap", // Rompe líneas largas
    overflow: "hidden", // Evita desbordamiento
  },
});
