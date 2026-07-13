// Очищает данные брони (таблицы остаются). Запуск: node scripts/reset-data.mjs
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
} catch {}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL не задан");
  process.exit(1);
}
const sql = neon(url);
const run = (q) => sql(Object.assign([q], { raw: [q] }));
await run("truncate table khanorda_bookings");
await run("truncate table khanorda_blocks");
console.log("Данные брони очищены.");
