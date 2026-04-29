"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "cv-pro-analytics-consent";

export type ConsentValue = "accepted" | "refused" | null;

export function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "refused" ? v : null;
}

export function CookieBanner({ onConsent }: { onConsent: (accepted: boolean) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const handle = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "refused");
    setVisible(false);
    onConsent(accepted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0D0D0D]/95 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-zinc-400">
          On utilise des analytics anonymisés (Plausible) pour améliorer le service.{" "}
          <Link href="/confidentialite" className="text-zinc-300 underline hover:text-white transition-colors">
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => handle(false)}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-white/40 hover:text-white"
          >
            Refuser
          </button>
          <button
            onClick={() => handle(true)}
            className="rounded-full bg-[#1A3CFF] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0D30CC]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
