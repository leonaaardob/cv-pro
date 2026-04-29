'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const raw = searchParams.get('redirect') ?? '/dashboard'
  const redirect = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/dashboard'

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await authClient.signIn.magicLink({ email, callbackURL: redirect })
    setLoading(false)
    if (error) {
      setError(error.message ?? 'Une erreur est survenue.')
    } else {
      setSent(true)
    }
  }

  async function handleGoogle() {
    setError('')
    const { error } = await authClient.signIn.social({ provider: 'google', callbackURL: redirect })
    if (error) setError(error.message ?? 'Une erreur est survenue.')
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Vérifie ta boîte mail</div>
          <p className="mt-4 text-zinc-500">
            Un lien de connexion a été envoyé à <strong>{email}</strong>. Valable 15 minutes.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
      <div className="w-full max-w-sm">
        <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Connexion</div>
        <p className="mt-2 text-zinc-500">Accède à ton espace CV Pro</p>

        <form onSubmit={handleMagicLink} className="mt-8 space-y-4">
          <label htmlFor="email" className="sr-only">Adresse email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[#0D0D0D] outline-none focus:border-[#1A3CFF] focus:ring-2 focus:ring-[#1A3CFF]/20"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0D0D0D] py-3 font-semibold text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
          >
            {loading ? 'Envoi...' : 'Recevoir un lien de connexion'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-sm text-zinc-400">ou</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white py-3 font-medium text-[#0D0D0D] hover:bg-zinc-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
          Continuer avec Google
        </button>

        <p className="mt-8 text-center text-xs text-zinc-400">
          En continuant, tu acceptes notre{' '}
          <a href="/confidentialite" className="underline">politique de confidentialité</a>.
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
