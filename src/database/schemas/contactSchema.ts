import { tableSchema } from "@nozbe/watermelondb";

export const contactSchema = tableSchema({
  name: "contacts",
  columns: [
    { name: "first_name", type: "string" },
    { name: "last_name", type: "string" },
    { name: "image", type: "string" },
    { name: "status", type: "string" },
    { name: "zchat", type: "boolean" },
    { name: "add_favorite", type: "boolean" },
    { name: "created_at", type: "number" }, // Usamos number para timestamps UNIX
    { name: "updated_at", type: "number", isOptional: true }, // Opcional porque al crear no ex
  ],
});
