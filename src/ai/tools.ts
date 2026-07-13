// Инструменты (function calling) для консьержа. Пока только проверка занятости
// (свободно/занято) — брони бот не создаёт, лишь консультирует и подводит к
// бронированию на сайте/в WhatsApp.

import { getStore } from "@/booking/store";
import { BOOKABLE_UNITS } from "@config/pricing";
import { calcPrice } from "@/lib/pricing";
import { nightsWord } from "@/lib/format";

// Объявления инструментов в формате Gemini functionDeclarations.
export const toolDeclarations = [
  {
    name: "check_availability",
    description:
      "Проверить, свободны ли дома на указанные даты, и узнать стоимость. Использовать всегда, когда гость спрашивает о датах/занятости/свободных местах.",
    parameters: {
      type: "object",
      properties: {
        checkin: { type: "string", description: "Дата заезда, формат YYYY-MM-DD" },
        checkout: { type: "string", description: "Дата выезда, формат YYYY-MM-DD" },
      },
      required: ["checkin", "checkout"],
    },
  },
];

const HOUSE_NAME = new Map(BOOKABLE_UNITS.map((u) => [u.id as string, u.name]));

type Args = Record<string, unknown>;

export async function executeTool(name: string, args: Args): Promise<unknown> {
  if (name === "check_availability") {
    const checkin = String(args.checkin ?? "");
    const checkout = String(args.checkout ?? "");
    const calc = calcPrice(BOOKABLE_UNITS[0].id, checkin, checkout, []);
    if (!calc.valid) return { error: calc.error ?? "Некорректные даты" };
    const store = await getStore();
    const freeIds = await store.availableHousesFor(checkin, checkout);
    return {
      checkin,
      checkout,
      nights: `${calc.nights} ${nightsWord(calc.nights)}`,
      priceForStay: calc.total,
      status: freeIds.length > 0 ? "свободно" : "занято",
      freeHousesCount: freeIds.length,
      freeHouses: freeIds.map((id) => ({ id, name: HOUSE_NAME.get(id) })),
      totalHouses: BOOKABLE_UNITS.length,
    };
  }

  return { error: `Неизвестный инструмент: ${name}` };
}
