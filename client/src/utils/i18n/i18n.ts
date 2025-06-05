import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import sv from "./locales/sv.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  sv: {
    translation: sv,
  },
};

export function initI18n(preferredLanguage: string) {
  i18n.use(initReactI18next).init({
    resources,
    lng: preferredLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
