import { AnimatePresence, motion } from "framer-motion";
import { Bot, Languages, Menu, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import "../../config/i18n.ts";

export default function Dashboard() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language); // Idioma atual
  const langMenuRef = useRef<HTMLDivElement>(null); // Referência do menu de idiomas
  const [langOpen, setLangOpen] = useState<boolean>(false); // Estado do menu de idiomas

  const changeLanguage = (lang: string) => {
    setLang(lang); // Atualiza o estado do idioma
    i18n.changeLanguage(lang); // Muda o idioma
  };

  const [menu, setMenu] = useState<boolean>(false);
  const redirect = useNavigate();

  const pages = [
    {
      name: "Chat",
      icon: Bot,
      link: null,
    },
  ];

  const langs = [
    {
      name: "Português&nbsp;(Brasil)",
      lang: "pt",
    },
    {
      name: "English",
      lang: "en",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-[var(--muted)] md:bg-[var(--background)]">
      <div className="w-full h-1/20 md:h-full md:w-18 md:relative flex md:flex-col justify-between items-center py-8 px-4 xl:p-8 md:border-none">
        <motion.div
          className="flex md:hidden p-4"
          onClick={() => setMenu(!menu)}
          animate={{ rotate: menu ? -90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Menu size={24} />
        </motion.div>
        {menu && (
          <div
            className="w-10 aspect-square rounded flex items-center justify-center transition hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 p-2 cursor-pointer relative"
            onClick={() => setLangOpen(!langOpen)}
            ref={langMenuRef}
          >
            {langOpen && (
              <div className="absolute z-10 right-full top-0 -translate-x-2 bg-[var(--background)] border rounded-xl p-4 w-auto flex flex-col gap-2 z-30">
                {langs.map((lan, index) => (
                  <span
                    className={`p-2 cursor-pointer select-none transition text-neutral-500 hover:text-neutral-900 ${
                      lang === lan.lang && "font-semibold"
                    }`}
                    key={index}
                    onClick={() => changeLanguage(lan.lang)}
                    dangerouslySetInnerHTML={{ __html: lan.name }}
                  ></span>
                ))}
              </div>
            )}
            <Languages size={20} />
          </div>
        )}
        <div className="hidden md:flex flex-row md:flex-col items-center gap-6">
          <div>
            <img
              className="w-full bg-neutral-600 rounded-full shadow border"
              src="/icon.png"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {pages.map((page, index) => (
              <div
                className={`w-10 aspect-square rounded flex items-center justify-center transition bg-purple-100 hover:bg-purple-200 text-[var(--primary)] hover:text-[var(--primary-hover)] p-2 ${
                  page.link && "cursor-pointer"
                }`}
                key={index}
                onClick={() => page.link && redirect(page.link)}
              >
                <page.icon size={20} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-6 items-center">
          <div
            className="w-10 aspect-square rounded flex items-center justify-center transition hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 p-2 cursor-pointer relative"
            onClick={() => setLangOpen(!langOpen)}
            ref={langMenuRef}
          >
            {langOpen && (
              <div className="absolute z-10 left-full bottom-0 translate-x-2 bg-[var(--background)] border rounded-xl p-4 w-auto flex flex-col gap-2">
                {langs.map((lan, index) => (
                  <span
                    className={`p-2 cursor-pointer select-none transition text-neutral-500 hover:text-neutral-900 ${
                      lang === lan.lang && "font-semibold"
                    }`}
                    key={index}
                    onClick={() => changeLanguage(lan.lang)}
                    dangerouslySetInnerHTML={{ __html: lan.name }}
                  ></span>
                ))}
              </div>
            )}
            <Languages size={20} />
          </div>
          <div className="w-12 h-12 bg-neutral-200 rounded-full flex justify-center items-center p-2 text-neutral-600 cursor-not-allowed">
            <User size={20} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="md:hidden bg-[var(--muted)] w-full h-full fixed top-2/25 left-0 z-20 flex justify-center items-start backdrop-blur-xs"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="w-2/4 grid grid-cols-2 gap-4 p-4 mt-20">
              {pages.map((page, index) => (
                <div
                  className="flex flex-col justify-center items-center gap-1"
                  key={index}
                  onClick={() => page.link && redirect(page.link)}
                >
                  <div className="w-20 aspect-square rounded flex items-center justify-center bg-purple-100 text-[var(--primary)] p-2 cursor-pointer">
                    <page.icon size={30} />
                  </div>
                  <p className="text-[var(--primary)]">{page.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-18/20 md:h-auto md:border md:rounded-xl md:m-4 p-6 bg-[var(--muted)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
