'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function AgentIaEmploiInner() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const cancelled = searchParams.get('cancelled') === '1'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout/ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Erreur lors de la création du paiement.')
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.25),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-lg">
        {cancelled && (
          <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-4 text-center text-sm text-yellow-400">
            Paiement annulé. Tu peux réessayer quand tu veux.
          </div>
        )}

        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-[#1A3CFF]/30 bg-[#1A3CFF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B8AFF]">
            50 prompts copier-coller
          </span>
        </div>

        <h1 className="mb-4 text-center text-4xl font-black tracking-[-0.04em] md:text-5xl">
          L&apos;Agent IA Emploi
        </h1>
        <p className="mb-10 text-center text-lg text-zinc-400">
          CV, lettre de motivation, préparation entretien, suivi candidatures —
          tout ce qu&apos;il te faut pour trouver un job avec l&apos;IA.
        </p>

        <div className="mb-8 space-y-2.5">
          {[
            "50 prompts prêts à l'emploi — zéro effort de rédaction",
            "Couvre tout le parcours : du CV à l'offre signée",
            'Compatible ChatGPT, Claude, Gemini et Grok',
            'PDF livré instantanément par email, à garder',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-zinc-400">
              <svg
                className="mt-0.5 shrink-0 text-[#1A3CFF]"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-600 focus:border-[#1A3CFF]/50 focus:outline-none focus:ring-2 focus:ring-[#1A3CFF]/20"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full rounded-xl bg-[#1A3CFF] py-4 text-base font-bold text-white transition-colors hover:bg-blue-600 disabled:opacity-40"
          >
            {loading ? 'Redirection...' : 'Obtenir le guide pour 9€ →'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Paiement sécurisé Stripe · PDF envoyé instantanément · Aucun abonnement
        </p>
      </div>
    </main>
  )
}

export default function AgentIaEmploiPage() {
  return (
    <Suspense>
      <AgentIaEmploiInner />
    </Suspense>
  )
}
