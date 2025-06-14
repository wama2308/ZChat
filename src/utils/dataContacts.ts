import { DATA_CONTACTS_FAVORITES } from "@constants/dataContacts";
import type { EContactStatus, IItemContact, TListItem } from "@interfaces/contacts";

export const buildDataListContacts = (
  contacts: IItemContact[],
  t: (key: string) => string,
  sortBy: "byName" | "byLastSeen"
): TListItem[] => {
  const result: TListItem[] = [];

  const favorites: TListItem[] = [
    ...DATA_CONTACTS_FAVORITES.map((item) => ({
      type: "item" as const,
      data: { ...item, status: item.status as EContactStatus, lastSeen: null },
    })),
    ...contacts.filter((item) => item.addFavorite).map((item) => ({ type: "item" as const, data: item })),
  ];

  if (favorites.length > 0) {
    result.push({ type: "header", title: t("common.label-favorites"), id: "favorites-header" });
    result.push(...favorites);
  }

  const allContacts = contacts; // Incluye también los que son favoritos

  if (sortBy === "byName") {
    const grouped: Record<string, IItemContact[]> = {};

    for (const contact of allContacts) {
      const fullName = `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim();
      const letter = fullName.charAt(0).toUpperCase() || "#";
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(contact);
    }

    const sortedLetters = Object.keys(grouped).sort();

    for (const letter of sortedLetters) {
      result.push({ type: "header", title: letter, id: `letter-${letter}` });

      const sortedContacts = grouped[letter].sort((a, b) => {
        const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
        const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim();
        return nameA.localeCompare(nameB);
      });

      result.push(
        ...sortedContacts.map((contact) => ({
          type: "item" as const,
          data: contact,
        }))
      );
    }
  } else {
    if (allContacts.length > 0) {
      result.push({ type: "header", title: t("contacts.zchat"), id: "zchat-header" });
      result.push(
        ...allContacts.map((item) => ({
          type: "item" as const,
          data: item,
        }))
      );
    }
  }

  return result;
};
