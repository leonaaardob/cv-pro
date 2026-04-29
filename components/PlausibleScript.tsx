'use client'

import Script from 'next/script'

export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const host = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? 'https://plausible.io'
  if (!domain) return null

  return (
    <Script
      defer
      data-domain={domain}
      data-api={`${host}/api/event`}
      src={`${host}/js/script.tagged-events.js`}
    />
  )
}

export function trackEvent(name: string, props?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && 'plausible' in window) {
    ;(window as unknown as { plausible: (n: string, o?: { props: Record<string, string | number> }) => void }).plausible(name, props ? { props } : undefined)
  }
}
