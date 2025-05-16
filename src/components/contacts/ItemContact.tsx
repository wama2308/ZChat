import { type AppTheme } from "@config/themes/themes";
import { type IItemContact } from "@interfaces/contacts";
import { getItemContactStyles } from "@styles/contacts/ItemContact.style";
import { generateRandomColor } from "@utils/colors";
import { useMemo } from "react";
import { Image, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface Props {
  data: IItemContact;
}

const ItemContact = ({ data }: Props) => {
  const { firstName, lastName, phoneNumbers, image, status } = data;
  const { colors } = useTheme<AppTheme>();
  const styles = useMemo(
    () => getItemContactStyles(colors),
    [colors] // Solo recalcula si cambian
  );
  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.avatar} />
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
    </View>
  );
};

export default ItemContact;
