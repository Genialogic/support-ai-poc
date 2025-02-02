import { Bot, Menu, User } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  const [menu, setMenu] = useState<boolean>(false);
  const redirect = useNavigate();

  const pages = [
    {
      name: "Chat",
      icon: Bot,
      link: null,
    },
  ];

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
        <div className="hidden md:block">
          <div className="w-12 h-12 bg-neutral-200 rounded-full flex justify-center items-center p-2 text-neutral-600 cursor-not-allowed">
            <User size={20} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div
            className="md:hidden bg-[var(--muted)] w-full h-full fixed top-2/25 left-0 z-10 flex justify-center items-start backdrop-blur-xs"
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
