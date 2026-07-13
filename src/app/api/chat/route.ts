import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/ai/knowledge";
import { runAgent, type Turn } from "@/ai/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// POST /api/chat — { messages: [{ role: "user"|"assistant", text }] } → { reply }
export async function POST(req: Request) {
  let body: { messages?: { role?: string; text?: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const history: Turn[] = raw
    .filter((m) => m && typeof m.text === "string" && m.text.trim())
    .slice(-16) // ограничиваем контекст
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      text: String(m.text),
    }));

  if (history.length === 0 || history[history.length - 1].role !== "user")
    return NextResponse.json({ error: "Пустое сообщение" }, { status: 400 });

  try {
    const reply = await runAgent(buildSystemPrompt(today), history);
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("[api/chat]", e);
    return NextResponse.json(
      {
        reply:
          "Извините, помощник временно недоступен. Напишите нам в WhatsApp — ответим быстро.",
      },
      { status: 200 }
    );
  }
}
