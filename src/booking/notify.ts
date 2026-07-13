// Уведомления владельцу о новой броне. Путь B: гость создал бронь и должен
// оплатить — админ увидит уведомление и подтвердит после поступления Kaspi.
//
// Локально (без токена) просто пишем в консоль сервера. Реальная отправка
// включится, когда в env появятся TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.

import type { Booking } from "./types";
import { UNITS } from "@config/pricing";
import { fmt } from "@/lib/format";

function houseName(id: string): string {
  return UNITS.find((u) => u.id === id)?.name ?? id;
}

export function bookingMessage(b: Booking): string {
  return [
    "🏡 Новая бронь — ожидает оплату",
    `Дом: ${houseName(b.houseId)}`,
    `Даты: ${b.checkin} → ${b.checkout}`,
    `Гостей: ${b.guests}`,
    `Имя: ${b.name}`,
    `Телефон: ${b.phone}`,
    `К оплате (100%): ${fmt(b.prepay)} ₸`,
    `Оферта принята: да`,
    "",
    "Подтвердите бронь в админке после поступления оплаты в Kaspi.",
  ].join("\n");
}

export async function notifyOwner(b: Booking): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const text = bookingMessage(b);

  if (!token || !chatId) {
    // dev-режим: реального токена нет — пишем в консоль сервера
    console.log("[notify:telegram:mock]\n" + text);
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (e) {
    console.error("[notify:telegram] failed", e);
  }
}
