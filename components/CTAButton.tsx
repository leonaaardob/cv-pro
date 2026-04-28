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
          ? "inline-block bg-[#0D0D0D] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
          : "inline-block bg-[#1A3CFF] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#0D30CC] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
      }
    >
      Refaire mon CV maintenant →
    </a>
  );
}
