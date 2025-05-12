// src/screens/ContactScreen.tsx
import HeaderContacts from "@components/contacts/HeaderContacts";
import { useContacts } from "@hooks/contacts/useContacts";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ContactScreen = () => {
  const { loading } = useContacts();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (permissionStatus === "blocked") {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>Acceso a contactos bloqueado.</Text>
  //       <Button title="Abrir configuración" onPress={() => openAppSettings()} />
  //     </View>
  //   );
  // }

  // if (permissionStatus === "denied") {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>Necesitamos tu permiso para mostrar los contactos.</Text>
  //       <Button title="Volver a intentar" onPress={reload} />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>{error}</Text>
  //       <Button title="Reintentar" onPress={reload} />
  //     </View>
  //   );
  // }

  return (
    <HeaderContacts />
    // <FlatList
    //   data={contacts}
    //   keyExtractor={(item) => item.recordID}
    //   renderItem={({ item }) => (
    //     <View style={styles.item}>
    //       <Text style={{ color: "white" }}>{item.givenName}</Text>
    //     </View>
    //   )}
    // />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default ContactScreen;
