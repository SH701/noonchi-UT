"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./namespace/en.json";
import es from "./namespace/es.json";
import ja from "./namespace/ja.json";
import ru from "./namespace/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    ja: { translation: ja },
    es: { translation: es },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
