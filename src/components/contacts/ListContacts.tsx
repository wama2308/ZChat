// src/components/contacts/ListContacts.tsx
import Alert from "@components/ui/Alert";
import { SPACES, type AppTheme } from "@config/themes/themes";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import type { TClassifyContacts } from "@interfaces/config";
import type { IItemContact, TListItem } from "@interfaces/contacts";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { buildDataListContacts } from "@utils/dataContacts";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ItemContact from "./ItemContact";

interface Props {
  contacts: IItemContact[];
  allContacts: boolean;
  byClassify: TClassifyContacts;
}

const ListContacts = ({ contacts, allContacts, byClassify }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();

  const styles = useDynamicStyles(
    {
      header: {
        paddingVertical: SPACES.p1,
        paddingHorizontal: SPACES.p2,
        color: colors.onSurface,
        backgroundColor: colors.surfaceVariant,
      },
    },
    [colors]
  );

  const data = useMemo(() => buildDataListContacts(contacts, t, byClassify), [contacts, t, byClassify]);

  const renderItem = ({ item }: { item: TListItem }) => {
    if (item.type === "header") {
      return (
        <Text variant="titleSmall" style={styles.header}>
          {item.title}
        </Text>
      );
    }
    return <ItemContact data={item.data} />;
  };

  const ItemSeparatorComponent = ({ leadingItem }: { leadingItem?: TListItem }) => {
    if (!leadingItem || leadingItem.type === "header") return null;
    return (
      <View style={{ backgroundColor: colors.onSecondary }}>
        <Divider bold style={{ marginLeft: 70 }} />
      </View>
    );
  };

  const getItemType = useMemo(
    () => (item: TListItem) => {
      return item.type; // Esto ayuda a FlashList a reciclar vistas correctamente
    },
    []
  );

  return contacts.length > 0 ? (
    <FlashList
      data={data}
      keyExtractor={(item) => (item.type === "header" ? item.id : item.data.id!)}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      getItemType={getItemType}
      estimatedItemSize={68} // Estimar el tamaño promedio de un ítem
      stickyHeaderIndices={data
        .map((item, index) => (item.type === "header" ? index : -1))
        .filter((index) => index !== -1)} // Hacer los headers sticky
      drawDistance={2} // Número de pantallas adicionales a renderizar (default=2)
      overrideItemLayout={(layout, item) => {
        if (item.type === "header") {
          layout.size = 44; // Altura fija para headers
        } else {
          layout.size = 72; // Altura fija para items
        }
      }}
    />
  ) : (
    <Alert
      type={!allContacts ? "info" : "warning"}
      message={!allContacts ? t("contacts.add-new") : t("common.label-no-results")}
      action={!allContacts ? () => navigation.navigate("NewContact") : undefined}
    />
  );
};

export default memo(ListContacts);
