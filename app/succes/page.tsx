export default function SuccesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-20 font-[family-name:var(--font-geist)]">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Paiement confirmé !</h1>
        <p className="text-zinc-300 text-lg mb-10">
          Merci pour votre achat. Voici la dernière étape pour recevoir votre CV réécrit.
        </p>

        <div className="bg-zinc-900 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-semibold mb-4 text-amber-400">
            Envoyez votre CV maintenant
          </h2>
          <ol className="space-y-4 text-zinc-300">
            <li className="flex gap-3">
              <span className="text-amber-400 font-bold">1.</span>
              <span>
                Envoyez un email à{" "}
                <a
                  href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
                  className="text-amber-400 underline font-medium"
                >
                  cv@lbframe.com
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-400 font-bold">2.</span>
              <span>
                Objet du mail :{" "}
                <span className="text-white font-mono bg-zinc-800 px-2 py-0.5 rounded text-sm">
                  CV Pro — [Poste visé]
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-400 font-bold">3.</span>
              <span>
                Joignez votre CV en pièce jointe (PDF, Word ou texte) et précisez le secteur visé.
              </span>
            </li>
          </ol>

          <a
            href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
            className="mt-8 inline-block w-full text-center bg-amber-400 text-zinc-900 font-semibold text-lg px-6 py-4 rounded-full hover:bg-amber-300 transition-colors"
          >
            Ouvrir mon email maintenant →
          </a>
        </div>

        <p className="text-zinc-500 text-sm mt-8">
          Votre CV réécrit vous sera envoyé dans les <strong className="text-zinc-300">30 minutes</strong> suivant la réception de votre email. En cas de question :{" "}
          <a href="mailto:cv@lbframe.com" className="text-zinc-400 underline">
            cv@lbframe.com
          </a>
        </p>
      </div>
    </main>
  );
}
