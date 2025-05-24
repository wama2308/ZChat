import { type AppTheme } from "@config/themes/themes";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeSizeTextScreen from "@screens/settings/ChangeSizeTextScreen";
import LanguageScreen from "@screens/settings/LanguageScreen";
import ProfileScreen from "@screens/settings/ProfileScreen";
import SettingsScreen from "@screens/settings/SettingsScreen";
import ThemeScreen from "@screens/settings/ThemeScreen";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

// Definir los tipos de la navegación
export type RootStackParamListSettings = {
  HomeSettings: undefined;
  LanguageSettings: undefined;
  ThemeSettings: undefined;
  ChangeSizeText: undefined;
  ProfileSettings: undefined;
};

const Stack = createStackNavigator<RootStackParamListSettings>();

export default function SettingsNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.backButtonHeader }}>
      <Stack.Screen
        name="HomeSettings"
        component={SettingsScreen}
        options={{ headerTitle: t("tabs.label-settings") }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageScreen}
        options={{ headerTitle: t("common.label-language"), headerBackTitle: "" }}
      />
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeScreen}
        options={{ headerTitle: t("common.label-theme"), headerBackTitle: "" }}
      />
      <Stack.Screen
        name="ChangeSizeText"
        component={ChangeSizeTextScreen}
        options={{ headerTitle: t("changeText.change"), headerBackTitle: "" }}
      />
      <Stack.Screen name="ProfileSettings" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
