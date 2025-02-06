import { CircleStop, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Message from "../../components/Message";
import Deepseek from "/src/images/deepseek.png";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "system",
        content: `
          You must only respond in Portuguese-Brazil.
          You will respond as a support system for a birthday notification website named 'Lembretti', you can only answer questions related to technical issues, I want you to always indicate contacting via email to speak to an attendant, any question that is not related to support, you must respond that you do not know how to answer this type of question.
          `,
      },
    ]
  );
  const controllerRef = useRef<AbortController | null>(null);

  async function fetchOllamaDataWithStreaming(userMessage: string) {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancela qualquer requisição anterior antes de iniciar uma nova
    }

    controllerRef.current = new AbortController(); // Cria um novo AbortController
    const { signal } = controllerRef.current;

    setLoading(true);
    const response = await fetch(import.meta.env.VITE_AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL,
        messages: [...messages, { role: "user", content: userMessage }],
        stream: true, // Habilita o streaming
      }),
      signal: signal, // Passa o signal para a requisição
    });

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    let textFormatted = "";
    let canWrite = false;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: "" },
    ]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Verifica se o chunk não está vazio ou não contém texto válido para ser analisado
      if (chunk.trim() !== "") {
        let jsonChunk;
        try {
          jsonChunk = JSON.parse(chunk); // Tenta parsear o JSON
        } catch (e) {
          console.error("Erro ao tentar parsear o JSON:", e);
          continue; // Pula para o próximo chunk, se não for um JSON válido
        }

        if (jsonChunk.message.content) {
          text += jsonChunk.message.content;
          if (canWrite) {
            textFormatted += jsonChunk.message.content;
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = {
                role: "assistant",
                content: textFormatted,
              };
              return updatedMessages;
            });
          }

          if (
            text.includes("\u003c/think\u003e") ||
            text.includes("</think>")
          ) {
            canWrite = true;
          }
        }
      }
    }

    setLoading(false);
  }

  const cancelRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancela a requisição ativa
      setLoading(false);
    }
  };

  const runPrompt = () => {
    if (prompt.trim() === "") return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    setPrompt("");

    fetchOllamaDataWithStreaming(prompt);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="w-full h-full md:h-full flex flex-col items-center md:relative">
      {messages.length <=
        messages.filter((message) => message.role === "system").length && (
        <div className="mt-20 text-center flex flex-col gap-0.5 md:gap-2">
          <img
            src={Deepseek}
            className="aspect-square w-16 sm:w-20 mx-auto rounded-full border shadow mb-5"
            alt=""
          />
          <h2 className="text-md sm:text-2xl text-neutral-500">
            {t("introduction_title")}
          </h2>
          <h1 className="text-2xl sm:text-4xl font-semibold text-neutral-800">
            {t("introduction_description")}
          </h1>
        </div>
      )}

      <div
        className="w-full md:9/10 lg:w-4/5 xl:w-3/5 flex flex-col gap-8 max-h-17/20 overflow-y-auto px-2 md:px-20 xl:px-40"
        ref={chatRef}
      >
        {messages.map(
          (message, index) =>
            message.role !== "system" && (
              <Message key={index} message={message} index={index} />
            )
        )}
      </div>

      <div className="w-17/20 md:w-120 xl:w-200 absolute flex justify-between bottom-10 md:bottom-2 bg-[var(--background)] shadow-xl px-2 py-2 rounded-lg">
        <input
          type="text"
          className="w-full px-4 outline-transparent"
          value={prompt}
          onChange={(e) => !loading && setPrompt(e.target.value)}
          placeholder={t("prompt_placeholder")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runPrompt();
            }
          }}
        />
        <div className="flex gap-2">
          {loading && (
            <div>
              <button
                className="h-full flex items-center justify-center gap-2 transition hover:bg-[var(--muted)] text-[var(--destructive)] px-4 py-2 rounded-lg cursor-pointer"
                onClick={cancelRequest}
              >
                <CircleStop size={20} />
              </button>
            </div>
          )}
          <div className="hidden md:block">
            <button
              className={`flex items-center justify-center gap-2 transition bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-4 py-2 rounded-lg cursor-pointer ${
                loading && "opacity-50 !cursor-not-allowed"
              }`}
              onClick={runPrompt}
              disabled={loading}
            >
              <Send size={14} /> {t("prompt_send")}
            </button>
          </div>
          {!loading && (
            <div className="md:hidden">
              <button
                className={`flex items-center justify-center gap-2 transition bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-4 py-2 rounded-lg cursor-pointer ${
                  loading && "opacity-50 !cursor-not-allowed"
                }`}
                onClick={runPrompt}
                disabled={loading}
              >
                <Send size={14} /> {t("prompt_send")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
