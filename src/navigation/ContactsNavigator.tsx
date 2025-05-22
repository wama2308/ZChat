import { type AppTheme } from "@config/themes/themes";
import { createStackNavigator } from "@react-navigation/stack";
import ContactsScreen from "@screens/contacts/ContactsScreen";
import NewContact from "@screens/contacts/NewContact";
import { useTheme } from "react-native-paper";

// Definir los tipos de la navegación
export type RootStackParamListContacts = {
  HomeContacts: undefined;
  NewContact: undefined;
};

const Stack = createStackNavigator<RootStackParamListContacts>();

export default function ContactsNavigator() {
  const { colors } = useTheme<AppTheme>();

  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.backButtonHeader }}>
      <Stack.Screen name="HomeContacts" component={ContactsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewContact" component={NewContact} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
