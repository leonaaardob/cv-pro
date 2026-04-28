import Link from "next/link";

export const metadata = { title: "Politique de confidentialité — CV Pro" };

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-20 font-[family-name:var(--font-geist)] text-[#0D0D0D]">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center text-sm font-medium text-[#1A3CFF] transition-colors duration-200 hover:text-[#0D30CC]"
        >
          ← Retour
        </Link>
        <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">
          Politique de confidentialité
        </h1>

        <p className="mt-8 leading-relaxed text-zinc-600">
          <strong className="text-zinc-900">Responsable du traitement :</strong> LB FRAME — SASU —{" "}
          <a
            href="mailto:legal@lbframe.com"
            className="underline transition-colors duration-200 hover:text-zinc-900"
          >
            legal@lbframe.com
          </a>
        </p>

        <div className="mt-12 space-y-10">
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Données collectées
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Email, CV (livraison uniquement), analytics anonymisés PostHog.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Conservation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Email/CV : 12 mois. Comptabilité : 10 ans. Analytics : 12 mois.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Hébergement
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Infrastructure VPS auto-hébergée via Coolify.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Sous-traitants
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Stripe (paiement), PostHog EU (analytics), Anthropic (IA, sans réentraînement).
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Vos droits
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Accès, suppression, portabilité :{" "}
              <a
                href="mailto:cv@lbframe.com"
                className="underline transition-colors duration-200 hover:text-zinc-900"
              >
                cv@lbframe.com
              </a>
              . Recours :{" "}
              <a
                href="https://www.cnil.fr"
                className="underline transition-colors duration-200 hover:text-zinc-900"
              >
                CNIL
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
              Cookies
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Analytics anonymisés uniquement (PostHog), dispensés de consentement (recommandations CNIL).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
