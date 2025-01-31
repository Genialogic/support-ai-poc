import { BrainCircuit, CircleStop, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ from: string; content: string }[]>(
    []
  );
  const controllerRef = useRef<AbortController | null>(null);

  async function fetchOllamaDataWithStreaming(message: string) {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancela qualquer requisição anterior antes de iniciar uma nova
    }

    controllerRef.current = new AbortController(); // Cria um novo AbortController
    const { signal } = controllerRef.current;

    setLoading(true);
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-r1:8b",
        prompt: message,
        stream: true, // Habilita o streaming
      }),
      signal: signal, // Passa o signal para a requisição
    });

    if (!response.body) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let text = "";
    let textFormatted = "";
    let canWrite = false;

    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "bot", content: "" },
    ]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

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

        if (jsonChunk.response) {
          text += jsonChunk.response;

          if (canWrite) {
            textFormatted += jsonChunk.response;
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = {
                from: "bot",
                content: textFormatted,
              };
              return updatedMessages;
            });
          }

          if (text.includes("\u003c/think\u003e")) {
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

    setMessages((prev) => [...prev, { from: "user", content: prompt }]);

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
    <div className="w-full h-full flex flex-col items-center relative">
      {messages.length === 0 && (
        <div className="mt-20 text-center flex flex-col gap-2">
          <h2 className="text-2xl text-neutral-500">
            Olá, eu sou o DeepSeek 👋
          </h2>
          <h1 className="text-4xl font-semibold text-neutral-800">
            Como posso te ajudar?
          </h1>
        </div>
      )}

      <div
        className="w-3/4 flex flex-col gap-8 h-6/7 overflow-y-auto px-10"
        ref={chatRef}
      >
        {messages.map((message, index) => (
          <div
            className={`p-8 max-w-3/5 rounded-xl shadow-3xl ${
              message.from === "user"
                ? "ml-auto bg-[var(--background)]"
                : " bg-purple-100"
            }`}
            key={index}
          >
            {!message.content && (
              <span className="text-purple-500 flex gap-1 items-center">
                <BrainCircuit size={16} /> Gerando...
              </span>
            )}
            {message.content}
          </div>
        ))}
      </div>

      <div className="w-200 absolute flex justify-between bottom-2 bg-[var(--background)] shadow-xl px-2 py-2 rounded-lg">
        <input
          type="text"
          className="w-full px-4 outline-transparent"
          value={prompt}
          onChange={(e) => !loading && setPrompt(e.target.value)}
          placeholder="Digite o que está pensando..."
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
          <div>
            <button
              className={`flex items-center justify-center gap-2 transition bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] px-4 py-2 rounded-lg cursor-pointer ${
                loading && "opacity-50 !cursor-not-allowed"
              }`}
              onClick={runPrompt}
              disabled={loading}
            >
              <Send size={14} /> Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
