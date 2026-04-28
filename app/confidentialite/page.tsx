import Link from "next/link";
export const metadata = { title: "Politique de confidentialité — CV Pro" };
export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16 font-[family-name:var(--font-geist)]">
      <div className="max-w-2xl mx-auto space-y-8 text-zinc-600">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors duration-200 inline-block">← Retour</Link>
        <h1 className="text-3xl font-bold text-zinc-900">Politique de confidentialité</h1>
        <p><strong className="text-zinc-900">Responsable du traitement :</strong> LB FRAME — SASU — <a href="mailto:legal@lbframe.com" className="underline hover:text-zinc-900 transition-colors duration-200">legal@lbframe.com</a></p>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Données collectées</h2>
          <p className="text-sm leading-relaxed">Email, CV (livraison uniquement), analytics anonymisés PostHog.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Conservation</h2>
          <p className="text-sm leading-relaxed">Email/CV : 12 mois. Comptabilité : 10 ans. Analytics : 12 mois.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Hébergement</h2>
          <p className="text-sm leading-relaxed">Infrastructure VPS auto-hébergée via Coolify.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Sous-traitants</h2>
          <p className="text-sm leading-relaxed">Stripe (paiement), PostHog EU (analytics), Anthropic (IA, sans réentraînement).</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Vos droits</h2>
          <p className="text-sm leading-relaxed">Accès, suppression, portabilité : <a href="mailto:cv@lbframe.com" className="underline hover:text-zinc-900 transition-colors duration-200">cv@lbframe.com</a>. Recours : <a href="https://www.cnil.fr" className="underline hover:text-zinc-900 transition-colors duration-200">CNIL</a>.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-900 mb-2">Cookies</h2>
          <p className="text-sm leading-relaxed">Analytics anonymisés uniquement (PostHog), dispensés de consentement (recommandations CNIL).</p>
        </div>
      </div>
    </main>
  );
}
