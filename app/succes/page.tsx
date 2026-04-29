export const metadata = {
  title: "Paiement confirmé — CV Pro",
  robots: { index: false, follow: false },
};

export default function SuccesPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.2),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-lg">
        {/* Check */}
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

        {/* Headline */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
            Ton CV est entre
            <br />
            nos mains.
          </h1>
          <p className="mt-4 text-lg text-zinc-400">On s'occupe du reste.</p>
        </div>

        {/* Email card */}
        <div className="rounded-3xl border border-white/[0.08] bg-zinc-900/60 p-8 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1A3CFF]/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A3CFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white">Vérifie ta boîte mail</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                Un email de confirmation t'a été envoyé avec un lien pour
                accéder à ton espace et récupérer ton CV réécrit.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Délai de livraison</span>
              <span className="font-medium text-white">~30 minutes</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-4 space-y-2">
          {[
            { when: "Maintenant", what: "Ton CV est en cours de réécriture par IA" },
            { when: "~30 min", what: "Ton CV réécrit est prêt dans ton espace" },
            { when: "Dans l'email", what: "Clique sur le lien pour accéder à ton espace" },
          ].map(({ when, what }) => (
            <div
              key={when}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-zinc-900/40 px-5 py-3.5"
            >
              <span className="w-24 shrink-0 text-xs font-medium text-[#1A3CFF]">
                {when}
              </span>
              <span className="text-sm text-zinc-400">{what}</span>
            </div>
          ))}
        </div>

        {/* Satisfaction guarantee */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-zinc-900/40 px-5 py-4">
          <svg
            className="mt-0.5 shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#71717a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-sm leading-relaxed text-zinc-500">
            Pas satisfait ?{" "}
            <span className="text-zinc-300">Tu pourras demander une révision depuis ton espace une fois le CV livré.</span>{" "}
            Zéro justification, zéro euro de plus.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Un service <span className="text-zinc-500">LB FRAME</span>
          {" — "}
          <a
            href="mailto:noreply@cvpro.lbframe.com"
            className="text-zinc-500 transition-colors hover:text-zinc-300"
          >
            noreply@cvpro.lbframe.com
          </a>
        </p>
      </div>
    </main>
  );
}
