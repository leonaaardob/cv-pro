'use client'

import { useRouter } from 'next/navigation'
import { trackEvent } from '@/components/PlausibleScript'

interface CTAButtonProps {
  dark?: boolean
  location: string
}

export function CTAButton({ dark = false, location }: CTAButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        trackEvent('CTA Clicked', { location })
        router.push('/order')
      }}
      className={
        dark
          ? 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors'
          : 'inline-flex items-center gap-2 rounded-full bg-[#1A3CFF] px-8 py-4 text-lg font-bold text-white hover:bg-blue-700 transition-colors'
      }
    >
      Commander — 12€
      <span aria-hidden>→</span>
    </button>
  )
}
