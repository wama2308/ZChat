import Icon from "@react-native-vector-icons/ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CallsScreen from "@screens/calls/CallsScreen";
import ChatsScreen from "@screens/chats/ChatsScreen";
import ContactsScreen from "@screens/contacts/ContactsScreen";
import SettingsScreen from "@screens/settings/SettingsScreen";
import { useTranslation } from "react-i18next";

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

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} options={{ title: t("tabs.label-chats") }} />
      <Tab.Screen name="Calls" component={CallsScreen} options={{ title: t("tabs.label-calls") }} />
      <Tab.Screen name="Contacts" component={ContactsScreen} options={{ title: t("tabs.label-contacts") }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t("tabs.label-settings") }} />
    </Tab.Navigator>
  );
}
