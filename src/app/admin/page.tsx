"use client";

import { useCallback, useEffect, useState } from "react";
import { UNITS, BOOKABLE_UNITS } from "@config/pricing";
import { fmtCur } from "@/lib/format";
import type { Booking, BlockedRange } from "@/booking/types";

const STATUS_LABEL: Record<string, string> = {
  pending: "Ожидает оплату",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  expired: "Истёк холд",
};
const STATUS_COLOR: Record<string, string> = {
  pending: "#8B6849",
  confirmed: "#2f6b3a",
  cancelled: "#9a3b3b",
  expired: "#7a7f74",
};

function houseName(id: string) {
  return UNITS.find((u) => u.id === id)?.name ?? id;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocks, setBlocks] = useState<BlockedRange[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // форма блокировки
  const [blkHouse, setBlkHouse] = useState(BOOKABLE_UNITS[0].id);
  const [blkFrom, setBlkFrom] = useState("");
  const [blkTo, setBlkTo] = useState("");
  const [blkReason, setBlkReason] = useState("");

  const headers = useCallback(
    () => ({ "Content-Type": "application/json", "x-admin-password": pass }),
    [pass]
  );

  const refresh = useCallback(async () => {
    const [b, bl] = await Promise.all([
      fetch("/api/admin/bookings", { headers: headers() }).then((r) => r.json()),
      fetch("/api/admin/blocks", { headers: headers() }).then((r) => r.json()),
    ]);
    setBookings(b.bookings ?? []);
    setBlocks(bl.blocks ?? []);
  }, [headers]);

  async function login() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/bookings", { headers: headers() });
      if (res.status === 401) throw new Error("Неверный пароль");
      const data = await res.json();
      setBookings(data.bookings ?? []);
      setAuthed(true);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (authed) refresh();
  }, [authed, refresh]);

  async function act(id: string, action: "confirm" | "cancel") {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  async function addBlock() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/blocks", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          houseId: blkHouse,
          from: blkFrom,
          to: blkTo,
          reason: blkReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка");
      setBlkFrom("");
      setBlkTo("");
      setBlkReason("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  async function removeBlock(id: string) {
    setBusy(true);
    try {
      await fetch(`/api/admin/blocks?id=${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-milk p-6">
        <div className="w-full max-w-[360px] rounded-3xl bg-white p-7 shadow-xl">
          <h1 className="font-display text-[24px] text-forest">
            Khan Orda · Админ
          </h1>
          <p className="mt-1 text-[13px] text-[#6b6f66]">
            Введите пароль для входа.
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="mt-4 w-full rounded-xl bg-[#faf7f0] px-3.5 py-3 text-[15px]"
            style={{ border: "1px solid #ddd1ba" }}
            placeholder="Пароль"
          />
          {error && <p className="mt-2 text-[13px] text-red-600">{error}</p>}
          <button
            onClick={login}
            disabled={busy || !pass}
            className="mt-4 w-full rounded-xl bg-forest py-3 font-semibold text-milk disabled:opacity-50"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-milk px-5 py-8 text-forest">
      <div className="mx-auto max-w-[960px]">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-[28px]">Khan Orda · Брони</h1>
          <button
            onClick={refresh}
            disabled={busy}
            className="rounded-lg bg-white px-4 py-2 text-[13px] font-medium shadow-sm disabled:opacity-50"
          >
            Обновить
          </button>
        </div>
        {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}

        {/* Брони */}
        <section className="mt-6">
          {bookings.length === 0 ? (
            <p className="rounded-2xl bg-white p-5 text-[14px] text-[#6b6f66]">
              Пока нет броней.
            </p>
          ) : (
            <div className="grid gap-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{houseName(b.houseId)}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
                        style={{ background: STATUS_COLOR[b.status] }}
                      >
                        {STATUS_LABEL[b.status]}
                      </span>
                    </div>
                    <div className="mt-1 text-[13.5px] text-[#4a4f45]">
                      {b.checkin} → {b.checkout} · {b.guests} гостей ·{" "}
                      <b>{fmtCur(b.prepay)}</b>
                    </div>
                    <div className="mt-0.5 text-[13px] text-[#6b6f66]">
                      {b.name} · {b.phone}
                    </div>
                  </div>
                  {b.status === "pending" && (
                    <div className="mt-3 flex gap-2 sm:mt-0">
                      <button
                        onClick={() => act(b.id, "confirm")}
                        disabled={busy}
                        className="rounded-lg bg-[#2f6b3a] px-4 py-2 text-[13px] font-semibold text-white disabled:opacity-50"
                      >
                        Подтвердить оплату
                      </button>
                      <button
                        onClick={() => act(b.id, "cancel")}
                        disabled={busy}
                        className="rounded-lg bg-[#f0e6e6] px-4 py-2 text-[13px] font-semibold text-[#9a3b3b] disabled:opacity-50"
                      >
                        Отклонить
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Блокировки */}
        <section className="mt-10">
          <h2 className="font-display text-[22px]">Блокировка дат</h2>
          <p className="text-[13px] text-[#6b6f66]">
            Офлайн-брони и обслуживание — закрывают даты у выбранного дома.
          </p>
          <div className="mt-3 grid gap-2.5 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto_auto_auto]">
            <select
              value={blkHouse}
              onChange={(e) => setBlkHouse(e.target.value as typeof blkHouse)}
              className="rounded-lg bg-[#faf7f0] px-3 py-2.5 text-[14px]"
              style={{ border: "1px solid #ddd1ba" }}
            >
              {BOOKABLE_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={blkFrom}
              onChange={(e) => setBlkFrom(e.target.value)}
              className="rounded-lg bg-[#faf7f0] px-3 py-2.5 text-[14px]"
              style={{ border: "1px solid #ddd1ba" }}
            />
            <input
              type="date"
              value={blkTo}
              onChange={(e) => setBlkTo(e.target.value)}
              className="rounded-lg bg-[#faf7f0] px-3 py-2.5 text-[14px]"
              style={{ border: "1px solid #ddd1ba" }}
            />
            <button
              onClick={addBlock}
              disabled={busy || !blkFrom || !blkTo}
              className="rounded-lg bg-forest px-4 py-2.5 text-[13px] font-semibold text-milk disabled:opacity-50"
            >
              Заблокировать
            </button>
            <input
              value={blkReason}
              onChange={(e) => setBlkReason(e.target.value)}
              placeholder="Причина (необязательно)"
              className="rounded-lg bg-[#faf7f0] px-3 py-2.5 text-[14px] sm:col-span-4"
              style={{ border: "1px solid #ddd1ba" }}
            />
          </div>

          {blocks.length > 0 && (
            <div className="mt-3 grid gap-2">
              {blocks.map((bl) => (
                <div
                  key={bl.id}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-[13.5px] shadow-sm"
                >
                  <span>
                    <b>{houseName(bl.houseId)}</b> · {bl.from} → {bl.to}
                    {bl.reason ? ` · ${bl.reason}` : ""}
                  </span>
                  <button
                    onClick={() => removeBlock(bl.id)}
                    disabled={busy}
                    className="text-[13px] font-medium text-[#9a3b3b] disabled:opacity-50"
                  >
                    Снять
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
