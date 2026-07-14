import { NextResponse } from "next/server";
import { getStore } from "@/booking/store";
import { notifyOwner } from "@/booking/notify";
import { BOOKING_CONFIG } from "@config/booking";
import type { CreateBookingInput } from "@/booking/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/bookings — создать бронь в статусе pending и вернуть данные оплаты
export async function POST(req: Request) {
  let body: Partial<CreateBookingInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const store = await getStore();

  try {
    const booking = await store.createPendingBooking({
      houseId: body.houseId!,
      checkin: body.checkin!,
      checkout: body.checkout!,
      guests: Number(body.guests) || 1,
      name: String(body.name ?? ""),
      phone: String(body.phone ?? ""),
      consentOffer: Boolean(body.consentOffer),
    });

    // Уведомление владельцу ждём до ответа: serverless может остановить
    // фоновые async-задачи сразу после return.
    try {
      await notifyOwner(booking);
    } catch (e) {
      console.error("[api/bookings] notify failed", e);
    }

    return NextResponse.json({
      booking,
      payment: {
        amount: booking.prepay,
        kaspiPayUrl: BOOKING_CONFIG.kaspiPayUrl, // пусто пока нет реального линка
        holdUntil: booking.holdUntil,
        holdMinutes: BOOKING_CONFIG.holdMinutes,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Не удалось создать бронь";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
