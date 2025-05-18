import ModalBottom from "@components/ui/ModalBottom";
import { type AppTheme } from "@config/themes/themes";
import { type IItemContact } from "@interfaces/contacts";
import { getItemContactStyles } from "@styles/contacts/ItemContact.style";
import { generateRandomColor } from "@utils/colors";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import OptionsInvitations from "./OptionsInvitations";

interface Props {
  data: IItemContact;
}

const ItemContact = ({ data }: Props) => {
  const { firstName, lastName, phoneNumbers, image, status, zchat } = data;
  const { t } = useTranslation();
  const { colors } = useTheme<AppTheme>();
  const [openInvitation, setOpenInvitation] = useState(false);

  const handleCloseInvitation = () => setOpenInvitation(false);

  const styles = useMemo(() => getItemContactStyles(colors), [colors]);

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <Image
            source={{ uri: image }}
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
        ) : (
          <Image source={require("../../assets/images/user-select.jpg")} style={styles.avatar} />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>
            {firstName || lastName
              ? `${firstName} ${lastName}`
              : phoneNumbers.length > 0
                ? phoneNumbers[0].number
                : ""}
          </Text>
          {status && <Text style={styles.status}>{status}</Text>}
        </View>
        {!zchat && (
          <Button mode="contained" onPress={() => setOpenInvitation(true)}>
            {t("contacts.invitation")}
          </Button>
        )}
      </View>

      {/* Modal para opciones de invitación */}
      <ModalBottom visible={openInvitation} onDismiss={handleCloseInvitation}>
        <OptionsInvitations />
      </ModalBottom>
    </>
  );
};

export default ItemContact;
