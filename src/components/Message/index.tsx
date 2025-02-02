import { BrainCircuit } from "lucide-react";
import Deepseek from "/src/images/deepseek.png";
import { motion } from "framer-motion";

interface MessageProps {
  message: {
    from: string;
    content: string;
  };
  index: number;
}

export default function Message({ message, index }: MessageProps) {
  return (
    <motion.div
      className={`p-8 w-full md:max-w-3/5 rounded-xl shadow-3xl relative ${
        message.from === "user"
          ? "ml-auto bg-[var(--background)]"
          : " bg-purple-100"
      }`}
      key={index}
      initial={{ x: message.from == "user" ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {message.from !== "user" && (
        <img
          src={Deepseek}
          className="absolute top-0 left-0 aspect-square w-10 translate-x-1/4 -translate-y-2/5 md:translate-x-[-150%] md:translate-y-0 rounded-full shadow-3xl"
        />
      )}
      {!message.content && (
        <span className="text-purple-500 flex gap-1 items-center">
          <BrainCircuit size={16} /> Gerando...
        </span>
      )}
      {message.content}
    </motion.div>
  );
}
