import { EContactStatus, type IItemContact } from "@interfaces/contacts";
import { type Contact } from "react-native-contacts"; // El tipo original

export const normalizeContacts = (contacts: Contact[]): IItemContact[] => {
  return contacts.map((contact) => ({
    id: contact.recordID,
    firstName: cleanName(contact.givenName ?? "") || "",
    lastName: cleanName(contact.familyName ?? "") || "",
    phoneNumbers: contact.phoneNumbers.map((p) => ({
      label: p.label || "other",
      number: p.number,
    })),
    image: contact.thumbnailPath || "",
    email: contact.emailAddresses.map((e) => ({
      label: e.label || "other",
      email: e.email,
    })),
    status: EContactStatus.OFFLINE,
    zchat: false,
    addFavorite: false,
    synchronized: false,
  }));
};

const cleanName = (str: string): string =>
  str
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // caracteres invisibles
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+/g, "") // emojis
    .trim();
