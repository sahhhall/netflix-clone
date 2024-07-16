import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          play: "Play",
          "watch later": "Watch Later",
          Logout: "Logout", 
          "Sign in":"Sign in",
          "Upcoming":"Upcoming",
          "Trending":"Trending",
          "Top Rated":"Top Rated" 
        },
      },
      hi: {
        translation: {
          play: "चलाएँa",
          "Sign in": "चलाएँ",
          Logout: "लॉग आउट",  
          "watch later": "बाद में देखें",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;