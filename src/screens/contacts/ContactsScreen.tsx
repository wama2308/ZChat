import { useContacts } from "@hooks/contacts/useContacts";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function ContactsScreen() {
  const { contacts, loading, error } = useContacts();
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  console.log("contacts ", contacts);
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.recordID}
      renderItem={({ item }) => <Text style={{ color: "#fff" }}>{item.givenName}</Text>}
    />
  );
}
