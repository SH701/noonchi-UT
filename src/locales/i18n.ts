import i18n from "i18next";
import { initReactI18next } from "react-i18next"; 

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

// 브라우저 환경에서 초기 언어 설정 
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en";
};

i18n
  .use(initReactI18next) 
  .init({
    resources: i18nResources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방지를 하므로 false 설정
    },
    react: {
      useSuspense: false, // Next.js 클라이언트 컴포넌트 환경에서 안정성을 위해 false 권장
    },
  });

export default i18n;