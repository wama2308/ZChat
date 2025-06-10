import ModalBottom from "@components/ui/ModalBottom";
import { type AppTheme } from "@config/themes/themes";
import { DocumentDirectoryPath } from "@dr.pogodin/react-native-fs";
import { type IItemContact } from "@interfaces/contacts";
import type { RootStackParamListContacts } from "@navigation/ContactsNavigator";
import Icon from "@react-native-vector-icons/ionicons";
import { type NavigationProp, useNavigation } from "@react-navigation/native";
import { getItemContactStyles } from "@styles/contacts/ItemContact.style";
import { generateRandomColor } from "@utils/colors";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { Button, Text, TouchableRipple, useTheme } from "react-native-paper";
import OptionsInvitations from "./OptionsInvitations";

interface Props {
  data: IItemContact;
}

const ItemContact = ({ data }: Props) => {
  const { firstName, lastName, phoneNumbers, image, status, zchat, addFavorite, id } = data;
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const navigation = useNavigation<NavigationProp<RootStackParamListContacts>>();
  const HEADER_FAVORITE = id === "headerFavorite";
  const displayName =
    firstName || lastName
      ? `${firstName} ${lastName}`
      : phoneNumbers.length > 0
        ? phoneNumbers[0].number
        : HEADER_FAVORITE
          ? t("contacts.add-favorites")
          : "";

  const [openInvitation, setOpenInvitation] = useState(false);

  const handleCloseInvitation = () => setOpenInvitation(false);

  const styles = useMemo(() => getItemContactStyles(colors), [colors]);

  const getImageUri = (path?: string) =>
    path?.startsWith("file://") || path?.startsWith("http")
      ? path
      : `file://${DocumentDirectoryPath}/${path}`;

  return (
    <>
      <TouchableRipple onPress={addFavorite ? () => navigation.navigate("FavoriteContacts") : undefined}>
        <View style={styles.container}>
          {image ? (
            <Image
              source={{
                uri: getImageUri(image),
              }}
              style={styles.avatar}
              defaultSource={require("../../assets/images/user-select.jpg")}
            />
          ) : firstName || lastName ? (
            <View style={[styles.avatar, styles.initials]}>
              <Text variant="titleLarge" style={{ color: generateRandomColor(), fontWeight: "600" }}>
                {firstName.trim().charAt(0).toUpperCase()}
                {lastName.trim().charAt(0).toUpperCase()}
              </Text>
            </View>
          ) : HEADER_FAVORITE ? (
            <Icon name="star-outline" size={48} color={colors.blueBootstrap} />
          ) : (
            <Image source={require("../../assets/images/user-select.jpg")} style={styles.avatar} />
          )}
          <View style={styles.info}>
            <Text variant="titleMedium">{displayName}</Text>
            {status && !HEADER_FAVORITE && (
              <Text variant="titleSmall" style={styles.status}>
                {status}
              </Text>
            )}
          </View>
          {!zchat && !addFavorite && (
            <Button mode="contained" onPress={() => setOpenInvitation(true)}>
              {t("contacts.invitation")}
            </Button>
          )}
        </View>
      </TouchableRipple>

      {/* Modal para opciones de invitación */}
      <ModalBottom visible={openInvitation} onDismiss={handleCloseInvitation}>
        <OptionsInvitations />
      </ModalBottom>
    </>
  );
};

export default ItemContact;
