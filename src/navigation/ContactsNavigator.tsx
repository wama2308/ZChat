import { type AppTheme } from "@config/themes/themes";
import type { IItemContact } from "@interfaces/contacts";
import { createStackNavigator } from "@react-navigation/stack";
import ContactsScreen from "@screens/contacts/ContactsScreen";
import FavoriteContacts from "@screens/contacts/FavoriteContacts";
import NewContact from "@screens/contacts/NewContact";
import { useTheme } from "react-native-paper";

// Definir los tipos de la navegación
export type RootStackParamListContacts = {
  HomeContacts: undefined;
  NewContact: { contact: IItemContact } | undefined;
  FavoriteContacts: undefined;
};

const Stack = createStackNavigator<RootStackParamListContacts>();

export default function ContactsNavigator() {
  const { colors } = useTheme<AppTheme>();

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.backButtonHeader }}>
      <Stack.Screen name="HomeContacts" component={ContactsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewContact" component={NewContact} options={{ headerShown: false }} />
      <Stack.Screen name="FavoriteContacts" component={FavoriteContacts} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
