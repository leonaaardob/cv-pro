import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PlausibleScript } from "@/components/PlausibleScript";
import { GrowthbookWrapper } from "@/components/GrowthbookProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "CV Pro — Votre CV réécrit en 30 min pour 12€",
  description:
    "Ton CV réécrit par l'IA en 30 minutes. Passe devant 95% des candidats. 12€, ou remboursé.",
  metadataBase: new URL("https://cvpro.lbframe.com"),
  openGraph: {
    title: "CV Pro — Ton CV réécrit en 30 min pour 12€",
    description:
      "Même profil, 3x plus d'entretiens. L'IA réécrit ton CV en 30 minutes. 12€, ou remboursé.",
    type: "website",
    url: "https://cvpro.lbframe.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CV Pro — 12€ · 30 min · Ou remboursé" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Pro — Ton CV réécrit en 30 min pour 12€",
    description: "Même profil, 3x plus d'entretiens. 12€, ou remboursé.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://cvpro.lbframe.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="antialiased">
        <PlausibleScript />
        <GrowthbookWrapper>
          {children}
        </GrowthbookWrapper>
      </body>
    </html>
  );
}
