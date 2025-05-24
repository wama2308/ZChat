// src/screens/ContactScreen.tsx
import HeaderContacts from "@components/contacts/HeaderContacts";
import ListContacts from "@components/contacts/ListContacts";
import NoAccessToContacts from "@components/contacts/NoAccessToContacts";
import { useContacts } from "@hooks/contacts/useContacts";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ContactScreen = () => {
  const { loading, error, permissionStatus, reload, openAppSettings } = useContacts();
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

  return (
    <>
      <HeaderContacts />
      {shouldShowError && <NoAccessToContacts actionButton={actionButton} error={error ?? ""} />}
      <ListContacts />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
