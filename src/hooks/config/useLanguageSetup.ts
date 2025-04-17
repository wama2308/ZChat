// src/hooks/useLanguageSetup.ts
import i18n, { getDeviceLanguage } from "@config/languages/i18n";
import { useLanguageStore } from "@store/config/useLanguageStore";
import { useEffect, useState } from "react";

export const useLanguageSetup = () => {
  const { language } = useLanguageStore();
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        // Si el idioma es 'system', obtenemos el idioma del dispositivo
        const systemLang = getDeviceLanguage();
        const langToUse = language === "system" ? systemLang : language || "es";

        // Aplicamos el idioma con i18n
        await i18n.changeLanguage(langToUse);

        // Marcamos que el idioma está cargado
        setIsLanguageLoaded(true);
      } catch (err) {
        console.error("❌ Error al cargar idioma:", err);
      }
    };

    initLanguage();
  }, [language]); // Se ejecuta cada vez que cambie el idioma

  return isLanguageLoaded;
};
