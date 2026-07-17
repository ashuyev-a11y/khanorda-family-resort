"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { X, Check, Info, Loader2, ShieldCheck, MessageCircle } from "lucide-react";
import { UNITS } from "@config/pricing";
import { CONTACT } from "@/data/content";
import { useCalculator } from "@/context/CalculatorContext";
import { fmtCur, nightsWord } from "@/lib/format";

type AvailHouse = { id: string; name: string; available: boolean };
type Availability = { houses: AvailHouse[]; anyAvailable: boolean } | null;

interface CreatedBooking {
  id: string;
  houseId: string;
  checkin: string;
  checkout: string;
  prepay: number;
}
interface PaymentInfo {
  amount: number;
  kaspiPayUrl: string;
  holdUntil: string;
  holdMinutes: number;
}

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { unitId, checkin, checkout, guests, result, setUnit } =
    useCalculator();

  const [step, setStep] = useState<"form" | "payment">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [avail, setAvail] = useState<Availability>(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<CreatedBooking | null>(null);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef<number | null>(null);

  // reset when (re)opened
  useEffect(() => {
    if (open) {
      setStep("form");
      setError("");
      setBooking(null);
      setPayment(null);
      setDragY(0);
    }
  }, [open]);

  // check availability for the chosen dates
  useEffect(() => {
    if (!open || !result.valid) return;
    let active = true;
    setAvailLoading(true);
    setAvail(null);
    fetch(`/api/availability?checkin=${checkin}&checkout=${checkout}`)
      .then((r) => r.json())
      .then((d) => {
        if (active) setAvail(d);
      })
      .catch(() => {})
      .finally(() => active && setAvailLoading(false));
    return () => {
      active = false;
    };
  }, [open, checkin, checkout, result.valid]);

  if (!open) return null;

  const selectedFree = avail?.houses.find((h) => h.id === unitId)?.available;
  const freeHouses = avail?.houses.filter((h) => h.available) ?? [];
  // Блокируем отправку ТОЛЬКО если точно знаем, что занято. Если проверка
  // доступности ещё не загрузилась/сбойнула — не блокируем: сервер валидирует
  // занятость атомарно и вернёт ошибку, если что.
  const knownOccupied = avail != null && selectedFree === false;
  const canSubmit =
    result.valid &&
    !knownOccupied &&
    name.trim().length > 1 &&
    phone.trim().length > 4 &&
    consent &&
    !submitting;

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          houseId: unitId,
          checkin,
          checkout,
          guests,
          name,
          phone,
          consentOffer: consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Не удалось создать бронь");
      setBooking(data.booking);
      setPayment(data.payment);
      setStep("payment");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка");
    } finally {
      setSubmitting(false);
    }
  }

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartY.current = e.touches[0]?.clientY ?? null;
    setDragY(0);
  }

  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (touchStartY.current == null) return;
    if (e.currentTarget.scrollTop > 0) return;
    const next = Math.max(0, e.touches[0].clientY - touchStartY.current);
    setDragY(Math.min(next, 180));
  }

  function onTouchEnd() {
    if (dragY > 80) {
      onClose();
      return;
    }
    touchStartY.current = null;
    setDragY(0);
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 pb-[calc(72px+env(safe-area-inset-bottom))] sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[calc(100dvh-84px-env(safe-area-inset-bottom))] w-full max-w-[520px] overflow-y-auto rounded-t-3xl bg-milk p-6 shadow-2xl transition-transform duration-200 ease-out sm:max-h-[92vh] sm:rounded-3xl sm:p-7"
        style={{ transform: dragY ? `translateY(${dragY}px)` : undefined }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-forest/20 sm:hidden"
          aria-hidden="true"
        />
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="eyebrow text-[#8B6849]">
              {step === "form" ? "Бронирование" : "Оплата предоплаты"}
            </div>
            <h3 className="mt-1 font-display text-[24px] text-forest">
              {UNITS.find((u) => u.id === unitId)?.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-forest"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>

        {!result.valid ? (
          <div className="rounded-2xl bg-white p-5">
            <p className="text-[14px] leading-relaxed text-[#6b6f66]">
              Чтобы забронировать, сначала выберите даты заезда и выезда в
              калькуляторе.
            </p>
            <button
              onClick={() => {
                onClose();
                document
                  .getElementById("calc")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-4 w-full rounded-xl bg-forest py-3 text-[14px] font-semibold text-milk transition hover:bg-pine"
            >
              Выбрать даты
            </button>
          </div>
        ) : step === "form" ? (
          <>
            {/* сводка */}
            <div className="rounded-2xl bg-white p-4 text-[14px]">
              <div className="flex justify-between">
                <span className="text-[#6b6f66]">Даты</span>
                <span className="font-medium text-forest">
                  {checkin} → {checkout}
                </span>
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-[#6b6f66]">Ночей / гостей</span>
                <span className="font-medium text-forest">
                  {result.nights} {nightsWord(result.nights)} · {guests}
                </span>
              </div>
              <div className="mt-2.5 flex justify-between border-t border-[#ece3d2] pt-2.5">
                <span className="font-semibold text-forest">
                  К оплате (100%)
                </span>
                <span className="font-display text-[20px] text-copper">
                  {fmtCur(result.total)}
                </span>
              </div>
            </div>

            {/* доступность */}
            <div className="mt-4">
              {availLoading ? (
                <p className="flex items-center gap-2 text-[13px] text-[#6b6f66]">
                  <Loader2 size={14} className="animate-spin" /> Проверяем
                  свободные дома…
                </p>
              ) : selectedFree ? (
                <p className="flex items-center gap-2 text-[13px] text-pine">
                  <ShieldCheck size={15} /> Дом свободен на эти даты
                </p>
              ) : (
                <div className="rounded-2xl bg-[#faf1e9] p-3 text-[13px] text-[#8B6849]">
                  <div className="flex items-center gap-2 font-medium">
                    <Info size={15} /> Этот дом занят на выбранные даты.
                  </div>
                  {freeHouses.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      Свободны:
                      {freeHouses.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => setUnit(h.id as never)}
                          className="rounded-full bg-white px-3 py-1 font-medium text-forest"
                        >
                          {h.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-1">
                      На эти даты свободных домов нет — выберите другие.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* контакты */}
            <div className="mt-4 grid gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#8B6849]">Ваше имя</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl bg-white px-3.5 py-3 text-[15px] text-forest"
                  style={{ border: "1px solid #ddd1ba" }}
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[12px] text-[#8B6849]">Телефон</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  className="rounded-xl bg-white px-3.5 py-3 text-[15px] text-forest"
                  style={{ border: "1px solid #ddd1ba" }}
                  placeholder="+7 ___ ___ __ __"
                />
              </label>
            </div>

            {/* согласие с офертой */}
            <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[13px] text-[#3d413a]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-none accent-[#22352A]"
              />
              <span>
                Я принимаю условия{" "}
                <a
                  href="/oferta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest underline"
                >
                  договора-публичной оферты
                </a>{" "}
                и понимаю, что предоплата невозвратна.
              </span>
            </label>

            {error && (
              <p className="mt-3 text-[13px] text-red-600">{error}</p>
            )}

            <div className="sticky bottom-0 -mx-6 mt-5 bg-milk px-6 pb-1 pt-3 sm:static sm:mx-0 sm:bg-transparent sm:p-0">
              <button
                onClick={submit}
                disabled={!canSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-copper py-3.5 text-[15px] font-bold text-milk shadow-[0_-10px_24px_rgba(246,242,235,.94)] transition enabled:hover:bg-copper-dark disabled:cursor-not-allowed disabled:opacity-45 sm:shadow-none"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Перейти к оплате · {fmtCur(result.total)}
              </button>
            </div>
          </>
        ) : (
          /* ---------- шаг оплаты ---------- */
          booking &&
          payment && (
            <>
              <div className="rounded-2xl bg-white p-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6b6f66]">Бронь №</span>
                  <span className="font-mono text-forest">
                    {booking.id.slice(0, 8)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-[#ece3d2] pt-2 text-[14px]">
                  <span className="font-semibold text-forest">К оплате</span>
                  <span className="font-display text-[22px] text-copper">
                    {fmtCur(payment.amount)}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-[#eef3e8] p-4 text-[13.5px] text-[#2b3a2b]">
                <div className="flex items-center gap-2 font-semibold">
                  <Info size={15} /> Слот закреплён на {payment.holdMinutes} мин
                </div>
                <p className="mt-1.5">
                  Напишите нам в WhatsApp — пришлём реквизиты Kaspi для
                  предоплаты 100%. После оплаты администратор подтвердит бронь, и
                  даты закрепятся за вами.
                </p>
              </div>

              {payment.kaspiPayUrl && (
                <a
                  href={payment.kaspiPayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F14635] py-3.5 text-[15px] font-bold text-white transition hover:opacity-90"
                >
                  Оплатить в Kaspi · {fmtCur(payment.amount)}
                </a>
              )}

              {/* WhatsApp с данными брони — гость подтверждает/оплачивает */}
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(
                  `Здравствуйте! Бронь №${booking.id.slice(0, 8)}.\n` +
                    `Дом: ${UNITS.find((u) => u.id === booking.houseId)?.name}\n` +
                    `Даты: ${booking.checkin} → ${booking.checkout}\n` +
                    `Гостей: ${guests}\n` +
                    `К оплате (100%): ${fmtCur(payment.amount)}\n` +
                    `Имя: ${name}\nТелефон: ${phone}\n` +
                    `Хочу оплатить и подтвердить бронь.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-[15px] font-bold text-white transition hover:opacity-90"
              >
                <MessageCircle size={18} /> Написать в WhatsApp
              </a>

              <button
                onClick={onClose}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-forest/10 py-3 text-[14px] font-semibold text-forest"
              >
                <Check size={16} /> Готово
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
}
