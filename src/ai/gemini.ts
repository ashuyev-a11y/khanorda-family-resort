// Gemini-провайдер + цикл агента с function calling.
// Формат контента Gemini: contents[] с role "user" | "model".
// Ответ инструмента отправляется как content role "user" с functionResponse.

import { AI } from "@config/ai";
import { toolDeclarations, executeTool } from "./tools";

export type Turn = { role: "user" | "model"; text: string };

interface Part {
  text?: string;
  functionCall?: { name: string; args: Record<string, unknown> };
  functionResponse?: { name: string; response: Record<string, unknown> };
}
interface Content {
  role: "user" | "model";
  parts: Part[];
}

const ENDPOINT = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

async function callGemini(
  system: string,
  contents: Content[]
): Promise<Content> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY не задан");

  const res = await fetch(`${ENDPOINT(AI.model)}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents,
      tools: [{ functionDeclarations: toolDeclarations }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data?.candidates?.[0]?.content;
  if (!content) throw new Error("Пустой ответ модели");
  return content as Content;
}

/**
 * Прогоняет диалог через модель с инструментами. Возвращает финальный текст.
 * history — реплики пользователя и бота (без системного промпта).
 */
export async function runAgent(
  system: string,
  history: Turn[]
): Promise<string> {
  const contents: Content[] = history.map((t) => ({
    role: t.role,
    parts: [{ text: t.text }],
  }));

  for (let i = 0; i < AI.maxToolIterations; i++) {
    const modelContent = await callGemini(system, contents);
    contents.push(modelContent);

    const calls = (modelContent.parts ?? []).filter((p) => p.functionCall);
    if (calls.length === 0) {
      const text = (modelContent.parts ?? [])
        .map((p) => p.text ?? "")
        .join("")
        .trim();
      return text || "Извините, не удалось сформулировать ответ. Напишите нам в WhatsApp.";
    }

    // Выполняем инструменты и возвращаем результаты модели.
    const responseParts: Part[] = [];
    for (const c of calls) {
      const fc = c.functionCall!;
      const result = await executeTool(fc.name, fc.args ?? {});
      responseParts.push({
        functionResponse: {
          name: fc.name,
          response: result as Record<string, unknown>,
        },
      });
    }
    contents.push({ role: "user", parts: responseParts });
  }

  return "Извините, запрос оказался слишком сложным. Напишите нам в WhatsApp — поможем.";
}
