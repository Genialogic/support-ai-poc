// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Configuração de idiomas
i18n
  .use(LanguageDetector) // Detecta automaticamente o idioma do navegador
  .use(initReactI18next) // Integração com React
  .init({
    fallbackLng: "en", // Idioma padrão
    debug: true,
    resources: {
      pt: {
        translation: {
          introduction_title: "Olá, eu sou o DeepSeek 👋",
          introduction_description: "Como posso te ajudar?",
          prompt_placeholder: "Digite o que está pensando...",
          prompt_send: "Enviar",
          message_generating: "Gerando...",
        },
      },
      en: {
        translation: {
          introduction_title: "Hi, I'm DeepSeek 👋",
          introduction_description: "How can I help you?",
          prompt_placeholder: "Type what you're thinking...",
          prompt_send: "Send",
          message_generating: "Generating...",
        },
      },
      // Adicione outros idiomas conforme necessário
    },
    interpolation: {
      escapeValue: false, // React já faz o escaping
    },
  });

export default i18n;
