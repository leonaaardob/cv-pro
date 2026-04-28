import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist)]">
      {/* HERO */}
      <section className="bg-[#0D0D0D] text-white px-6 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#1A3CFF] text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded mb-8">
            12€ · 30 min · Ou remboursé
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            Pendant que tu envoies ton CV,<br />
            un autre candidate mieux que toi.
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl mb-10 max-w-xl">
            Même profil. Même expérience. Lui décroche l'entretien, toi tu
            attends un mail qui n'arrive pas. La seule différence : son CV a
            été réécrit par l'IA. Le tien, non.
          </p>
          <CTAButton />
          <p className="text-zinc-600 text-sm mt-5">
            Paiement sécurisé · Sans abonnement · Retravaillé si besoin
          </p>
        </div>
      </section>

      {/* BÉNÉFICES */}
      <section className="py-20 px-6 bg-[#F7F7F4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            3 vérités que personne ne te dit sur ton CV
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
            {[
              {
                text: "Un recruteur passe 6 secondes sur ton CV. Si rien ne l'accroche dans ces 6 secondes, tu n'existes pas — peu importe ton parcours.",
              },
              {
                text: "95% des candidats envoient encore leur CV écrit à la main. Ceux qui utilisent l'IA passent devant eux — systématiquement. Tu peux en faire partie dès aujourd'hui.",
              },
              {
                text: "Dans 18 mois, tout le monde utilisera ça. Aujourd'hui, tu as encore 12 mois d'avance sur la concurrence. Cette fenêtre se ferme.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#1A3CFF] shrink-0" />
                <span className="text-zinc-700 text-base leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">3 étapes. 30 minutes. C'est tout.</h2>
          <div className="flex flex-col sm:flex-row gap-0">
            {[
              {
                step: "01",
                title: "Envoie ton CV",
                desc: "Word, PDF ou copié-collé — n'importe quel état. On s'occupe du reste.",
              },
              {
                step: "02",
                title: "Règle 12€",
                desc: "Paiement sécurisé par carte. Traitement en moins d'une minute.",
              },
              {
                step: "03",
                title: "Reçois ton CV réécrit",
                desc: "Dans ta boîte mail en 30 minutes. Prêt à envoyer. Rien d'autre à faire.",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex-1 flex gap-5 sm:flex-col sm:gap-4 py-6 sm:py-0 sm:px-6 border-b sm:border-b-0 sm:border-l border-zinc-200 first:border-l-0 first:pl-0">
                <div className="text-4xl font-bold text-zinc-200 shrink-0 sm:text-5xl">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-base text-zinc-900 mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="py-20 px-6 bg-[#F7F7F4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Voilà ce que le recruteur voit. À toi de choisir.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-red-100 bg-red-50 rounded-2xl p-6">
              <div className="text-red-500 font-semibold text-xs uppercase tracking-widest mb-4">
                Avant
              </div>
              <p className="text-zinc-600 text-sm italic leading-relaxed">
                "Chargé de mission polyvalent avec de solides compétences en
                communication et en gestion de projets transverses."
              </p>
              <p className="text-red-400 text-xs mt-4 leading-relaxed">
                → Copié-collé par 40 000 autres candidats. Le recruteur ferme l'onglet.
              </p>
            </div>
            <div className="border border-green-100 bg-green-50 rounded-2xl p-6">
              <div className="text-green-600 font-semibold text-xs uppercase tracking-widest mb-4">
                Après
              </div>
              <p className="text-zinc-700 text-sm italic leading-relaxed">
                "Coordonné le lancement de 3 gammes produits en 18 mois, de la
                brief créa à la mise en rayon, avec un budget réduit de 20%."
              </p>
              <p className="text-green-600 text-xs mt-4 leading-relaxed">
                → Concret, chiffré, impossible à ignorer. Le recruteur lit la suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl font-bold mb-2">12€</div>
          <p className="text-zinc-500 mb-6 text-sm">Une fois. Pas d'abonnement. Pas de surprise.</p>
          <ul className="text-zinc-400 text-base space-y-2 mb-10">
            <li>— Ton CV entier réécrit — pas juste orthographié</li>
            <li>— Tes résultats mis en avant, pas tes intitulés de poste</li>
            <li>— Dans ta boîte mail en 30 minutes chrono</li>
            <li>— Pas convaincu ? On retravaille, sans frais supplémentaires</li>
          </ul>
          <CTAButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#F7F7F4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Les vraies questions que tu te poses
          </h2>
          <div className="space-y-0">
            {[
              {
                q: "Ça va sonner faux, comme si ce n'est pas moi qui l'ai écrit ?",
                a: "On réécrit avec tes mots, tes expériences, tes chiffres. On ne fabrique rien. On restructure ce que tu as déjà — pour que ce soit toi, en mieux.",
              },
              {
                q: "12€ pour 30 minutes de travail, c'est vraiment sérieux ?",
                a: "Oui. Le tarif est bas parce que le process est précis et rodé. Ce n'est pas expédié — c'est efficace. Et franchement : un entretien de plus, c'est combien pour toi ?",
              },
              {
                q: "Et si le résultat ne me plaît pas ?",
                a: "On retravaille jusqu'à ce que tu sois satisfait. Zéro justification à donner, zéro euro de plus à payer. C'est dans les règles du jeu.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-zinc-200 py-7 first:pt-0">
                <h3 className="font-semibold text-base text-zinc-900 mb-2">{item.q}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-[#1A3CFF] text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tu peux continuer à envoyer le même CV. Ou pas.
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            Envoie ton CV maintenant. Dans 30 minutes, tu passes devant 95% des candidats.
          </p>
          <CTAButton dark />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-[#0D0D0D] text-zinc-500 text-sm">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-zinc-300 font-semibold">CV Pro</span>
            <span className="block text-xs text-zinc-600 mt-1">Un service LB FRAME</span>
            <span className="block text-xs text-zinc-700 mt-1">© 2026 CV Pro · LB FRAME</span>
          </div>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors duration-200">
              Mentions légales
            </Link>
            <Link href="/cgv" className="hover:text-white transition-colors duration-200">
              CGV
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors duration-200">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
