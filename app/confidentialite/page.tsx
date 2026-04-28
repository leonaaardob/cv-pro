import Link from "next/link";
export const metadata = { title: "Politique de confidentialité — CV Pro" };
export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 font-[family-name:var(--font-geist)]">
      <div className="max-w-2xl mx-auto space-y-8 text-zinc-600">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 inline-block">← Retour</Link>
        <h1 className="text-3xl font-bold text-zinc-900">Politique de confidentialité</h1>
        <p><strong className="text-zinc-900">Responsable :</strong> Leonardo Balland — cv@lbframe.com</p>
        <div><h2 className="text-lg font-semibold text-zinc-900 mb-1">Données collectées</h2><p>Email, CV (livraison uniquement), analytics anonymisés PostHog.</p></div>
        <div><h2 className="text-lg font-semibold text-zinc-900 mb-1">Conservation</h2><p>Email/CV : 12 mois. Comptabilité : 10 ans. Analytics : 12 mois.</p></div>
        <div><h2 className="text-lg font-semibold text-zinc-900 mb-1">Sous-traitants</h2><p>Stripe (paiement), PostHog EU (analytics), Anthropic (IA, sans réentraînement).</p></div>
        <div><h2 className="text-lg font-semibold text-zinc-900 mb-1">Vos droits</h2><p>Accès, suppression, portabilité : <a href="mailto:cv@lbframe.com" className="underline">cv@lbframe.com</a>. Recours : <a href="https://www.cnil.fr" className="underline">CNIL</a>.</p></div>
        <div><h2 className="text-lg font-semibold text-zinc-900 mb-1">Cookies</h2><p>Analytics anonymisés uniquement (PostHog), dispensés de consentement (recommandations CNIL).</p></div>
      </div>
    </main>
  );
}
