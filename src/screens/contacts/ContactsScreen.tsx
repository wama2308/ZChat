// src/screens/ContactScreen.tsx
import HeaderContacts from "@components/contacts/HeaderContacts";
import ListContacts from "@components/contacts/ListContacts";
import Alert from "@components/ui/Alert";
import useListContacts from "@hooks/contacts/useListContacts";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ContactScreen = () => {
  const { t } = useTranslation();

  const { dataContactsZChatAll, isFetchingDataContactsZChatAll, isErrorDataContactsZChatAll } =
    useListContacts();

  if (isFetchingDataContactsZChatAll) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderContacts />
      <View style={styles.listContainer}>
        {isErrorDataContactsZChatAll ? (
          <Alert type="error" message={t("contacts.error-load-list")} />
        ) : (
          dataContactsZChatAll && <ListContacts contacts={dataContactsZChatAll} />
        )}
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
