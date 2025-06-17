import { SPACES, type AppTheme } from "@config/themes/themes";
import type { IEmailAddressesContacts, IPhoneNumberContacts } from "@interfaces/contacts";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

interface Props {
  phoneNumbers: IPhoneNumberContacts[];
  emails?: IEmailAddressesContacts[];
}

type ContactItem =
  | { type: "phone"; data: IPhoneNumberContacts }
  | { type: "email"; data: IEmailAddressesContacts };

const PhonesEmailsFromAgenda = ({ phoneNumbers, emails = [] }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const combinedData: ContactItem[] = [
    ...phoneNumbers.map((item) => ({ type: "phone" as const, data: item })),
    ...emails.map((item) => ({ type: "email" as const, data: item })),
  ];

  return (
    <View style={{ marginVertical: SPACES.m3 }}>
      <FlatList
        data={combinedData}
        renderItem={({ item }) => (
          <View>
            <Text variant="titleMedium" style={{ textTransform: "capitalize", color: colors.blueBootstrap }}>
              {item.type === "phone"
                ? item.data.label || t("common.label-mobile")
                : item.data.label || "Email"}
            </Text>
            <Text variant="titleMedium">{item.type === "phone" ? item.data.number : item.data.email}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: colors.onSecondary, marginVertical: SPACES.m1 }}>
            <Divider bold />
          </View>
        )}
        keyExtractor={(item) => (item.type === "phone" ? item.data.number : item.data.email)}
      />
    </View>
  );
};

export default PhonesEmailsFromAgenda;
