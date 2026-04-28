import Link from "next/link";
export const metadata = { title: "CGV — CV Pro" };
export default function CGV() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 font-[family-name:var(--font-geist)]">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-600 inline-block">← Retour</Link>
        <h1 className="text-3xl font-bold">Conditions Générales de Vente</h1>
        {[
          ["Art. 1 — Objet","Les présentes CGV régissent la vente du service de réécriture de CV par Leonardo Balland, auto-entrepreneur."],
          ["Art. 2 — Service","Réécriture d'un CV fourni par le client via outils IA et relecture humaine. Contenu numérique au sens de l'art. L.224-25-1 C. conso."],
          ["Art. 3 — Prix","12 € TTC par CV. Franchise TVA art. 293 B CGI. Paiement sécurisé Stripe, encaissé avant traitement."],
          ["Art. 4 — Livraison","CV réécrit envoyé par email en 30 min (plage 9h–22h heure de Paris). Remboursement intégral si dépassement."],
          ["Art. 5 — Rétractation","Conformément à l'art. L.221-28 13° C. conso, le droit de rétractation ne s'applique pas : le client consent à l'exécution immédiate et y renonce expressément lors du paiement."],
          ["Art. 6 — Responsabilité","Service de moyens, pas de résultat. Aucune garantie d'embauche. Responsabilité limitée à 12 €."],
          ["Art. 7 — Propriété intellectuelle","Droits cédés intégralement au client dès paiement et livraison."],
          ["Art. 8 — Litiges","Tribunaux français compétents. Médiation CECMC disponible."],
        ].map(([title, content]) => (
          <div key={title as string}>
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            <p className="text-zinc-600">{content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
