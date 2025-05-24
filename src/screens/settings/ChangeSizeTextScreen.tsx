import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { TTextSize } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { useFontScale } from "@store/config/useFontScale";
import { type TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const getArrayThemes = (t: TFunction<"translation", undefined>): { id: TTextSize; label: string }[] => [
  {
    id: "small",
    label: t("changeText.small"),
  },
  {
    id: "medium",
    label: t("changeText.medium"),
  },
  {
    id: "large",
    label: t("changeText.large"),
  },
  {
    id: "xLarge",
    label: t("changeText.extraLarge"),
  },
];

const ChangeSizeTextScreen = () => {
  const { t } = useTranslation();
  const { size, setFontSize } = useFontScale();
  const { colors } = useTheme();
  const styles = useDynamicStyles(
    {
      container: {
        paddingHorizontal: SPACES.p2,
        backgroundColor: colors.onSecondary,
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
          <TouchableOpacity style={styles.content} onPress={() => setFontSize(item.id)}>
            <Text variant="titleMedium">{item.label}</Text>
            {size === item.id && <Icon name="checkmark-outline" size={24} color={colors.primary} />}
          </TouchableOpacity>
          <Divider bold />
        </View>
      ))}
    </View>
  );
};

export default ChangeSizeTextScreen;
