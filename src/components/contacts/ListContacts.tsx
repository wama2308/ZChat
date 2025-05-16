import { type AppTheme } from "@config/themes/themes";
import { DATA_CONTACTS_ZCHAT } from "@constants/dataContacts";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type IItemContact } from "@interfaces/contacts";
import { useContactsStore } from "@store/contacts/useContactsStore";
import { useTranslation } from "react-i18next";
import { SectionList, Text, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import ItemContact from "./ItemContact";

const ListContacts = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const { contactsPhone } = useContactsStore();
  console.log("contactsPhone", contactsPhone);
  const styles = useDynamicStyles(
    {
      header: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.onSurface,
        backgroundColor: colors.surfaceVariant,
      },
    },
    [colors]
  );

  const sections = [
    {
      title: t("contacts.zchat"),
      data: DATA_CONTACTS_ZCHAT,
    },
    ...(contactsPhone
      ? [
          {
            title: t("contacts.phone"),
            data: contactsPhone.filter((c): c is IItemContact => c !== undefined),
          },
        ]
      : []),
  ];

  return (
    <SectionList
      stickySectionHeadersEnabled={true}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ItemContact data={item} />}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: colors.onSecondary }}>
          <Divider bold style={{ marginLeft: 70 }} />
        </View>
      )}
    />
  );
};

export default ListContacts;
