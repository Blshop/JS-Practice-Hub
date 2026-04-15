import i18next from 'i18next';
import en from '../locales/en.json' with { type: 'json' };
import ru from '../locales/ru.json' with { type: 'json' };

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  interpolation: { escapeValue: false },
});

export const t = (key, lang, params = {}) => {
  const originalLng = i18next.language;
  i18next.changeLanguage(lang);
  const result = i18next.t(key, params);
  i18next.changeLanguage(originalLng);
  return result;
};
