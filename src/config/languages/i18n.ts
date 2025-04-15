// i18n.ts
import en from "@locales/en/translation.json";
import es from "@locales/es/translation.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";
import * as RNLocalize from "react-native-localize";

// Detectar idioma del sistema
export const getDeviceLanguage = (): string => {
  try {
    // ✅ Primero intentamos con react-native-localize (mejor opción)
    const locales = RNLocalize.getLocales();
    if (locales?.length > 0 && locales[0]?.languageCode) {
      return locales[0].languageCode;
    }

    // 🧩 Fallback para iOS si localize no da resultados
    if (Platform.OS === "ios") {
      const settings = NativeModules.SettingsManager?.settings;
      const locale = settings?.AppleLanguages?.[0] || settings?.AppleLocale;
      return locale?.split(/[_-]/)[0] || "es";
    }

    // 🧩 Fallback para Android
    if (Platform.OS === "android") {
      const locale = NativeModules.I18nManager?.locale || NativeModules.I18nManager?.localeIdentifier;
      return locale?.split(/[_-]/)[0] || "es";
    }
  } catch (error) {
    console.error("❌ Error detecting device language:", error);
  }

  // 🌍 Fallback final
  return "es";
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: getDeviceLanguage(), // Establecer idioma predeterminado
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => console.error("Error initializing i18n:", err)); // Capturar errores

export default i18n;
