import { Model } from "@nozbe/watermelondb";
import { children, date, field, text } from "@nozbe/watermelondb/decorators";
import type EmailContacts from "./EmailContacts";
import type PhoneNumberContacts from "./PhoneNumberContacts";

export default class Contact extends Model {
  static table = "contacts";
  static associations = {
    phone_numbers: { type: "has_many" as const, foreignKey: "contact_id" },
    email_addresses: { type: "has_many" as const, foreignKey: "contact_id" },
  };

  @text("first_name") firstName!: string;
  @text("last_name") lastName!: string;
  @text("image") image!: string;
  @text("status") status!: string;
  @field("zchat") zchat!: boolean;
  @field("add_favorite") addFavorite?: boolean;

  @children("phone_numbers") phoneNumbers!: PhoneNumberContacts[];
  @children("email_addresses") emails!: EmailContacts[];
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date; // Opcional
}
