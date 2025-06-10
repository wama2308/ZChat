// MUTATION
enum ContactMutationKey {
  "create" = "create",
  "update" = "update",
}

// QUERIES
enum ContactQueryKey {
  "contactAll" = "contactAll",
}

export const MutationKey = {
  contacts: ContactMutationKey,
};

export const QueryKey = {
  contact: ContactQueryKey,
};
