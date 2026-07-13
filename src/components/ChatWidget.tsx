"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string; suggestions?: string[] };

// Топ-вопросы гостей — быстрые кнопки на старте.
const START_SUGGESTIONS = [
  "Сколько стоит?",
  "Что входит в стоимость?",
  "Свободно на выходных?",
  "Можно с детьми?",
  "Есть баня и джакузи?",
  "Как забронировать?",
];

const GREETING: Msg = {
  role: "assistant",
  text:
    "Здравствуйте! 🌿 Я помощник KHAN ORDA. Подскажу по отдыху и проверю свободные даты. Что вас интересует?",
  suggestions: START_SUGGESTIONS,
};

// Из ответа модели вытаскиваем строку «ВАРИАНТЫ: … | … | …» → пилюли.
function parseReply(raw: string): { text: string; suggestions: string[] } {
  const m = raw.match(/ВАРИАНТЫ:\s*(.+?)\s*$/im);
  if (!m || m.index === undefined) return { text: raw.trim(), suggestions: [] };
  const suggestions = m[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
  return { text: raw.slice(0, m.index).trim(), suggestions };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  async function sendText(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const { text: reply, suggestions } = parseReply(
        data.reply || "Извините, попробуйте ещё раз."
      );
      setMessages((m) => [
        ...m,
        { role: "assistant", text: reply, suggestions },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Ошибка связи. Напишите нам в WhatsApp — ответим быстро.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* плавающая кнопка */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Спросить помощника"
          className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-milk shadow-[0_10px_30px_rgba(30,30,28,.3)] transition hover:bg-pine max-[860px]:bottom-[84px]"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* панель чата */}
      {open && (
        <div className="fixed bottom-4 right-4 z-40 flex h-[560px] max-h-[calc(100vh-100px)] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-milk shadow-[0_20px_60px_rgba(30,30,28,.35)] max-[860px]:inset-x-3 max-[860px]:bottom-[84px] max-[860px]:w-auto">
          {/* header */}
          <div className="flex items-center justify-between bg-forest px-4 py-3.5 text-milk">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/90">
                <MessageCircle size={16} />
              </span>
              <div>
                <div className="text-[14px] font-semibold leading-tight">
                  Khan Orda · помощник
                </div>
                <div className="text-[11px] text-milk/60">Отвечает за секунды</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X size={16} />
            </button>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#f2ece1] px-3.5 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed " +
                    (m.role === "user"
                      ? "bg-forest text-milk"
                      : "bg-white text-[#2b2f28] shadow-sm")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {/* контекстные пилюли под последним ответом */}
            {!loading &&
              (() => {
                const last = messages[messages.length - 1];
                const sug =
                  last?.role === "assistant" ? last.suggestions : undefined;
                if (!sug?.length) return null;
                return (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sug.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendText(q)}
                        className="rounded-full border border-[#d8c3a5] bg-white px-3 py-1.5 text-[12.5px] text-forest transition hover:bg-[#eef3e8]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                );
              })()}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] text-[#8a8f84] shadow-sm">
                  <Loader2 size={14} className="animate-spin" /> печатает…
                </div>
              </div>
            )}
          </div>

          {/* input */}
          <div className="flex items-center gap-2 border-t border-[#e3d8c3] bg-milk p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText(input)}
              placeholder="Спросите о датах, ценах, бронировании…"
              className="flex-1 rounded-full bg-white px-4 py-2.5 text-[14px] text-forest outline-none"
              style={{ border: "1px solid #ddd1ba" }}
            />
            <button
              onClick={() => sendText(input)}
              disabled={loading || !input.trim()}
              aria-label="Отправить"
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-copper text-milk transition hover:bg-copper-dark disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
