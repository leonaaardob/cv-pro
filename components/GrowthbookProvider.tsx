'use client'
import { GrowthBookProvider } from '@growthbook/growthbook-react'
import { useEffect, useState } from 'react'
import { getGrowthBook } from '@/lib/growthbook'
import type { AppFeatures } from '@/lib/growthbook'
import type { GrowthBook } from '@growthbook/growthbook-react'

export function GrowthbookWrapper({ children }: { children: React.ReactNode }) {
  const [gb, setGb] = useState<GrowthBook<AppFeatures> | null>(null)

  useEffect(() => {
    const instance = getGrowthBook()
    instance.loadFeatures({ autoRefresh: true }).then(() => setGb(instance))
  }, [])

  if (!gb) return <>{children}</>
  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}
