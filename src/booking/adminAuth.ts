// Простейшая проверка доступа в админку по заголовку. Dev-заглушка —
// позже заменим на нормальную авторизацию (Supabase Auth / cookie-сессия).

import { BOOKING_CONFIG } from "@config/booking";

export function isAdmin(req: Request): boolean {
  const pass =
    req.headers.get("x-admin-password") ??
    new URL(req.url).searchParams.get("key") ??
    "";
  return pass !== "" && pass === BOOKING_CONFIG.adminPassword;
}
