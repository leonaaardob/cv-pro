import Link from "next/link";

export const metadata = { title: "Mentions légales — CV Pro" };

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16 font-[family-name:var(--font-geist)]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors duration-200 mb-8 inline-block">← Retour</Link>
        <h1 className="text-3xl font-bold mb-10">Mentions légales</h1>

        <h2 className="text-base font-semibold mt-8 mb-2 text-zinc-900">Éditeur du site</h2>
        <p className="text-zinc-600 leading-relaxed">
          LB FRAME — SASU<br />
          SIREN : 103 671 350 R.C.S. Salon de Provence<br />
          Adresse : 765 Boulevard Des Ventadouiro, 13300 Salon-de-Provence, France<br />
          Email : <a href="mailto:legal@lbframe.com" className="underline hover:text-zinc-900 transition-colors duration-200">legal@lbframe.com</a>
        </p>

        <h2 className="text-base font-semibold mt-8 mb-2 text-zinc-900">Directeur de publication</h2>
        <p className="text-zinc-600">Leonardo Balland</p>

        <h2 className="text-base font-semibold mt-8 mb-2 text-zinc-900">Hébergement</h2>
        <p className="text-zinc-600">VPS auto-hébergé via Coolify.</p>

        <h2 className="text-base font-semibold mt-8 mb-2 text-zinc-900">Propriété intellectuelle</h2>
        <p className="text-zinc-600">Les CV produits sont cédés intégralement au client dès paiement.</p>

        <h2 className="text-base font-semibold mt-8 mb-2 text-zinc-900">Médiation</h2>
        <p className="text-zinc-600">Plateforme européenne : <a href="https://ec.europa.eu/consumers/odr" className="underline hover:text-zinc-900 transition-colors duration-200">ec.europa.eu/consumers/odr</a></p>
      </div>
    </main>
  );
}
