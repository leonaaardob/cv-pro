"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

gsap.registerPlugin(ScrollTrigger);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "CV Pro — Réécriture de CV par IA",
  description: "Réécriture de CV par intelligence artificielle. Livré en 30 minutes pour 12€.",
  provider: { "@type": "Organization", name: "LB FRAME", url: "https://lbframe.com" },
  offers: { "@type": "Offer", price: "12.00", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
  url: "https://cvpro.lbframe.com",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ça va sonner faux, comme si ce n'est pas moi qui l'ai écrit ?",
      acceptedAnswer: { "@type": "Answer", text: "On réécrit avec tes mots, tes expériences, tes chiffres. On ne fabrique rien. On restructure ce que tu as déjà — pour que ce soit toi, en mieux." },
    },
    {
      "@type": "Question",
      name: "12€ pour 30 minutes de travail, c'est vraiment sérieux ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui. Le tarif est bas parce que le process est précis et rodé. Ce n'est pas expédié — c'est efficace. Et franchement : un entretien de plus, c'est combien pour toi ?" },
    },
    {
      "@type": "Question",
      name: "Et si le résultat ne me plaît pas ?",
      acceptedAnswer: { "@type": "Answer", text: "On retravaille jusqu'à ce que tu sois satisfait. Zéro justification à donner, zéro euro de plus à payer. C'est dans les règles du jeu." },
    },
  ],
};

const heroTitleLine1 = ["Pendant", "que", "tu", "envoies", "ton", "CV,"];
const heroTitleLine2 = ["un", "autre", "candidate", "mieux", "que", "toi."];

const benefits = [
  {
    text: "Un recruteur passe 6 secondes sur ton CV. Si rien ne l'accroche dans ces 6 secondes, tu n'existes pas — peu importe ton parcours.",
  },
  {
    text: "95% des candidats envoient encore leur CV écrit à la main. Ceux qui utilisent l'IA passent devant eux — systématiquement. Tu peux en faire partie dès aujourd'hui.",
  },
  {
    text: "Dans 18 mois, tout le monde utilisera ça. Aujourd'hui, tu as encore 12 mois d'avance sur la concurrence. Cette fenêtre se ferme.",
  },
];

const steps = [
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
];

const faq = [
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
];

