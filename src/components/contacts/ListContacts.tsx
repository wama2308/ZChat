// src/components/contacts/ListContacts.tsx
import { SPACES, type AppTheme } from "@config/themes/themes";
import { DATA_CONTACTS_FAVORITES, DATA_CONTACTS_ZCHAT } from "@constants/dataContacts";
import { useDynamicStyles } from "@hooks/config/useDynamicStyles";
import { type IItemContact } from "@interfaces/contacts";
import { useContactsStore } from "@store/contacts/useContactsStore";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SectionList, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ItemContact from "./ItemContact";

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

  // Memoizar las secciones para evitar recálculos innecesarios
  const sections = useMemo(
    () => [
      {
        id: 1,
        title: t("common.label-favorites"),
        data: DATA_CONTACTS_FAVORITES,
      },
      {
        id: 2,
        title: t("contacts.zchat"),
        data: DATA_CONTACTS_ZCHAT,
      },
      ...(contactsPhone
        ? [
            {
              id: 3,
              title: t("contacts.phone"),
              data: contactsPhone.filter((c): c is IItemContact => c !== undefined),
            },
          ]
        : []),
    ],
    [contactsPhone, t]
  );

  // Memoizar las funciones de renderizado
  const renderItem = useMemo(
    () =>
      ({ item }: { item: IItemContact }) => <ItemContact data={item} />,
    []
  );

  const renderSectionHeader = useMemo(
    () =>
      ({ section: { title } }: { section: { title: string } }) => (
        <Text variant="titleSmall" style={styles.header}>
          {title}
        </Text>
      ),
    [styles.header]
  );

  const ItemSeparatorComponent = useMemo(
    () => () => (
      <View style={{ backgroundColor: colors.onSecondary }}>
        <Divider bold style={{ marginLeft: 70 }} />
      </View>
    ),
    [colors.onSecondary]
  );

  return (
    <SectionList
      stickySectionHeadersEnabled={true}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={ItemSeparatorComponent}
      initialNumToRender={10} // Renderizar solo 10 items inicialmente
      maxToRenderPerBatch={5} // Renderizar en lotes de 5
      windowSize={5} // Tamaño de la ventana de renderizado
      updateCellsBatchingPeriod={30} // Tiempo de espera para batch updates
      removeClippedSubviews={true} // Eliminar vistas no visibles
    />
  );
};

export default memo(ListContacts);
