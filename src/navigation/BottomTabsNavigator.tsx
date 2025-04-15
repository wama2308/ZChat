import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import Icon from '@react-native-vector-icons/ionicons';

import ChatsScreen from '@screens/chats/ChatsScreen';
import CallsScreen from '@screens/calls/CallsScreen';
import ContactsScreen from '@screens/contacts/ContactsScreen';
import SettingsScreen from '@screens/settings/SettingsScreen';

export type BottomTabParamList = {
  Chats: undefined;
  Calls: undefined;
  Contacts: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const icons = {
  Chats: 'chatbubbles-outline',
  Calls: 'call-outline',
  Contacts: 'people-outline',
  Settings: 'settings-outline',
} as const;

export default function BottomTabsNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Chats') iconName = 'chatbubbles-outline';
          if (route.name === 'Calls') iconName = 'call-outline';
          if (route.name === 'Contacts') iconName = 'people-outline';
          if (route.name === 'Settings') iconName = 'settings-outline';

          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} options={{ title: t('tabs.label-chats') }} />
      <Tab.Screen name="Calls" component={CallsScreen} options={{ title: t('tabs.label-calls') }} />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: t('tabs.label-contacts') }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('tabs.label-settings') }}
      />
    </Tab.Navigator>
  );
}
