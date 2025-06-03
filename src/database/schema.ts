// src/database/schema.ts
import { appSchema } from "@nozbe/watermelondb";
import { contactSchema } from "./schemas/contactSchema";
import { emailAddressesContactSchema } from "./schemas/emailAddressesContactSchema";
import { phoneNumberContactSchema } from "./schemas/phoneNumberContactSchema";

export default appSchema({
  version: 3,
  tables: [contactSchema, phoneNumberContactSchema, emailAddressesContactSchema],
});
