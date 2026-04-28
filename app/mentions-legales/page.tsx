import Link from "next/link";

export const metadata = { title: "Mentions légales — CV Pro" };

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 font-[family-name:var(--font-geist)]">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 mb-8 inline-block">← Retour</Link>
        <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>
        <h2 className="text-xl font-semibold mt-8 mb-2">Éditeur du site</h2>
        <p className="text-zinc-600">Leonardo Balland — Auto-entrepreneur<br />SIRET : [À COMPLÉTER]<br />Email : cv@lbframe.com</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Hébergement</h2>
        <p className="text-zinc-600">Serveurs auto-hébergés via Coolify.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Propriété intellectuelle</h2>
        <p className="text-zinc-600">Les CV produits sont cédés intégralement au client dès paiement.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">Médiation</h2>
        <p className="text-zinc-600">Plateforme européenne : <a href="https://ec.europa.eu/consumers/odr" className="underline">ec.europa.eu/consumers/odr</a></p>
      </div>
    </main>
  );
}
