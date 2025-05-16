// src/store/config/useAuthStore.ts
import { type IItemContact } from "@interfaces/contacts";
import { create } from "zustand";

interface AuthState {
  contactsPhone: IItemContact[] | null;
  setContactsPhone: (data: IItemContact[]) => void;
}

export const useContactsStore = create<AuthState>((set) => ({
  contactsPhone: null,
  setContactsPhone: (data) => set({ contactsPhone: data }),
}));
