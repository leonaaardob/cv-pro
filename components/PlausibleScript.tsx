'use client'

import Script from 'next/script'

export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  if (!domain) return null

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.js"
    />
  )
}

export function trackEvent(name: string, props?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && 'plausible' in window) {
    ;(window as unknown as { plausible: (n: string, o?: { props: Record<string, string | number> }) => void }).plausible(name, props ? { props } : undefined)
  }
}
