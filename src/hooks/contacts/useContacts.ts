// src/hooks/useContacts.ts
import { useContactsStore } from "@store/contacts/useContactsStore";
import { normalizeContacts } from "@utils/normalizeContacts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppState, type AppStateStatus, Platform } from "react-native";
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
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>("unavailable");
  const [error, setError] = useState<null | string>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const { setContactsPhone } = useContactsStore();

  const checkPermission = useCallback(async () => {
    try {
      const status = await check(getPermission());
      setPermissionStatus(status as PermissionStatus);
      return status;
    } catch (err) {
      console.error("Error al verificar permiso:", err);
      return RESULTS.DENIED;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const status = await request(getPermission());
      setPermissionStatus(status as PermissionStatus);
      return status === RESULTS.GRANTED;
    } catch (err) {
      console.error("Error al solicitar permiso:", err);
      return false;
    }
  }, []);

  const fetchAndSortContacts = async () => {
    try {
      const allContacts = await Contacts.getAll();
      const sortedContacts = [...allContacts].sort((a, b) =>
        (a.displayName || a.givenName || "").localeCompare(b.displayName || b.givenName || "")
      );
      setContacts(sortedContacts);
      const normalized = normalizeContacts(sortedContacts);
      setContactsPhone(normalized);
      setError(null);
    } catch (err) {
      console.error("Error al cargar contactos:", err);
      setError(t("contacts.error-load"));
    }
  };

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const status = await checkPermission();

    switch (status) {
      case RESULTS.GRANTED:
        await fetchAndSortContacts();
        break;
      case RESULTS.DENIED: {
        const granted = await requestPermission();
        if (granted) {
          await fetchAndSortContacts();
        }
        break;
      }
      case RESULTS.BLOCKED:
        break;
      default:
    }

    setLoading(false);
  }, [checkPermission, requestPermission, t]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === "active") {
        if (permissionStatus === "blocked") {
          const status = await checkPermission();
          if (status === RESULTS.GRANTED) {
            await fetchAndSortContacts();
          }
        }
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, [permissionStatus, checkPermission]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return {
    contacts,
    loading,
    error,
    permissionStatus,
    reload: loadContacts,
    openAppSettings: openSettings,
  };
};
