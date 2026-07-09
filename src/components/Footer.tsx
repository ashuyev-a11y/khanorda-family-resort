"use client";

import { CONTACT } from "@/data/content";
import { useI18n } from "@/i18n/LanguageProvider";
import LanguageToggle from "./LanguageToggle";

export default function Footer() {
  const { t } = useI18n();
  const nav = [
    { href: "#units", label: t.nav.units },
    { href: "#calc", label: t.nav.calc },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];
  return (
    <footer className="bg-graphite px-5 pb-10 pt-14 text-[#9aa094]">
      <div className="container-ko">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-[380px]">
            <div className="font-display text-[24px] text-milk">Khan Orda</div>
            <p className="mt-3 text-[14px] leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-4">
              <LanguageToggle dark />
            </div>
          </div>

          <div className="flex gap-14">
            <div>
              <div className="eyebrow mb-3 text-[11px] text-[#6b7062]">
                {t.footer.nav}
              </div>
              <ul className="flex flex-col gap-2 text-[14px]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-milk">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3 text-[11px] text-[#6b7062]">
                {t.footer.contacts}
              </div>
              <ul className="flex flex-col gap-2 text-[14px]">
                <li>
                  <a href={CONTACT.phoneHref} className="hover:text-milk">
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-milk"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>{CONTACT.city}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-[12.5px] text-[#6b7062]">
          {t.footer.rights} · {t.footer.tagline}
        </div>
      </div>
    </footer>
  );
}
