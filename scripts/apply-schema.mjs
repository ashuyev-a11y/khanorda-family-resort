// Применяет db/schema.sql к базе из DATABASE_URL.
// Запуск: node scripts/apply-schema.mjs   (DATABASE_URL берётся из .env.local)
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

// простой парсер .env.local
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
} catch {}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL не задан (добавьте в .env.local)");
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

// убираем строки-комментарии, затем разбиваем по ';' (neon http — по одному стейтменту)
const cleaned = schema
  .split("\n")
  .filter((l) => !l.trim().startsWith("--"))
  .join("\n");
const statements = cleaned
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

// neon() — только тег-шаблон; для сырого DDL передаём строку как TemplateStringsArray
const run = (q) => sql(Object.assign([q], { raw: [q] }));

for (const st of statements) {
  await run(st);
  console.log("ok:", st.split("\n")[0].slice(0, 60));
}
console.log("Схема применена.");
