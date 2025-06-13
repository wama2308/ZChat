// src/components/contacts/ListContacts.tsx
import Alert from "@components/ui/Alert";
import { SPACES, type AppTheme } from "@config/themes/themes";
import { DATA_CONTACTS_FAVORITES } from "@constants/dataContacts";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type EContactStatus, type IItemContact } from "@interfaces/contacts";
import { type RootStackParamListContacts } from "@navigation/ContactsNavigator";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ItemContact from "./ItemContact";

type ListItem = { type: "header"; title: string; id: string } | { type: "item"; data: IItemContact };

interface Props {
  contacts: IItemContact[];
}

const buildDataList = (contacts: IItemContact[], t: (key: string) => string): ListItem[] => {
  const result: ListItem[] = [];

  const favorites = [
    ...DATA_CONTACTS_FAVORITES.map((item) => ({
      type: "item" as const,
      data: { ...item, status: item.status as EContactStatus },
    })),
    ...contacts.filter((item) => item.addFavorite).map((item) => ({ type: "item" as const, data: item })),
  ];

  const others = contacts.map((item) => ({ type: "item" as const, data: item }));

  if (favorites.length > 0) {
    result.push({ type: "header", title: t("common.label-favorites"), id: "favorites-header" });
    result.push(...favorites);
  }

  if (others.length > 0) {
    result.push({ type: "header", title: t("contacts.zchat"), id: "zchat-header" });
    result.push(...others);
  }

  return result;
};

const ListContacts = ({ contacts }: Props) => {
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

  const data = useMemo(() => buildDataList(contacts, t), [contacts, t]);

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === "header") {
      return (
        <Text variant="titleSmall" style={styles.header}>
          {item.title}
        </Text>
      );
    }
    return <ItemContact data={item.data} />;
  };

  const ItemSeparatorComponent = ({ leadingItem }: { leadingItem?: ListItem }) => {
    if (!leadingItem || leadingItem.type === "header") return null;
    return (
      <View style={{ backgroundColor: colors.onSecondary }}>
        <Divider bold style={{ marginLeft: 70 }} />
      </View>
    );
  };

  const getItemType = useMemo(
    () => (item: ListItem) => {
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
    <Alert type="info" message={t("contacts.add-new")} action={() => navigation.navigate("NewContact")} />
  );
};

export default memo(ListContacts);
