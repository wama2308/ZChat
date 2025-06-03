import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2, // misma que en el paso anterior
      steps: [],
    },
    {
      toVersion: 3,
      steps: [
        createTable({
          name: "contacts",
          columns: [
            { name: "first_name", type: "string" },
            { name: "last_name", type: "string" },
            { name: "image", type: "string" },
            { name: "status", type: "string" },
            { name: "zchat", type: "boolean" },
            { name: "add_favorite", type: "boolean" },
            { name: "created_at", type: "number" },
            { name: "updated_at", type: "number", isOptional: true },
          ],
        }),
        createTable({
          name: "phone_numbers",
          columns: [
            { name: "label", type: "string" },
            { name: "number", type: "string" },
            { name: "contact_id", type: "string", isIndexed: true },
            { name: "created_at", type: "number" },
            { name: "updated_at", type: "number", isOptional: true },
          ],
        }),
        createTable({
          name: "email_addresses",
          columns: [
            { name: "label", type: "string" },
            { name: "email", type: "string" },
            { name: "contact_id", type: "string", isIndexed: true },
            { name: "created_at", type: "number" },
            { name: "updated_at", type: "number", isOptional: true },
          ],
        }),
      ],
    },
  ],
});
