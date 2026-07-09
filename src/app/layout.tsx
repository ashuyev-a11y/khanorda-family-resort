import type { Metadata, Viewport } from "next";
import { Prata, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const prata = Prata({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-prata",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khan Orda Family Resort — приватный курорт на берегу Чагана",
  description:
    "Семейный Halal Friendly курорт в 20 минутах от Уральска. Домики, сауна, джакузи, пляж на берегу реки Чаган. Рассчитайте стоимость онлайн.",
  metadataBase: new URL("https://khanorda-family-resort.vercel.app"),
  openGraph: {
    title: "Khan Orda Family Resort",
    description:
      "Приватный семейный курорт на берегу Чагана. Halal Friendly, 20 минут от Уральска.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#22352A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${prata.variable} ${manrope.variable} ${plexMono.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
