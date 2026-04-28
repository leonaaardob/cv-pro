import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist)]">
      {/* HERO */}
      <section className="bg-zinc-950 text-white px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-amber-400 text-zinc-900 text-sm font-semibold px-3 py-1 rounded-full mb-6">
            Livré en 30 min chrono · 12€
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
            Votre CV retravaillé,<br />
            décrochez enfin des entretiens.
          </h1>
          <p className="text-zinc-300 text-lg sm:text-xl mb-8 max-w-xl mx-auto">
            Un CV mal rédigé, c'est la corbeille assurée. En 30 minutes, le
            vôtre devient le CV qu'un recruteur veut lire jusqu'au bout — pour
            12€.
          </p>
          <CTAButton />
          <p className="text-zinc-500 text-sm mt-4">
            Paiement sécurisé · Résultat garanti ou retravaillé
          </p>
        </div>
      </section>

      {/* BÉNÉFICES */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Ce que ça change concrètement
          </h2>
          <ul className="space-y-5">
            {[
              {
                icon: "✅",
                text: "Les recruteurs lisent enfin votre CV jusqu'au bout — au lieu de l'ignorer après 6 secondes",
              },
              {
                icon: "✅",
                text: "Vous recevez enfin des réponses — fini le silence radio après vos candidatures",
              },
              {
                icon: "✅",
                text: "Votre CV vous est renvoyé en 30 minutes — prêt à envoyer, rien à faire de votre côté",
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-lg">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-zinc-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 px-6 bg-zinc-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">Comment ça marche</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Envoyez votre CV",
                desc: "Peu importe son état. Word, PDF ou texte brut — on gère.",
              },
              {
                step: "2",
                title: "Payez 12€",
                desc: "Paiement sécurisé par carte. Traitement immédiat.",
              },
              {
                step: "3",
                title: "Recevez le résultat",
                desc: "Votre CV réécrit dans votre boîte mail en 30 minutes.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 text-white font-bold text-lg flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Avant / Après — exemple réel
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-red-100 bg-red-50 rounded-xl p-6">
              <div className="text-red-500 font-semibold text-sm uppercase tracking-wide mb-3">
                Avant
              </div>
              <p className="text-zinc-600 text-sm italic">
                "Chargé de mission polyvalent avec de solides compétences en
                communication et en gestion de projets transverses."
              </p>
              <p className="text-red-400 text-xs mt-3">
                → Phrase copiée-collée par 40 000 candidats. Le recruteur zappe.
              </p>
            </div>
            <div className="border border-green-100 bg-green-50 rounded-xl p-6">
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-3">
                Après
              </div>
              <p className="text-zinc-700 text-sm italic">
                "Coordonné le lancement de 3 gammes produits en 18 mois, de la
                brief créa à la mise en rayon, avec un budget réduit de 20%."
              </p>
              <p className="text-green-600 text-xs mt-3">
                → Concret, chiffré, mémorable. Le recruteur lit la suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-16 px-6 bg-zinc-950 text-white text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl font-bold mb-2">12€</div>
          <p className="text-zinc-400 mb-2">Paiement unique · Aucun abonnement</p>
          <ul className="text-zinc-300 text-sm space-y-1 mb-8">
            <li>Votre CV entier réécrit, pas juste corrigé</li>
            <li>Les recruteurs voient vos vrais résultats, pas vos tâches</li>
            <li>Livraison par email en 30 min</li>
            <li>Pas satisfait ? On recommence, sans frais</li>
          </ul>
          <CTAButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Ce n'est pas moi qui l'ai écrit, ça sonne faux ?",
                a: "Le CV final utilise vos mots, vos expériences, vos chiffres. On restructure et on clarifie — on n'invente rien.",
              },
              {
                q: "12€ pour 30 minutes, c'est sérieux ?",
                a: "Oui. Le prix est bas parce que le processus est rodé. Ce n'est pas moins bien fait — c'est fait efficacement.",
              },
              {
                q: "Et si le résultat ne me convient pas ?",
                a: "On retravaille le CV jusqu'à ce que vous soyez satisfait. Pas de questions posées, pas de frais supplémentaires.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-zinc-100 pb-6">
                <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                <p className="text-zinc-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-6 bg-amber-400 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            Prêt à décrocher plus d'entretiens ?
          </h2>
          <p className="text-zinc-800 mb-8">
            Envoyez votre CV maintenant. Dans 30 minutes, il sera irrésistible.
          </p>
          <CTAButton dark />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 bg-zinc-950 text-zinc-500 text-sm text-center">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 CV Pro · Leonardo Balland</span>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/cgv" className="hover:text-white transition-colors">
              CGV
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
