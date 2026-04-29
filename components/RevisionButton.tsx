'use client'

import { useState } from 'react'

export function RevisionButton({
  orderId,
  initialCount,
  revisionLimit,
}: {
  orderId: string
  initialCount: number
  revisionLimit: number
}) {
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)
  const [justRequested, setJustRequested] = useState(false)

  const limitReached = revisionLimit !== -1 && count >= revisionLimit

  async function handleRevision() {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}/revision`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setCount(data.revisionCount)
        setJustRequested(true)
        setTimeout(() => setJustRequested(false), 4000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (limitReached) return null

  return (
    <div className="mt-4">
      {justRequested && (
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Révision demandée — on s'en occupe.
        </div>
      )}
      <button
        onClick={handleRevision}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-[#0D0D0D] hover:bg-zinc-50 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        )}
        {count > 0 ? 'Nouvelle révision' : 'Demander une révision'}
      </button>
      <p className="mt-2 text-xs text-zinc-400">Zéro justification, zéro euro de plus.</p>
    </div>
  )
}
