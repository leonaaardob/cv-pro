'use client'

import { useState, useRef } from 'react'

const DEFAULT_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? ''

export default function OrderPage() {
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'upload' | 'email'>('upload')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null
    if (selected) {
      setFile(selected)
      setStep('email')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !email) return

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) {
        const { error } = await uploadRes.json()
        throw new Error(error ?? "Erreur lors de l'upload.")
      }
      const { key: cvOriginalKey, uploadUuid } = await uploadRes.json()

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, priceId: DEFAULT_PRICE_ID, cvOriginalKey, uploadUuid }),
      })
      if (!checkoutRes.ok) throw new Error('Erreur lors de la création du paiement.')
      const { url } = await checkoutRes.json()

      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">
          {step === 'upload' ? 'Envoie ton CV' : 'Presque prêt'}
        </div>
        <p className="mt-2 text-zinc-500">
          {step === 'upload'
            ? 'PDF ou Word · Réécrit en 30 min · Livré dans ta boîte mail'
            : 'Où livrer ton CV réécrit ?'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Step 1: File */}
          <div
            onClick={() => inputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-10 text-center hover:border-[#1A3CFF] hover:bg-blue-50/30 transition-colors"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div>
                <p className="font-semibold text-[#0D0D0D]">{file.name}</p>
                <p className="mt-1 text-sm text-zinc-400">Clique pour changer</p>
              </div>
            ) : (
              <>
                <p className="font-semibold text-zinc-700">Clique pour sélectionner ton CV</p>
                <p className="mt-1 text-sm text-zinc-400">PDF, DOC, DOCX · Max 10 Mo</p>
              </>
            )}
          </div>

          {/* Step 2: Email (appears after file selection) */}
          {step === 'email' && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                autoFocus
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[#0D0D0D] placeholder-zinc-400 focus:border-[#1A3CFF] focus:outline-none focus:ring-2 focus:ring-[#1A3CFF]/20"
              />
              <p className="mt-1.5 text-xs text-zinc-400">
                Utilisé uniquement pour livrer ton CV réécrit.
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {step === 'email' && (
            <button
              type="submit"
              disabled={!file || !email || loading}
              className="w-full rounded-xl bg-[#1A3CFF] py-4 font-bold text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Chargement...' : 'Payer 12€ et commander →'}
            </button>
          )}
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Paiement sécurisé Stripe · Sans abonnement
        </p>
      </div>
    </main>
  )
}
