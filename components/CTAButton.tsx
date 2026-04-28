"use client";

import { usePostHog } from "posthog-js/react";

export function CTAButton({ dark }: { dark?: boolean }) {
  const posthog = usePostHog();
  const link = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#";

  function handleClick() {
    posthog?.capture("cta_clicked", { location: dark ? "bottom" : "hero" });
  }

  return (
    <a
      href={link}
      onClick={handleClick}
      className={
        dark
          ? "inline-block bg-zinc-900 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-zinc-800 transition-colors"
          : "inline-block bg-amber-400 text-zinc-900 font-semibold text-lg px-8 py-4 rounded-full hover:bg-amber-300 transition-colors"
      }
    >
      Refaire mon CV maintenant →
    </a>
  );
}
