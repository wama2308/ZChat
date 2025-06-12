import type Contact from "@database/models/Contact";
import type EmailContacts from "@database/models/EmailContacts";
import type PhoneNumberContacts from "@database/models/PhoneNumberContacts";
import { EContactStatus, type IItemContact, type IPhoneNumberContacts } from "@interfaces/contacts";
import type { RawWithDetails } from "@interfaces/generic";
import database from "../index";

export const createContact = async (input: IItemContact): Promise<RawWithDetails<IItemContact>> => {
  const phoneNumbers: RawWithDetails<IPhoneNumberContacts>[] = [];
  const newContact = await database.write(async () => {
    const contact = await database.get<Contact>("contacts").create((c) => {
      c.firstName = input.firstName;
      c.lastName = input.lastName;
      c.image = input.image ?? "";
      c.status = input.status ?? EContactStatus.OFFLINE;
      c.zchat = input.zchat ?? false;
      c.addFavorite = input.addFavorite ?? false;
    });

    if (input.phoneNumbers?.length) {
      for (const pn of input.phoneNumbers) {
        const phone = await database.get<PhoneNumberContacts>("phone_numbers").create((phone) => {
          phone.label = pn.label;
          phone.number = pn.number;
          phone.contact.set(contact);
        });
        phoneNumbers.push({ label: phone.label, number: phone.number, ...phone._raw }); // Updated to include label and number
      }
    }

    if (input.email?.length) {
      for (const em of input.email) {
        await database.get<EmailContacts>("email_addresses").create((email) => {
          email.label = em.label;
          email.email = em.email;
          email.contact.set(contact);
        });
      }
    }

    return {
      id: contact.id,
      _status: contact._raw._status,
      _changed: contact._raw._changed,
      firstName: contact.firstName,
      lastName: contact.lastName,
      image: contact.image,
      status: contact.status,
      zchat: contact.zchat,
      addFavorite: contact.addFavorite,
      synchronized: false, // o el valor que corresponda
      phoneNumbers,
      email: input.email ?? [],
    };
  });

  return newContact;
};

export const getAllContacts = async (): Promise<IItemContact[]> => {
  const contacts = await database.get<Contact>("contacts").query().fetch();

  const contactsWithPhones = await Promise.all(
    contacts.map(async (contact) => {
      const phoneNumbers = await contact.phoneNumbers;

      return {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumbers: phoneNumbers.map((item) => ({
          id: item.id,
          label: item.label,
          number: item.number,
        })),
        image: contact.image,
        email: [],
        status: contact.status,
        zchat: contact.zchat,
        addFavorite: contact.addFavorite,
        synchronized: contact.synchronized,
      };
    })
  );

  return contactsWithPhones;
};

export const getContactById = async (id: string) => {
  return await database.get<Contact>("contacts").find(id);
};

export const updateContactById = async (
  contactId: string,
  data: Partial<Pick<Contact, "firstName" | "lastName" | "zchat" | "addFavorite" | "status">>,
  phoneData?: Partial<Pick<PhoneNumberContacts, "label" | "number">>
) => {
  try {
    await database.write(async () => {
      const contactsCollection = database.get<Contact>("contacts");
      const phonesCollection = database.get<PhoneNumberContacts>("phone_numbers");

      const contact = await contactsCollection.find(contactId);

      if (!contact) {
        console.warn("Contacto no encontrado");
        return;
      }

      // Actualizar datos del contacto
      await contact.update((record) => {
        if (data.firstName !== undefined) record.firstName = data.firstName;
        if (data.lastName !== undefined) record.lastName = data.lastName;
        if (data.zchat !== undefined) record.zchat = data.zchat;
        if (data.addFavorite !== undefined) record.addFavorite = data.addFavorite;
        if (data.status !== undefined) record.status = data.status;
      });

      // Actualizar o crear teléfono
      if (phoneData) {
        const existingPhones = await contact.phoneNumbers;
        const firstPhone = existingPhones[0];

        if (firstPhone) {
          await firstPhone.update((phone) => {
            if (phoneData.label !== undefined) phone.label = phoneData.label;
            if (phoneData.number !== undefined) phone.number = phoneData.number;
          });
        } else {
          await phonesCollection.create((newPhone) => {
            newPhone.contact.set(contact); // asignar la relación (contact es el modelo)            newPhone.label = phoneData.label ?? "mobile";
            newPhone.number = phoneData.number ?? "";
          });
        }
      }
    });
  } catch (error) {
    console.error("Error actualizando contacto y teléfono:", error);
  }
};

export const updateContact = async (contactData: IItemContact): Promise<RawWithDetails<IItemContact>> => {
  const { id, firstName, lastName, image, phoneNumbers } = contactData;

  if (!id) {
    throw new Error("El ID del contacto es requerido para actualizar.");
  }
  const phoneEdit: RawWithDetails<IPhoneNumberContacts>[] = [];
  const contactEdit = await database.write(async () => {
    const contact = await database.get<Contact>("contacts").find(id);

    // Actualizar contacto
    await contact.update((record) => {
      record.firstName = firstName;
      record.lastName = lastName;
      record.image = image;
    });

    // Actualizar teléfonos
    for (const phone of phoneNumbers) {
      if (phone.id) {
        const phoneRecord = await database.get<PhoneNumberContacts>("phone_numbers").find(phone.id);
        await phoneRecord.update((record) => {
          record.label = phone.label;
          record.number = phone.number;
        });
        phoneEdit.push({ label: phoneRecord.label, number: phoneRecord.number, ...phoneRecord._raw });
      }
    }

    return {
      id: contact.id,
      _status: contact._raw._status,
      _changed: contact._raw._changed,
      firstName: contact.firstName,
      lastName: contact.lastName,
      image: contact.image,
      status: contact.status,
      zchat: contact.zchat,
      addFavorite: contact.addFavorite,
      synchronized: false, // o el valor que corresponda
      phoneNumbers: phoneEdit,
    };
  });
  return contactEdit;
};
