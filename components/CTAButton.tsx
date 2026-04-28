"use client";
import { usePostHog } from "posthog-js/react";

type Props = {
  children?: React.ReactNode;
  dark?: boolean;
  location?: "hero" | "bottom" | "success";
  href?: string;
};

export function CTAButton({ children, dark, location = "hero", href }: Props) {
  const posthog = usePostHog();
  const link = href ?? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "#";

  function handleClick() {
    posthog?.capture("cta_clicked", { location });
  }

  return (
    <a
      href={link}
      onClick={handleClick}
      className={[
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]",
        dark
          ? "bg-[#0D0D0D] text-white hover:bg-zinc-800"
          : "bg-[#1A3CFF] text-white hover:bg-[#0D30CC]",
      ].join(" ")}
    >
      {children ?? "Refaire mon CV maintenant →"}
    </a>
  );
}
