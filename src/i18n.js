import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: 'Welcome',
          dashboard: 'Dashboard',
          users: 'Users',
          products: 'Products',
          // ... more translations
        },
      },
      es: {
        translation: {
          welcome: 'Bienvenido',
          dashboard: 'Tablero',
          users: 'Usuarios',
          products: 'Productos',
          // ... more translations
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;