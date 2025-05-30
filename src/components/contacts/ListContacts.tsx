// src/components/contacts/ListContacts.tsx
import { SPACES, type AppTheme } from "@config/themes/themes";
import { DATA_CONTACTS_FAVORITES, DATA_CONTACTS_ZCHAT } from "@constants/dataContacts";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type IItemContact } from "@interfaces/contacts";
import { FlashList } from "@shopify/flash-list";
import { useContactsStore } from "@store/contacts/useContactsStore";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ItemContact from "./ItemContact";

type ListItem = { type: "header"; title: string; id: string } | { type: "item"; data: IItemContact };

const ListContacts = () => {
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const contactsPhone = useContactsStore((state) => state.contactsPhone);

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

  // Convertir las secciones en una lista plana con headers y items
  const data = useMemo(() => {
    const result: ListItem[] = [];

    // Sección de favoritos
    result.push({ type: "header", title: t("common.label-favorites"), id: "favorites-header" });
    result.push(
      ...DATA_CONTACTS_FAVORITES.map((item) => ({
        type: "item" as const, // <-- Añade 'as const' aquí
        data: item,
      }))
    );

    // Sección de zchat
    result.push({ type: "header", title: t("contacts.zchat"), id: "zchat-header" });
    result.push(
      ...DATA_CONTACTS_ZCHAT.map((item) => ({
        type: "item" as const, // <-- Añade 'as const' aquí
        data: item,
      }))
    );

    // Sección de contactos del teléfono
    if (contactsPhone) {
      result.push({ type: "header", title: t("contacts.phone"), id: "phone-header" });
      result.push(
        ...contactsPhone
          .filter((c): c is IItemContact => c !== undefined)
          .map((item) => ({
            type: "item" as const, // <-- Añade 'as const' aquí
            data: item,
          }))
      );
    }

    return result;
  }, [contactsPhone, t]);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: ListItem }) => {
        if (item.type === "header") {
          return (
            <Text variant="titleSmall" style={styles.header}>
              {item.title}
            </Text>
          );
        }
        return <ItemContact data={item.data} />;
      },
    [styles.header]
  );

  const ItemSeparatorComponent = useMemo(
    () =>
      ({ leadingItem }: { leadingItem?: ListItem }) => {
        // No mostrar separador después de los headers
        if (!leadingItem || leadingItem.type === "header") return null;

        return (
          <View style={{ backgroundColor: colors.onSecondary }}>
            <Divider bold style={{ marginLeft: 70 }} />
          </View>
        );
      },
    [colors.onSecondary]
  );

  const getItemType = useMemo(
    () => (item: ListItem) => {
      return item.type; // Esto ayuda a FlashList a reciclar vistas correctamente
    },
    []
  );

  return (
    <FlashList
      data={data}
      keyExtractor={(item) => (item.type === "header" ? item.id : item.data.id)}
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
  );
};

export default memo(ListContacts);
