import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Platform } from "react-native";
import migrations from "./migrations";
import Contact from "./models/Contact";
import EmailContacts from "./models/EmailContacts";
import PhoneNumberContacts from "./models/PhoneNumberContacts";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "zchat",
  jsi: Platform.OS === "ios" ? true : false, // puede causar problemas en Android, desactiva si da errores
  onSetUpError: (error) => {
    console.error("Error al configurar la DB:", error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Contact, PhoneNumberContacts, EmailContacts],
});

export default database;
