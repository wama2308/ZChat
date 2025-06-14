import HeaderInviteContacts from "@components/contacts/HeaderInviteContacts";
import ListContacts from "@components/contacts/ListContacts";
import NoAccessToContacts from "@components/contacts/NoAccessToContacts";
import { useContactsRN } from "@hooks/contacts/useContactsRN";

import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const InviteFromCalendar = () => {
  const { contacts, loading, error, permissionStatus, reload, openAppSettings } = useContactsRN();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size={80} />
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
    <View style={styles.container}>
      <HeaderInviteContacts />
      {shouldShowError && <NoAccessToContacts actionButton={actionButton} error={error ?? ""} />}
      <ListContacts contacts={contacts} allContacts={true} byClassify="byName" fromAgenda={true} />
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
    //padding: 16,
  },
  sectionHeaderContainer: {
    height: 30,
    backgroundColor: "gray",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
});

export default InviteFromCalendar;
