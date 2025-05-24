import { type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { IConfigItemProps } from "@interfaces/config";
import { type RootStackParamListSettings } from "@navigation/SettingsNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { type TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
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
    backColorIcon: "#2faeeb",
  },
  {
    leftIconName: "color-palette-outline",
    label: t("common.label-theme"),
    onPress: () => navigation.navigate("ThemeSettings"),
    id: "theme-settings",
    backColorIcon: "#0068a0",
  },
  {
    leftIconName: "text-outline",
    label: t("changeText.change"),
    onPress: () => navigation.navigate("ChangeSizeText"),
    id: "change-text-settings",
    backColorIcon: "#663399",
  },
];

const ListViewSettings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamListSettings>>();
  const settingsItems = getSettingsItems(t, navigation);
  const { colors } = useTheme<AppTheme>();
  const styles = useDynamicStyles(
    {
      container: {
        backgroundColor: colors.onSecondary,
      },
    },
    [colors]
  );

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={settingsItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ViewSettings>
            <ConfigItem {...item} />
          </ViewSettings>
        )}
        ItemSeparatorComponent={() => <Divider bold style={{ marginLeft: 70 }} />}
      />
    </View>
  );
};

export default ListViewSettings;
