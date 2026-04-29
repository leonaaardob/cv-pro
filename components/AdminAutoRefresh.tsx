'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AdminAutoRefreshProps {
  intervalMs?: number
}

export function AdminAutoRefresh({ intervalMs = 30000 }: AdminAutoRefreshProps) {
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh()
    }, intervalMs)

    return () => clearInterval(id)
  }, [router, intervalMs])

  return null
}
