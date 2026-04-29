import { Metadata } from 'next'
import Link from 'next/link'
import { guides, parcours, THEMES, getGuidesByTheme } from '@/content/bible'

export const metadata: Metadata = {
  title: 'La Bible de la Recherche d\'Emploi avec l\'IA — 100 Guides | CV Pro',
  description: '100 guides pratiques pour décrocher un emploi avec l\'IA. CV, lettre de motivation, LinkedIn, entretiens, stratégie. Gratuit. Complet. Actionnable.',
  alternates: { canonical: 'https://cvpro.lbframe.com/bible-agent-ia-cv' },
  openGraph: {
    title: 'La Bible de la Recherche d\'Emploi avec l\'IA — 100 Guides',
    description: '100 guides sur 5 thèmes. Tout ce qu\'il faut pour trouver un emploi avec l\'IA en 2026.',
    type: 'website',
    url: 'https://cvpro.lbframe.com/bible-agent-ia-cv',
  },
}

const THEME_ICONS: Record<number, string> = {
  1: '📄',
  2: '✉️',
  3: '🔗',
  4: '🎯',
  5: '🗺️',
}

const PARCOURS_ICONS = ['🎓', '🔄', '🌱', '🚀']

export default function BiblePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold text-[#0D0D0D] tracking-tight">CV Pro</Link>
          <Link
            href="/order"
            className="rounded-full bg-[#1A3CFF] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Faire réécrire mon CV →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-zinc-100 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#1A3CFF]">Ressource gratuite</p>
          <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.03em] text-[#0D0D0D] md:text-6xl">
            La Bible de la Recherche d&apos;Emploi avec l&apos;IA
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-zinc-500">
            100 guides pratiques sur 5 thèmes. Tout ce qu&apos;il faut savoir pour décrocher un emploi en 2026 — CV, lettre de motivation, LinkedIn, entretiens, stratégie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.entries(THEMES).map(([id, theme]) => (
              <a
                key={id}
                href={`#theme-${id}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:opacity-80 ${theme.color} ${theme.bg} border-transparent`}
              >
                {THEME_ICONS[Number(id)]} {theme.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="border-b border-zinc-100 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black tracking-tight text-[#0D0D0D]">4 parcours selon ton profil</h2>
          <p className="mt-3 text-zinc-500">
            Tu n&apos;as pas besoin de lire les 100 guides. Commence par le parcours qui correspond à ta situation.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {parcours.map((p, i) => (
              <div
                key={p.id}
                className="rounded-2xl border border-zinc-200 bg-white p-7 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{PARCOURS_ICONS[i]}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0D0D0D]">{p.title}</h3>
                    <p className="mt-0.5 text-sm text-zinc-400">{p.profile}</p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{p.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-1.5">
                  {p.guides.slice(0, 5).map((slug) => {
                    const g = guides.find((x) => x.slug === slug)
                    if (!g) return null
                    return (
                      <Link
                        key={slug}
                        href={`/bible-agent-ia-cv/${slug}`}
                        className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[#1A3CFF] transition-colors"
                      >
                        <span className="text-[#1A3CFF]">→</span>
                        {g.title}
                      </Link>
                    )
                  })}
                  {p.guides.length > 5 && (
                    <p className="mt-2 text-xs text-zinc-400">+ {p.guides.length - 5} autres guides dans ce parcours</p>
                  )}
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {p.guides.length} guides · Parcours complet
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA ebook dans les parcours */}
          <div className="mt-10 rounded-2xl bg-[#0D0D0D] p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B8AFF]">Ebook</p>
            <h3 className="mt-2 text-2xl font-black">On a tout regroupé dans un guide complet.</h3>
            <p className="mt-3 text-zinc-400">
              50 prompts IA prêts à l&apos;emploi pour couvrir tout ton parcours : du CV à l&apos;offre signée. PDF livré instantanément. 9€.
            </p>
            <Link
              href="/agent-ia-emploi"
              className="mt-5 inline-block rounded-xl bg-[#1A3CFF] px-6 py-3 text-sm font-bold text-white hover:bg-blue-600 transition-colors"
            >
              Obtenir le guide complet →
            </Link>
          </div>
        </div>
      </section>

      {/* THÈMES */}
      {[1, 2, 3, 4, 5].map((themeId) => {
        const theme = THEMES[themeId]
        const themeGuides = getGuidesByTheme(themeId)
        return (
          <section
            key={themeId}
            id={`theme-${themeId}`}
            className="border-b border-zinc-100 px-6 py-16"
          >
            <div className="mx-auto max-w-5xl">
              {/* En-tête de thème */}
              <div className="flex items-center gap-4">
                <span className={`rounded-xl px-4 py-2 text-sm font-bold ${theme.color} ${theme.bg}`}>
                  {THEME_ICONS[themeId]} Thème {themeId} — {theme.label}
                </span>
                <span className="text-sm text-zinc-400">{themeGuides.length} guides</span>
              </div>

              {/* Grille de guides */}
              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {themeGuides.map((guide, idx) => (
                  <Link
                    key={guide.slug}
                    href={`/bible-agent-ia-cv/${guide.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-5 hover:border-zinc-200 hover:shadow-sm transition-all"
                  >
                    <span className="mt-0.5 text-lg font-black text-zinc-200 group-hover:text-zinc-300 transition-colors w-8 shrink-0">
                      {String(((themeId - 1) * 20) + idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#0D0D0D] leading-snug group-hover:text-[#1A3CFF] transition-colors">
                        {guide.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                        {guide.description}
                      </p>
                      <p className="mt-2 text-xs text-zinc-400">{guide.readTime} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA FINAL */}
      <section className="bg-[#1A3CFF] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">CV Pro</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Ton CV, réécrit en 30 minutes.
          </h2>
          <p className="mt-4 text-lg text-blue-200">
            Tu peux lire les 100 guides. Ou tu peux nous envoyer ton CV et on s&apos;occupe de tout.
          </p>
          <div className="mt-8">
            <Link
              href="/order"
              className="rounded-xl bg-white px-8 py-4 text-base font-bold text-[#1A3CFF] hover:bg-blue-50 transition-colors"
            >
              Commander mon CV réécrit — 12€ →
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-300">
            Paiement sécurisé · Sans abonnement · Remboursé si pas satisfait
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] px-6 py-10 text-sm text-zinc-500">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="font-semibold text-zinc-300">CV Pro</span>
            <span className="ml-2 text-zinc-600">Un service LB FRAME · © 2026</span>
          </div>
          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
