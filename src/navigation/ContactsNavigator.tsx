import { createStackNavigator } from "@react-navigation/stack";
import ContactsScreen from "@screens/contacts/ContactsScreen";
import NewContact from "@screens/contacts/NewContact";
import { useTranslation } from "react-i18next";

// Definir los tipos de la navegación
export type RootStackParamListContacts = {
  HomeContacts: undefined;
  NewContact: undefined;
};

const Stack = createStackNavigator<RootStackParamListContacts>();

export default function ContactsNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeContacts"
        component={ContactsScreen}
        options={{ headerTitle: t("tabs.label-contacts") }}
      />
      <Stack.Screen
        name="NewContact"
        component={NewContact}
        options={{ headerTitle: t("contacts.new"), headerBackTitle: "" }}
      />
    </Stack.Navigator>
  );
}
