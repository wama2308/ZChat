import type { IConfigItemProps } from "@interfaces/config";
import { type RootStackParamListSettings } from "@navigation/SettingsNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider } from "react-native-paper";
import ConfigItem from "./ConfigItem";
import ViewSettings from "./ViewSettings";

const getSettingsItems = (
  t: TFunction<"translation", undefined>,
  navigation: NavigationProp<RootStackParamListSettings>
): IConfigItemProps[] => [
  {
    leftIconName: "language-outline",
    label: t("common.label-language"),
    onPress: () => navigation.navigate("LanguageSettings"),
    id: "language-settings",
  },
  {
    leftIconName: "color-palette-outline",
    label: t("common.label-theme"),
    onPress: () => navigation.navigate("ThemeSettings"),
    id: "theme-settings",
  },
];

const ListViewSettings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamListSettings>>();
  const settingsItems = getSettingsItems(t, navigation);

  return (
    <View>
      {settingsItems.map((item, index) => (
        <View key={item.id || index.toString()}>
          <ViewSettings>
            <ConfigItem
              id={item.id}
              leftIconName={item.leftIconName}
              label={item.label}
              onPress={item.onPress}
            />
          </ViewSettings>
          {index < settingsItems.length - 1 && <Divider bold />}
        </View>
      ))}
    </View>
  );
};

export default ListViewSettings;
