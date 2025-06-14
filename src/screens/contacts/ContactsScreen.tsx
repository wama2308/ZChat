// src/screens/ContactScreen.tsx
import ClassifyContacts from "@components/contacts/ClassifyContacts";
import HeaderContacts from "@components/contacts/HeaderContacts";
import ListContacts from "@components/contacts/ListContacts";
import ConfigItem from "@components/settings/ConfigItem";
import ViewSettings from "@components/settings/ViewSettings";
import Alert from "@components/ui/Alert";
import ModalBottom from "@components/ui/ModalBottom";
import useContactsScreen from "@hooks/contacts/useContactsScreen";
import type { RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ContactScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const {
    searchValue,
    isSeeker,
    dataContactsZChatAll,
    isFetchingAllContacts,
    isFetchingSeekerContacts,
    isErrorDataContactsZChatAll,
    openClassify,
    classify,
    handleSearchValue,
    handleOpenClassify,
    handleClassify,
  } = useContactsScreen();

  if (isFetchingAllContacts) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size={80} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <HeaderContacts
          handleSearchValue={handleSearchValue}
          searchValue={searchValue}
          handleOpenClassify={handleOpenClassify}
        />
        <ViewSettings>
          <ConfigItem
            leftIconName="calendar-outline"
            label={t("contacts.invite-from-calendar")}
            onPress={() => navigation.navigate("InviteFromCalendar")}
            id={"language-settings"}
            backColorIcon={"#0068a0"}
          />
        </ViewSettings>

        <View style={styles.listContainer}>
          {isErrorDataContactsZChatAll ? (
            <Alert type="error" message={t("contacts.error-load-list")} />
          ) : (
            dataContactsZChatAll &&
            (isFetchingSeekerContacts ? (
              <View style={styles.centered}>
                <ActivityIndicator animating={true} size={80} />
              </View>
            ) : (
              <ListContacts
                contacts={dataContactsZChatAll}
                allContacts={isSeeker}
                byClassify={classify}
                fromAgenda={false}
              />
            ))
          )}
        </View>
      </View>
      <ModalBottom visible={openClassify} onDismiss={() => handleOpenClassify(false)}>
        <ClassifyContacts
          byClassify={classify}
          handleClassify={handleClassify}
          handleOpenClassify={handleOpenClassify}
        />
      </ModalBottom>
    </>
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
