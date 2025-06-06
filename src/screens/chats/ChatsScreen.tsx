import database from "@database/index";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";

export const logAllTables = async () => {
  try {
    const contacts = await database.get("contacts").query().fetch();
    console.info("📇 Contacts:", contacts);

    const phoneNumbers = await database.get("phone_numbers").query().fetch();
    console.info("📞 Phone Numbers:", phoneNumbers);

    const emails = await database.get("email_addresses").query().fetch();
    console.info("📧 Emails:", emails);

    // Agregá más tablas si tenés
    // const other = await database.get('other_table').query().fetch();
    // console.info('🗂️ Other:', other);
  } catch (error) {
    console.error("❌ Error obteniendo datos:", error);
  }
};

const ChatsScreen = () => {
  useFocusEffect(
    useCallback(() => {
      logAllTables();
    }, [])
  );
  return (
    <View>
      <Text>ChatsScreen</Text>
    </View>
  );
};

export default ChatsScreen;
