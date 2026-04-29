'use client'

import { Suspense, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const DEFAULT_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? ''

function OrderForm() {
  const searchParams = useSearchParams()
  const priceId = searchParams.get('priceId') ?? DEFAULT_PRICE_ID

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError('')

    try {
      // 1. Upload CV to R2
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) {
        const { error } = await uploadRes.json()
        throw new Error(error ?? "Erreur lors de l'upload.")
      }
      const { key: cvOriginalKey, uploadUuid } = await uploadRes.json()

      // 2. Create Stripe Checkout session
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, cvOriginalKey, uploadUuid }),
      })
      if (!checkoutRes.ok) throw new Error('Erreur lors de la création du paiement.')
      const { url } = await checkoutRes.json()

      // 3. Redirect to Stripe Checkout
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Envoie ton CV</div>
        <p className="mt-2 text-zinc-500">
          PDF ou Word · Réécrit en 30 min · Livré dans ta boîte mail
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div
            onClick={() => inputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-10 text-center hover:border-[#1A3CFF] hover:bg-blue-50/30 transition-colors"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            {file ? (
              <p className="font-semibold text-[#0D0D0D]">{file.name}</p>
            ) : (
              <>
                <p className="font-semibold text-zinc-700">Clique pour sélectionner ton CV</p>
                <p className="mt-1 text-sm text-zinc-400">PDF, DOC, DOCX · Max 10 Mo</p>
              </>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full rounded-xl bg-[#1A3CFF] py-4 font-bold text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Chargement...' : 'Payer 12€ et commander →'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Paiement sécurisé Stripe · Sans abonnement
        </p>
      </div>
    </main>
  )
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderForm />
    </Suspense>
  )
}
