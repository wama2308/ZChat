// src/screens/ContactScreen.tsx
import HeaderContacts from "@components/contacts/HeaderContacts";
import ListContacts from "@components/contacts/ListContacts";
import NoAccessToContacts from "@components/contacts/NoAccessToContacts";
import database from "@database/index";
import { useContactsRN } from "@hooks/contacts/useContactsRN";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ContactScreen = () => {
  const { loading, error, permissionStatus, reload, openAppSettings } = useContactsRN();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const shouldShowError = permissionStatus === "blocked" || permissionStatus === "denied" || !!error;

  let actionButton = () => {};
  if (permissionStatus === "denied" || !!error) {
    actionButton = () => reload();
  } else if (permissionStatus === "blocked") {
    actionButton = () => openAppSettings();
  }
  console.log(database);
  return (
    <View style={styles.container}>
      <HeaderContacts />
      {shouldShowError && <NoAccessToContacts actionButton={actionButton} error={error ?? ""} />}
      <View style={styles.listContainer}>
        <ListContacts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default ContactScreen;
