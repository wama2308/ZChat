// src/hooks/useContacts.ts
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Contacts, { type Contact } from "react-native-contacts";
import {
  check,
  openSettings,
  type Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";

type PermissionStatus = "granted" | "denied" | "blocked" | "unavailable";

const getPermission = (): Permission => {
  return Platform.select({
    ios: PERMISSIONS.IOS.CONTACTS,
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
    default: PERMISSIONS.ANDROID.READ_CONTACTS,
  })!;
};

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>("unavailable");
  const [error, setError] = useState<null | string>(null);

  const requestPermission = async () => {
    const status = await request(getPermission());
    setPermissionStatus(status as PermissionStatus);
    return status === RESULTS.GRANTED;
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      const status = await check(getPermission());
      setPermissionStatus(status as PermissionStatus);

      if (status === RESULTS.GRANTED) {
        const all = await Contacts.getAll();
        all.sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
        setContacts(all);
      } else if (status === RESULTS.DENIED) {
        const granted = await requestPermission();
        if (granted) {
          const all = await Contacts.getAll();
          all.sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
          setContacts(all);
        } else {
          setError("Permiso denegado");
        }
      } else if (status === RESULTS.BLOCKED) {
        setError("Permiso bloqueado. Ve a configuración.");
      }
    } catch (err: any) {
      console.error("Error al cargar contactos", err);
      setError("Error al cargar contactos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    permissionStatus,
    reload: loadContacts,
    openAppSettings: openSettings,
  };
};
