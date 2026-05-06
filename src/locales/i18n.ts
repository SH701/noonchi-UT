import i18n from "i18next";

import en from "./namespace/en.json";
import es from "./namespace/es.json";
import ja from "./namespace/ja.json";
import ru from "./namespace/ru.json";

export const i18nResources = {
  en: { translation: en },
  ru: { translation: ru },
  ja: { translation: ja },
  es: { translation: es },
};

export default i18n;
