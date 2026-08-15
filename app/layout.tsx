import type { Metadata } from "next";
import { Rozha_One, Hind } from "next/font/google";
import "./globals.css";

const rozhaOne = Rozha_One({
  variable: "--font-rozha-one",
  weight: "400",
  subsets: ["latin", "devanagari"],
});

const hind = Hind({
  variable: "--font-hind",
  weight: ["400", "500", "600"],
  subsets: ["latin", "devanagari"],
});

export const metadata: Metadata = {
  title: "पहाड़ों वाले गाने | Pahado Wale Gaane",
  description: "gaane jo pahadiyon mein hi sahi lagte the. before Wi-Fi, before Google Maps ki 'no signal', bus ke radio pe yehi bajta tha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${rozhaOne.variable} ${hind.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#2F4538] text-[#F7EFE2] overflow-hidden">{children}</body>
    </html>
  );
}
