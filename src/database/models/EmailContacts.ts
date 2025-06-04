import { Model, type Relation } from "@nozbe/watermelondb";
import { date, immutableRelation, text } from "@nozbe/watermelondb/decorators";
import type Contact from "./Contact";

export default class EmailContacts extends Model {
  static table = "email_addresses";
  static associations = {
    contacts: { type: "belongs_to" as const, key: "contact_id" },
  };

  @text("label") label!: string;
  @text("email") email!: string;

  @immutableRelation("contacts", "contact_id") contact!: Relation<Contact>;

  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date; // Opcional
}
