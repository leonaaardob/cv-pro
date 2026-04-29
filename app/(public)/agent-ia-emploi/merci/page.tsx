export const metadata = { title: "Guide commandé — L'Agent IA Emploi" }

export default function EbookMerciPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.2),transparent_50%)]" />
      <div className="relative mx-auto w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A3CFF]/10 ring-1 ring-[#1A3CFF]/25">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A3CFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-[-0.04em]">
          Guide en route&nbsp;!
        </h1>
        <p className="text-lg text-zinc-400">
          Vérifie ta boîte mail — le lien de téléchargement arrive dans quelques secondes.
        </p>
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-zinc-900/40 px-6 py-5 text-sm text-zinc-500">
          Ce lien est valable <span className="text-zinc-300">7 jours</span>. Pense à sauvegarder le PDF.
        </div>
        <p className="mt-6 text-sm text-zinc-600">
          Un service <span className="text-zinc-500">LB FRAME</span>
          {' — '}
          <a
            href="mailto:commande@lbframe.com"
            className="text-zinc-500 transition-colors hover:text-zinc-300"
          >
            commande@lbframe.com
          </a>
        </p>
      </div>
    </main>
  )
}
