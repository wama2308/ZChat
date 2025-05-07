import { SPACES } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { ISettingsLanguage } from "@interfaces/config";
import Icon from "@react-native-vector-icons/ionicons";
import { useLanguageStore } from "@store/config/useLanguageStore";
import { type TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

const getArrayLanguages = (t: TFunction<"translation", undefined>): ISettingsLanguage[] => [
  {
    id: "system",
    label: t("languages.device"),
  },
  {
    id: "en",
    label: t("languages.english"),
  },
  {
    id: "es",
    label: t("languages.spanish"),
  },
];

const LanguageScreen = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
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

  const SETTINGS_LANGUAGES = getArrayLanguages(t);
  return (
    <View>
      {SETTINGS_LANGUAGES.map((item) => (
        <View style={styles.container} key={item.id}>
          <TouchableOpacity style={styles.content} onPress={() => setLanguage(item.id)}>
            <Text variant="titleMedium">{item.label}</Text>
            {language === item.id && <Icon name="checkmark-outline" size={24} color={colors.primary} />}
          </TouchableOpacity>
          <Divider bold />
        </View>
      ))}
    </View>
  );
};

export default LanguageScreen;
