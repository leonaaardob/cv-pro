import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist)]">
      {/* HERO */}
      <section className="bg-[#0D0D0D] text-white px-6 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#1A3CFF] text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded mb-8">
            Livré en 30 min chrono · 12€
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
            Votre CV retravaillé.<br />
            Décrochez enfin des entretiens.
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl mb-10 max-w-xl">
            Un CV mal rédigé, c'est la corbeille assurée. En 30 minutes, le
            vôtre devient le CV qu'un recruteur veut lire jusqu'au bout — pour
            12€.
          </p>
          <CTAButton />
          <p className="text-zinc-600 text-sm mt-5">
            Paiement sécurisé · Résultat garanti ou retravaillé
          </p>
        </div>
      </section>

      {/* BÉNÉFICES */}
      <section className="py-20 px-6 bg-[#F7F7F4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Ce que ça change concrètement
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
            {[
              {
                text: "Les recruteurs lisent enfin votre CV jusqu'au bout — au lieu de l'ignorer après 6 secondes",
              },
              {
                text: "Vous recevez enfin des réponses — fini le silence radio après vos candidatures",
              },
              {
                text: "Votre CV vous est renvoyé en 30 minutes — prêt à envoyer, rien à faire de votre côté",
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
          <h2 className="text-3xl font-bold mb-12">Comment ça marche</h2>
          <div className="flex flex-col sm:flex-row gap-0">
            {[
              {
                step: "01",
                title: "Envoyez votre CV",
                desc: "Peu importe son état. Word, PDF ou texte brut — on gère.",
              },
              {
                step: "02",
                title: "Payez 12€",
                desc: "Paiement sécurisé par carte. Traitement immédiat.",
              },
              {
                step: "03",
                title: "Recevez le résultat",
                desc: "Votre CV réécrit dans votre boîte mail en 30 minutes.",
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
            Avant / après — exemple réel
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
                → Phrase copiée-collée par 40 000 candidats. Le recruteur zappe.
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
                → Concret, chiffré, mémorable. Le recruteur lit la suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl font-bold mb-2">12€</div>
          <p className="text-zinc-500 mb-6 text-sm">Paiement unique · Aucun abonnement</p>
          <ul className="text-zinc-400 text-base space-y-2 mb-10">
            <li>— Votre CV entier réécrit, pas juste corrigé</li>
            <li>— Les recruteurs voient vos vrais résultats, pas vos tâches</li>
            <li>— Livraison par email en 30 min</li>
            <li>— Pas satisfait ? On recommence, sans frais</li>
          </ul>
          <CTAButton />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#F7F7F4]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-0">
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
            Prêt à décrocher plus d'entretiens ?
          </h2>
          <p className="text-blue-200 mb-10 text-lg">
            Envoyez votre CV maintenant. Dans 30 minutes, il sera irrésistible.
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
