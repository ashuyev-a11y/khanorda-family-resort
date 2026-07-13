import { NextResponse } from "next/server";
import { getStore } from "@/booking/store";
import { isAdmin } from "@/booking/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/bookings — список всех броней
export async function GET(req: Request) {
  if (!isAdmin(req))
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  const store = await getStore();
  const bookings = await store.listBookings();
  return NextResponse.json({ bookings });
}

// PATCH /api/admin/bookings — { id, action: "confirm" | "cancel", note? }
export async function PATCH(req: Request) {
  if (!isAdmin(req))
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });

  let body: { id?: string; action?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { id, action, note } = body;
  if (!id || (action !== "confirm" && action !== "cancel"))
    return NextResponse.json({ error: "Неверное действие" }, { status: 400 });

  const store = await getStore();
  try {
    const booking =
      action === "confirm"
        ? await store.confirmBooking(id, note)
        : await store.cancelBooking(id, note);
    return NextResponse.json({ booking });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Ошибка";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
