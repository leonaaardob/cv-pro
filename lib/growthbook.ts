import { GrowthBook } from '@growthbook/growthbook-react'

export type AppFeatures = {
  'landing-cta-variant': 'default' | 'urgency' | 'social-proof'
  'ebook-price-display': boolean
}

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void
  }
}

let _gb: GrowthBook<AppFeatures> | null = null

export function getGrowthBook(): GrowthBook<AppFeatures> {
  if (_gb) return _gb
  _gb = new GrowthBook<AppFeatures>({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_HOST ?? 'https://cdn.growthbook.io',
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY ?? '',
    enableDevMode: process.env.NODE_ENV !== 'production',
    trackingCallback: (experiment, result) => {
      // hook pour Plausible
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('Experiment Viewed', {
          props: { experiment: experiment.key, variant: String(result.variationId) },
        })
      }
    },
  })
  return _gb
}
