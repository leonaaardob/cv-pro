import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "CV Pro — Votre CV réécrit en 30 min pour 12€",
  description:
    "Votre CV réécrit par des experts en 30 minutes chrono. Passez les filtres, décrochez des entretiens. Seulement 12€ — satisfait ou retravaillé.",
  openGraph: {
    title: "CV Pro — Votre CV réécrit en 30 min pour 12€",
    description:
      "Votre CV réécrit en 30 minutes. Passez les filtres automatiques, décrochez des entretiens. 12€.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen bg-[#F7F7F4] text-[#0D0D0D] antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
