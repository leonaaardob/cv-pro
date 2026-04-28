export const metadata = { title: "Paiement confirmé — CV Pro" };

export default function SuccesPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.35),transparent_45%)]" />
      <div className="relative mx-auto w-full max-w-xl">
        <div className="text-center">
          <div className="mb-6 text-6xl">🎉</div>
          <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
            Paiement confirmé !
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-zinc-400">
            Merci pour votre achat. Voici la dernière étape pour recevoir votre CV réécrit.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/80 p-8 text-left backdrop-blur-xl md:p-10">
          <h2 className="text-xl font-bold tracking-tight text-[#1A3CFF]">
            Envoyez votre CV maintenant
          </h2>
          <ol className="mt-6 space-y-5 text-zinc-300">
            <li className="flex gap-4">
              <span className="font-bold text-[#1A3CFF]">1.</span>
              <span>
                Envoyez un email à{" "}
                <a
                  href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
                  className="font-medium text-[#1A3CFF] underline transition-colors duration-200 hover:text-blue-400"
                >
                  cv@lbframe.com
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-[#1A3CFF]">2.</span>
              <span>
                Objet du mail :{" "}
                <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-sm text-white">
                  CV Pro — [Poste visé]
                </span>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-[#1A3CFF]">3.</span>
              <span>
                Joignez votre CV en pièce jointe (PDF, Word ou texte) et précisez le secteur visé.
              </span>
            </li>
          </ol>

          <a
            href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#1A3CFF] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#0D30CC] active:scale-[0.97]"
          >
            Ouvrir mon email maintenant →
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Votre CV réécrit vous sera envoyé dans les{" "}
          <strong className="text-zinc-300">30 minutes</strong> suivant la réception de votre email.
          En cas de question :{" "}
          <a
            href="mailto:cv@lbframe.com"
            className="text-zinc-300 underline transition-colors duration-200 hover:text-white"
          >
            cv@lbframe.com
          </a>
        </p>

        <p className="mt-6 text-center text-xs text-zinc-700">Un service LB FRAME</p>
      </div>
    </main>
  );
}
