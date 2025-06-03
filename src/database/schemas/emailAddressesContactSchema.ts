import { tableSchema } from "@nozbe/watermelondb";

export const emailAddressesContactSchema = tableSchema({
  name: "email_addresses",
  columns: [
    { name: "label", type: "string" },
    { name: "email", type: "string" },
    { name: "contact_id", type: "string", isIndexed: true },
    { name: "created_at", type: "number" }, // Usamos number para timestamps UNIX
    { name: "updated_at", type: "number", isOptional: true }, // Opcional porque al crear no ex
  ],
});
