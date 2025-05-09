import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Contacts, { type Contact } from "react-native-contacts";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Permiso de Contactos",
        message: "La app necesita acceso a tus contactos para funcionar correctamente.",
        buttonPositive: "Aceptar",
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS pide permiso automático con getAll()
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setError("Permiso denegado");
        setContacts([]);
        return;
      }

      const all = await Contacts.getAll();
      // Opcional: ordenar por nombre
      all.sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
      setContacts(all);
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

  return { contacts, loading, error, reload: loadContacts };
};
