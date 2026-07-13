import { NextResponse } from "next/server";
import { getStore } from "@/booking/store";
import { isAdmin } from "@/booking/adminAuth";
import type { AddBlockInput } from "@/booking/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/blocks — список ручных блокировок
export async function GET(req: Request) {
  if (!isAdmin(req))
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  const store = await getStore();
  const blocks = await store.listBlocks();
  return NextResponse.json({ blocks });
}

// POST /api/admin/blocks — добавить блокировку (офлайн-бронь / обслуживание)
export async function POST(req: Request) {
  if (!isAdmin(req))
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });

  let body: Partial<AddBlockInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const store = await getStore();
  try {
    const block = await store.addBlock({
      houseId: body.houseId!,
      from: body.from!,
      to: body.to!,
      reason: body.reason,
    });
    return NextResponse.json({ block });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Ошибка";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// DELETE /api/admin/blocks?id=... — снять блокировку
export async function DELETE(req: Request) {
  if (!isAdmin(req))
    return NextResponse.json({ error: "Нет доступа" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Нет id" }, { status: 400 });
  const store = await getStore();
  await store.removeBlock(id);
  return NextResponse.json({ ok: true });
}
