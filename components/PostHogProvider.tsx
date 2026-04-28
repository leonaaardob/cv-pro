"use client";
import { useEffect, useCallback } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { CookieBanner, getStoredConsent } from "./CookieBanner";

function initPostHog() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || posthog.__loaded) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    capture_pageview: true,
    capture_pageleave: true,
  });
  posthog.register({ app: "cv-pro" });
}

function PostHogInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (getStoredConsent() === "accepted") initPostHog();
  }, []);

  useEffect(() => {
    if (pathname === "/succes" && getStoredConsent() === "accepted") {
      posthog.capture("purchase_completed", { amount: 12, currency: "eur", service: "cv_rewrite" });
    }
  }, [pathname]);

  const handleConsent = useCallback((accepted: boolean) => {
    if (accepted) initPostHog();
  }, []);

  return <CookieBanner onConsent={handleConsent} />;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogInit />
      {children}
    </PHProvider>
  );
}
