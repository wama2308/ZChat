import { Model, type Relation } from "@nozbe/watermelondb";
import { date, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import type Contact from "./Contact";

export default class PhoneNumberContacts extends Model {
  static table = "phone_numbers";
  static associations = {
    contacts: { type: "belongs_to" as const, key: "contact_id" },
  };

  @text("label") label!: string;
  @text("number") number!: string;

  @immutableRelation("contacts", "contact_id") contact!: Relation<Contact>;

  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date; // Opcional
}
