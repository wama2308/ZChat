import { tableSchema } from "@nozbe/watermelondb";

export const phoneNumberContactSchema = tableSchema({
  name: "phone_numbers",
  columns: [
    { name: "label", type: "string" },
    { name: "number", type: "string" },
    { name: "contact_id", type: "string", isIndexed: true },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
