import Link from "next/link";

export const metadata = { title: "CGV — CV Pro" };

export default function CGV() {
  const articles: [string, string][] = [
    ["Art. 1 — Objet", "Les présentes CGV régissent la vente du service de réécriture de CV par LB FRAME, SASU."],
    ["Art. 2 — Service", "Réécriture d'un CV fourni par le client via outils IA et relecture humaine. Contenu numérique au sens de l'art. L.224-25-1 C. conso."],
    ["Art. 3 — Prix", "12 € TTC par CV. Franchise TVA art. 293 B CGI. Paiement sécurisé Stripe, encaissé avant traitement."],
    ["Art. 4 — Livraison", "CV réécrit envoyé par email en 30 min (plage 9h–22h heure de Paris). Remboursement intégral si dépassement."],
    ["Art. 5 — Rétractation", "Conformément à l'art. L.221-28 13° C. conso, le droit de rétractation ne s'applique pas : le client consent à l'exécution immédiate et y renonce expressément lors du paiement."],
    ["Art. 6 — Responsabilité", "Service de moyens, pas de résultat. Aucune garantie d'embauche. Responsabilité limitée à 12 €."],
    ["Art. 7 — Propriété intellectuelle", "Droits cédés intégralement au client dès paiement et livraison."],
    ["Art. 8 — Contact", "Pour toute question relative au service : cv@lbframe.com. Pour toute question juridique : legal@lbframe.com."],
    ["Art. 9 — Litiges", "Tribunaux français compétents. Médiation CECMC disponible."],
  ];

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
          Conditions générales de vente
        </h1>

        <div className="mt-12 space-y-10">
          {articles.map(([title, content]) => (
            <div key={title}>
              <h2 className="text-base font-bold uppercase tracking-[0.18em] text-zinc-900">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
