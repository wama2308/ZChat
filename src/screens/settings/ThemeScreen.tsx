import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { TMode } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { useThemeStore } from "@store/config/useThemeStore";
import { type TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Appearance, TouchableOpacity, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const getArrayThemes = (
  t: TFunction<"translation", undefined>
): { id: TMode; label: string; mode: boolean }[] => [
  {
    id: "system",
    label: t("themes.device"),
    mode: Appearance.getColorScheme() === "dark",
  },
  {
    id: "dark",
    label: t("themes.dark"),
    mode: true,
  },
  {
    id: "light",
    label: t("themes.light"),
    mode: false,
  },
];

const ThemeScreen = () => {
  const { t } = useTranslation();
  const { mode, setTheme } = useThemeStore();
  const { colors } = useTheme();
  const styles = useDynamicStyles(
    {
      container: {
        paddingHorizontal: SPACES.p2,
        backgroundColor: colors.background,
      },
      content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: SPACES.p2,
      },
    },
    [colors]
  );

  const SETTINGS_THEMES = getArrayThemes(t);
  return (
    <View>
      {SETTINGS_THEMES.map((item) => (
        <View style={styles.container} key={item.id}>
          <TouchableOpacity style={styles.content} onPress={() => setTheme(item.id, item.mode)}>
            <Text variant="titleMedium">{item.label}</Text>
            {mode === item.id && <Icon name="checkmark-outline" size={24} color={colors.primary} />}
          </TouchableOpacity>
          <Divider bold />
        </View>
      ))}
    </View>
  );
};

export default ThemeScreen;
