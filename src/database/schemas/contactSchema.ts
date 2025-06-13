import { tableSchema } from "@nozbe/watermelondb";

export const contactSchema = tableSchema({
  name: "contacts",
  columns: [
    { name: "first_name", type: "string", isIndexed: true },
    { name: "last_name", type: "string", isIndexed: true },
    { name: "image", type: "string" },
    { name: "status", type: "string" },
    { name: "zchat", type: "boolean" },
    { name: "add_favorite", type: "boolean" },
    { name: "synchronized", type: "boolean" },
    { name: "last_seen", type: "number", isOptional: true },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
