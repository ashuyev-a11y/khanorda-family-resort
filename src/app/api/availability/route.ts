import { NextResponse } from "next/server";
import { getStore } from "@/booking/store";
import { BOOKABLE_UNITS } from "@config/pricing";
import { calcPrice } from "@/lib/pricing";
import { isValidDate, nightsBetween } from "@/booking/dates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/availability?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const checkin = searchParams.get("checkin") ?? "";
  const checkout = searchParams.get("checkout") ?? "";

  if (!isValidDate(checkin) || !isValidDate(checkout))
    return NextResponse.json({ error: "Укажите корректные даты" }, { status: 400 });
  if (nightsBetween(checkin, checkout) < 1)
    return NextResponse.json(
      { error: "Дата выезда должна быть позже даты заезда" },
      { status: 400 }
    );

  const store = await getStore();
  const freeIds = await store.availableHousesFor(checkin, checkout);
  const free = new Set(freeIds);

  const calc = calcPrice(BOOKABLE_UNITS[0].id, checkin, checkout, []);

  return NextResponse.json({
    checkin,
    checkout,
    nights: calc.nights,
    total: calc.total,
    prepay: calc.prepay,
    houses: BOOKABLE_UNITS.map((u) => ({
      id: u.id,
      name: u.name,
      available: free.has(u.id),
    })),
    anyAvailable: freeIds.length > 0,
  });
}
