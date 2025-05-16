import { type IItemContact } from "@interfaces/contacts";
import { type Contact } from "react-native-contacts"; // El tipo original

export const normalizeContacts = (contacts: Contact[]): IItemContact[] => {
  return contacts.map((contact) => ({
    id: contact.recordID,
    firstName: contact.displayName || "",
    lastName: contact.givenName || "",
    phoneNumbers: contact.phoneNumbers.map((p) => ({
      label: p.label || "other",
      number: p.number,
    })),
    image: contact.thumbnailPath || "",
    email: contact.emailAddresses.map((e) => ({
      label: e.label || "other",
      email: e.email,
    })),
    status: "",
  }));
};
