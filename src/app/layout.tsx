import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const clashDisplay = localFont({
  src: "./fonts/clash/ClashGrotesk-Variable.ttf",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

const degularBody = localFont({
  src: [
    { path: "./fonts/degular/DegularDemo-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/degular/DegularDemo-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/degular/DegularDemo-Semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/degular/DegularDemo-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const aeonik = localFont({
  src: [
    { path: "./fonts/aeonik/fonnts.com-Aeonik_Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/aeonik/fonnts.com-Aeonik_Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/aeonik/fonnts.com-Aeonik_Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/aeonik/fonnts.com-Aeonik_Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarWayGo Logistics | Storage, Distribution & Transportation Solutions",
  description:
    "FarWayGo delivers reliable freight forwarding, transportation, customs clearance, and end-to-end logistics solutions across Saudi Arabia, the GCC, and international markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${degularBody.variable} ${aeonik.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[var(--color-mist)] overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
