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
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const limitReached = revisionLimit !== -1 && count >= revisionLimit

  async function handleRevision() {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}/revision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() || undefined }),
      })
      if (res.ok) {
        const data = await res.json()
        setCount(data.revisionCount)
        setJustRequested(true)
        setShowForm(false)
        setMessage('')
        setTimeout(() => setJustRequested(false), 4000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (limitReached) return null

  return (
    <div className="mt-4 space-y-3">
      {justRequested && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Révision demandée — on s&apos;en occupe.
        </div>
      )}

      {!showForm && !justRequested && (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-[#0D0D0D] hover:bg-zinc-50 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {count > 0 ? 'Nouvelle révision' : 'Demander une révision'}
        </button>
      )}

      {showForm && (
        <>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décris les modifications souhaitées (optionnel)"
            maxLength={500}
            rows={3}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-[#0D0D0D] placeholder-zinc-400 focus:border-[#1A3CFF] focus:outline-none focus:ring-2 focus:ring-[#1A3CFF]/20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleRevision}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1A3CFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Envoi...' : 'Confirmer →'}
            </button>
            <button
              onClick={() => { setShowForm(false); setMessage('') }}
              className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm text-zinc-500 hover:bg-zinc-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </>
      )}

      <p className="text-xs text-zinc-400">Zéro justification, zéro euro de plus.</p>
    </div>
  )
}
