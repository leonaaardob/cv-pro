export default function SuccesPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center px-6 py-20 font-[family-name:var(--font-geist)]">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Paiement confirmé !</h1>
        <p className="text-zinc-400 text-lg mb-10">
          Merci pour votre achat. Voici la dernière étape pour recevoir votre CV réécrit.
        </p>

        <div className="bg-zinc-900 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-semibold mb-4 text-[#1A3CFF]">
            Envoyez votre CV maintenant
          </h2>
          <ol className="space-y-4 text-zinc-300">
            <li className="flex gap-3">
              <span className="text-[#1A3CFF] font-bold">1.</span>
              <span>
                Envoyez un email à{" "}
                <a
                  href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
                  className="text-[#1A3CFF] underline font-medium hover:text-blue-400 transition-colors duration-200"
                >
                  cv@lbframe.com
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1A3CFF] font-bold">2.</span>
              <span>
                Objet du mail :{" "}
                <span className="text-white font-mono bg-zinc-800 px-2 py-0.5 rounded text-sm">
                  CV Pro — [Poste visé]
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#1A3CFF] font-bold">3.</span>
              <span>
                Joignez votre CV en pièce jointe (PDF, Word ou texte) et précisez le secteur visé.
              </span>
            </li>
          </ol>

          <a
            href="mailto:cv@lbframe.com?subject=CV Pro — Mon CV à réécrire"
            className="mt-8 inline-block w-full text-center bg-[#1A3CFF] text-white font-semibold text-lg px-6 py-4 rounded-full hover:bg-[#0D30CC] hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
          >
            Ouvrir mon email maintenant →
          </a>
        </div>

        <p className="text-zinc-600 text-sm mt-8">
          Votre CV réécrit vous sera envoyé dans les <strong className="text-zinc-400">30 minutes</strong> suivant la réception de votre email. En cas de question :{" "}
          <a href="mailto:cv@lbframe.com" className="text-zinc-400 underline hover:text-white transition-colors duration-200">
            cv@lbframe.com
          </a>
        </p>

        <p className="text-zinc-700 text-xs mt-6">Un service LB FRAME</p>
      </div>
    </main>
  );
}
