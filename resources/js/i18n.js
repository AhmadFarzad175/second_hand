import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslation from './locales/en/translation.json';
import faTranslation from './locales/da/translation.json';
import psTranslation from './locales/ps/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  fa: {
    translation: faTranslation
  },
  ps: {
    translation: psTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'ps'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;