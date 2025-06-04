import type Contact from "@database/models/Contact";
import type EmailContacts from "@database/models/EmailContacts";
import type PhoneNumberContacts from "@database/models/PhoneNumberContacts";
import database from "..";

interface NewContactInput {
  firstName: string;
  lastName: string;
  image?: string;
  status?: string;
  zchat?: boolean;
  addFavorite?: boolean;
  phoneNumbers?: { label: string; number: string }[];
  emails?: { label: string; email: string }[];
}

export const createContact = async (input: NewContactInput) => {
  await database.write(async () => {
    const newContact = await database.get<Contact>("contacts").create((contact) => {
      contact.firstName = input.firstName;
      contact.lastName = input.lastName;
      contact.image = input.image ?? "";
      contact.status = input.status ?? "";
      contact.zchat = input.zchat ?? false;
      contact.addFavorite = input.addFavorite ?? false;
    });

    if (input.phoneNumbers?.length) {
      for (const pn of input.phoneNumbers) {
        await database.get<PhoneNumberContacts>("phone_numbers").create((phone) => {
          phone.label = pn.label;
          phone.number = pn.number;
          phone.contact.set(newContact);
        });
      }
    }

    if (input.emails?.length) {
      for (const em of input.emails) {
        await database.get<EmailContacts>("email_addresses").create((email) => {
          email.label = em.label;
          email.email = em.email;
          email.contact.set(newContact);
        });
      }
    }
  });
};

export const updateContact = async (id: string, updates: Partial<NewContactInput>) => {
  const contact = await database.get<Contact>("contacts").find(id);

  if (!contact) throw new Error("Contacto no encontrado");

  await database.write(async () => {
    await contact.update((c) => {
      if (updates.firstName !== undefined) c.firstName = updates.firstName;
      if (updates.lastName !== undefined) c.lastName = updates.lastName;
      if (updates.image !== undefined) c.image = updates.image;
      if (updates.status !== undefined) c.status = updates.status;
      if (updates.zchat !== undefined) c.zchat = updates.zchat;
      if (updates.addFavorite !== undefined) c.addFavorite = updates.addFavorite;
    });
  });
};

export const getAllContacts = async () => {
  return await database.get<Contact>("contacts").query().fetch();
};

export const getContactById = async (id: string) => {
  return await database.get<Contact>("contacts").find(id);
};
