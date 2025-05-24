import Icon from "@react-native-vector-icons/ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CallsScreen from "@screens/calls/CallsScreen";
import ChatsScreen from "@screens/chats/ChatsScreen";
import { useTranslation } from "react-i18next";
import ContactsNavigator from "./ContactsNavigator";
import SettingsNavigator from "./SettingsNavigator";

export type BottomTabParamList = {
  Chats: undefined;
  Calls: undefined;
  Contacts: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const icons = {
  Chats: "chatbubbles-outline",
  Calls: "call-outline",
  Contacts: "people-outline",
  Settings: "settings-outline",
} as const;

export default function BottomTabsNavigator() {
  const { t } = useTranslation();
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || "HomeSettings";

    if (
      routeName === "ThemeSettings" ||
      routeName === "LanguageSettings" ||
      routeName === "ProfileSettings" ||
      routeName === "ChangeSizeText"
    ) {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          display: getTabBarVisibility(route) ? "flex" : "none",
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} options={{ title: t("tabs.label-chats") }} />
      <Tab.Screen name="Calls" component={CallsScreen} options={{ title: t("tabs.label-calls") }} />
      <Tab.Screen
        name="Contacts"
        component={ContactsNavigator}
        options={{ title: t("tabs.label-contacts") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ title: t("tabs.label-settings") }}
      />
    </Tab.Navigator>
  );
}