export default function Home() {
  useGSAP(() => {
    gsap.from(".hero-word", {
      y: 80,
      opacity: 0,
      stagger: 0.045,
      duration: 1,
      ease: "power4.out",
    });
    gsap.utils.toArray<HTMLElement>(".scroll-card").forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.88, opacity: 0.35 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: { trigger: card, start: "top 82%", end: "bottom 45%", scrub: true },
        }
      );
    });
    gsap.fromTo(
      ".final-line",
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: ".final-copy", start: "top 75%", end: "bottom 45%", scrub: true },
      }
    );
  });

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#F7F7F4] font-[family-name:var(--font-geist)] text-[#0D0D0D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* FLOATING NAV */}
      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#0D0D0D]/70 px-5 py-3 text-white backdrop-blur-xl">
        <span className="font-semibold tracking-tight">CV Pro</span>
        <span className="hidden text-sm text-zinc-400 md:block">Un service LB FRAME</span>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Mon espace
          </Link>
          <a
            href="#prix"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0D0D0D] hover:bg-zinc-100 transition-colors"
          >
            Commander
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center bg-[#0D0D0D] px-6 py-32 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(26,60,255,.35),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mb-8 inline-flex rounded-full bg-[#1A3CFF] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white">
            12€ · 30 min · Ou remboursé
          </div>
          <h1 className="max-w-6xl text-[clamp(3.4rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.07em]">
            <span className="block">
              {heroTitleLine1.map((word, i) => (
                <span key={`l1-${i}`} className="hero-word mr-[0.25em] inline-block">
                  {word}
                </span>
              ))}
            </span>
            <span className="block">
              {heroTitleLine2.map((word, i) => (
                <span key={`l2-${i}`} className="hero-word mr-[0.25em] inline-block">
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-zinc-400">
            Même profil. Même expérience. Lui décroche l&apos;entretien, toi tu attends un mail qui n&apos;arrive pas. La seule différence : son CV a été réécrit par l&apos;IA. Le tien, non.
          </p>
          <div className="mt-10">
            <CTAButton location="hero" />
          </div>
          <p className="mt-5 text-sm text-zinc-600">
            Paiement sécurisé · Sans abonnement · Retravaillé si besoin
          </p>
        </div>
      </section>

      {/* BÉNÉFICES - BENTO GRID */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-5xl font-black tracking-[-0.05em] md:text-7xl">
            3 vérités que personne ne te dit sur ton CV
          </h2>
          <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-12">
            <div className="scroll-card flex min-h-[420px] flex-col justify-between rounded-3xl bg-[#0D0D0D] p-8 text-white md:col-span-7 md:row-span-2 md:p-12">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1A3CFF]">01</div>
              <p className="mt-8 text-2xl leading-snug md:text-4xl md:leading-tight">
                {benefits[0].text}
              </p>
            </div>
            <div className="scroll-card flex flex-col justify-between rounded-3xl bg-white p-8 md:col-span-5 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1A3CFF]">02</div>
              <p className="mt-6 text-lg leading-snug text-zinc-700 md:text-xl">
                {benefits[1].text}
              </p>
            </div>
            <div className="scroll-card flex flex-col justify-between rounded-3xl bg-[#1A3CFF] p-8 text-white md:col-span-5 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">03</div>
              <p className="mt-6 text-lg leading-snug md:text-xl">{benefits[2].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-5xl font-black tracking-[-0.05em] md:text-7xl">
            3 étapes. 30 minutes. C&apos;est tout.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="scroll-card flex flex-col rounded-3xl border border-zinc-200 bg-[#F7F7F4] p-8 md:p-10"
              >
                <div className="text-6xl font-black text-zinc-200 md:text-7xl">{item.step}</div>
                <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Voilà ce que le recruteur voit. À toi de choisir.
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="scroll-card rounded-3xl border border-red-100 bg-red-50 p-8 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-red-500">Avant</div>
              <p className="mt-6 text-lg italic leading-relaxed text-zinc-600 md:text-xl">
                &quot;Chargé de mission polyvalent avec de solides compétences en communication et en gestion de projets transverses.&quot;
              </p>
              <p className="mt-6 text-sm leading-relaxed text-red-400">
                → Copié-collé par 40 000 autres candidats. Le recruteur ferme l&apos;onglet.
              </p>
            </div>
            <div className="scroll-card rounded-3xl border border-green-100 bg-green-50 p-8 md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-green-600">Après</div>
              <p className="mt-6 text-lg italic leading-relaxed text-zinc-700 md:text-xl">
                &quot;Coordonné le lancement de 3 gammes produits en 18 mois, de la brief créa à la mise en rayon, avec un budget réduit de 20%.&quot;
              </p>
              <p className="mt-6 text-sm leading-relaxed text-green-600">
                → Concret, chiffré, impossible à ignorer. Le recruteur lit la suite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section id="prix" className="bg-[#0D0D0D] px-6 py-32 text-white md:py-48">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <div className="text-7xl font-black leading-none tracking-[-0.05em] md:text-9xl">12€</div>
              <p className="mt-4 text-base text-zinc-500">
                Une fois. Pas d&apos;abonnement. Pas de surprise.
              </p>
              <div className="mt-10">
                <CTAButton location="bottom" />
              </div>
            </div>
            <ul className="space-y-4 text-lg text-zinc-300 md:col-span-6">
              <li className="flex gap-4">
                <span className="text-[#1A3CFF]">—</span>
                <span>Ton CV entier réécrit — pas juste orthographié</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#1A3CFF]">—</span>
                <span>Tes résultats mis en avant, pas tes intitulés de poste</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#1A3CFF]">—</span>
                <span>Dans ta boîte mail en 30 minutes chrono</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#1A3CFF]">—</span>
                <span>Pas convaincu ? On retravaille, sans frais supplémentaires</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-5xl font-black tracking-[-0.05em] md:text-7xl">
            Les vraies questions que tu te poses
          </h2>
          <div className="mt-16 divide-y divide-zinc-200">
            {faq.map((item, i) => (
              <div key={i} className="py-8">
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
                  {item.q}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-500 md:text-lg">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#1A3CFF] px-6 py-32 text-white md:py-48">
        <div className="final-copy mx-auto max-w-6xl">
          <h2 className="text-5xl font-black tracking-[-0.06em] md:text-8xl">
            <span className="final-line block">Tu peux continuer à envoyer le même CV.</span>
            <span className="final-line block">Ou pas.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-blue-100 md:text-2xl">
            Envoie ton CV maintenant. Dans 30 minutes, tu passes devant 95% des candidats.
          </p>
          <div className="mt-10">
            <CTAButton dark location="bottom" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] px-6 py-12 text-sm text-zinc-500">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid grid-cols-1 gap-6 border-b border-white/[0.06] pb-8 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-zinc-600">Ressources gratuites</span>
              <Link href="/blog" className="mt-3 block text-zinc-400 hover:text-white transition-colors duration-200">
                Blog — conseils CV et emploi
              </Link>
              <Link href="/bible-agent-ia-cv" className="mt-2 block text-zinc-400 hover:text-white transition-colors duration-200">
                La Bible — 100 guides recherche d&apos;emploi
              </Link>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-zinc-600">Nos services</span>
              <Link href="/order" className="mt-3 block text-zinc-400 hover:text-white transition-colors duration-200">
                CV Pro — 12€
              </Link>
              <Link href="/agent-ia-emploi" className="mt-2 block text-zinc-400 hover:text-white transition-colors duration-200">
                Agent IA Emploi — 9€
              </Link>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-zinc-600">Légal</span>
              <Link href="/mentions-legales" className="mt-3 block hover:text-white transition-colors duration-200">
                Mentions légales
              </Link>
              <Link href="/cgv" className="mt-2 block hover:text-white transition-colors duration-200">
                CGV
              </Link>
              <Link href="/confidentialite" className="mt-2 block hover:text-white transition-colors duration-200">
                Confidentialité
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="font-semibold text-zinc-300">CV Pro</span>
              <span className="ml-2 text-xs text-zinc-600">Un service LB FRAME</span>
            </div>
            <span className="text-xs text-zinc-700">© 2026 CV Pro · LB FRAME</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
