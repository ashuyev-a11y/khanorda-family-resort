"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Send, X } from "lucide-react";
import { formatLabel } from "@/data/personalization";
import { useCalculator } from "@/context/CalculatorContext";

type Msg = { role: "user" | "assistant"; text: string; suggestions?: string[] };

const START_SUGGESTIONS = [
  "Свободные даты",
  "Что входит в цену?",
  "Можно с детьми?",
];

const GREETING: Msg = {
  role: "assistant",
  text:
    "Здравствуйте! Я консьерж Khan Orda. Подскажу по датам, стоимости, правилам и помогу выбрать формат отдыха.",
  suggestions: START_SUGGESTIONS,
};

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
  const {
    checkin,
    checkout,
    guests,
    personalization,
    closeConcierge,
  } = useCalculator();
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (personalization.conciergeOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [personalization.conciergeOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, personalization.conciergeOpen]);

  async function sendText(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;
    const context = personalization.applied
      ? `Контекст подбора: формат — ${formatLabel(
          personalization.format
        )}, гостей — ${guests}, даты — ${checkin || "не выбрано"} → ${
          checkout || "не выбрано"
        }.`
      : "";
    const next = [
      ...messages,
      { role: "user" as const, text: context ? `${context}\n\n${text}` : text },
    ];
    setMessages([...messages, { role: "user", text }]);
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
        data.reply ||
          "Спасибо за сообщение. Если хотите, администратор подтвердит детали в WhatsApp."
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
          text: "Связь с помощником временно недоступна. Напишите нам в WhatsApp — подтвердим даты и стоимость.",
          suggestions: START_SUGGESTIONS,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!personalization.conciergeOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex bg-[#EFE7D7]">
      <div className="mx-auto flex h-full w-full max-w-[720px] flex-col bg-[#f2ece1] shadow-2xl">
        <header className="flex items-center justify-between bg-forest px-5 py-4 text-milk">
          <div>
            <div className="eyebrow text-[10px] tracking-[2px] text-sand">
              ✦ Консьерж
            </div>
            <div className="mt-1 font-display text-[23px]">Khan Orda</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([GREETING]);
                setInput("");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              aria-label="Сбросить чат"
            >
              <RotateCcw size={17} />
            </button>
            <button
              onClick={closeConcierge}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  "max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed " +
                  (m.role === "user"
                    ? "rounded-br-md bg-copper text-milk"
                    : "rounded-bl-md bg-white text-forest shadow-sm")
                }
              >
                {m.text}
              </div>
            </div>
          ))}

          {!loading &&
            (() => {
              const last = messages[messages.length - 1];
              if (last?.role !== "assistant" || !last.suggestions?.length) return null;
              return (
                <div className="flex flex-wrap gap-2 pt-1">
                  {last.suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendText(q)}
                      className="rounded-full border border-[#d8c3a5] bg-white px-3 py-1.5 text-[12.5px] font-medium text-forest"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              );
            })()}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[13px] text-[#8a8f84] shadow-sm">
                <Loader2 size={14} className="animate-spin" />
                печатает…
              </div>
            </div>
          )}
        </div>

        <footer className="border-t border-[#e3d8c3] bg-milk p-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText(input)}
              placeholder="Спросите про даты, цены или правила…"
              className="min-w-0 flex-1 rounded-full border border-[#ddd1ba] bg-white px-4 py-3 text-[14px] text-forest outline-none"
            />
            <button
              onClick={() => sendText(input)}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-copper text-milk disabled:opacity-40"
              aria-label="Отправить"
            >
              <Send size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
