import Link from "next/link";

export const metadata = { title: "Mentions légales — CV Pro" };

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-20 font-[family-name:var(--font-geist)] text-[#0D0D0D]">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center text-sm font-medium text-[#1A3CFF] transition-colors duration-200 hover:text-[#0D30CC]"
        >
          ← Retour
        </Link>
        <h1 className="text-4xl font-black tracking-[-0.04em] md:text-5xl">Mentions légales</h1>

        <div className="mt-12 space-y-10">
          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">Éditeur du site</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              LB FRAME — SASU<br />
              SIREN : 103 671 350 R.C.S. Salon de Provence<br />
              Adresse : 765 Boulevard Des Ventadouiro, 13300 Salon-de-Provence, France<br />
              Email :{" "}
              <a
                href="mailto:legal@lbframe.com"
                className="underline transition-colors duration-200 hover:text-zinc-900"
              >
                legal@lbframe.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">Directeur de publication</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">Leonardo Balland</p>
          </div>

          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">Hébergement</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">VPS auto-hébergé via Coolify.</p>
          </div>

          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">Propriété intellectuelle</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              Les CV produits sont cédés intégralement au client dès paiement.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">Médiation</h2>
            <p className="mt-3 leading-relaxed text-zinc-600">
              Plateforme européenne :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                className="underline transition-colors duration-200 hover:text-zinc-900"
              >
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
