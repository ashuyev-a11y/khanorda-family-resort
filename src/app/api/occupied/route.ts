import { NextResponse } from "next/server";
import { getStore } from "@/booking/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/occupied → занятые интервалы по всем домам (для календаря)
export async function GET() {
  const store = await getStore();
  const ranges = await store.occupiedRanges();
  return NextResponse.json({ ranges });
}
