import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides, getGuide, THEMES, getGuidesByTheme } from '@/content/bible'

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | CV Pro`,
    description: guide.description,
    alternates: { canonical: `https://cvpro.lbframe.com/bible-agent-ia-cv/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: `https://cvpro.lbframe.com/bible-agent-ia-cv/${slug}`,
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = getGuide(slug)
  if (!meta) notFound()

  let GuideContent: React.ComponentType
  try {
    const mod = await import(`../../../content/bible/${slug}`)
    GuideContent = mod.default
  } catch {
    notFound()
  }

  const theme = THEMES[meta.theme]
  const themeGuides = getGuidesByTheme(meta.theme)
  const related = themeGuides.filter((g) => g.slug !== slug).slice(0, 4)
  const isEbookGuide = meta.theme === 1 || meta.theme === 2

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date ?? '2026-04-28',
    dateModified: meta.date ?? '2026-04-28',
    author: { '@type': 'Organization', name: 'CV Pro', url: 'https://cvpro.lbframe.com' },
    publisher: { '@type': 'Organization', name: 'CV Pro', url: 'https://cvpro.lbframe.com' },
    url: `https://cvpro.lbframe.com/bible-agent-ia-cv/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cvpro.lbframe.com/bible-agent-ia-cv/${slug}`,
    },
  }

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/bible-agent-ia-cv"
            className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors"
          >
            ← La Bible
          </Link>
          <Link href="/" className="font-semibold text-[#0D0D0D] tracking-tight text-sm">CV Pro</Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 pb-24">
        {/* HEADER */}
        <header className="border-b border-zinc-100 py-14">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.color} ${theme.bg}`}>
              {theme.label}
            </span>
            <span className="text-sm text-zinc-400">{meta.readTime} min de lecture</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.03em] text-[#0D0D0D] md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-zinc-500">{meta.description}</p>
        </header>

        {/* CONTENU — style Medium via @tailwindcss/typography */}
        <div className="py-14 prose prose-zinc max-w-none prose-headings:tracking-tight prose-headings:font-extrabold prose-h2:text-3xl prose-h2:mt-14 prose-h3:text-xl prose-h3:mt-10 prose-p:text-[1.1rem] prose-p:leading-[1.85] prose-p:text-zinc-800 prose-li:text-[1.05rem] prose-li:text-zinc-800 prose-blockquote:border-l-[3px] prose-blockquote:border-[#1A3CFF] prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-zinc-700">
          <GuideContent />
        </div>

        {/* CTA CONTEXTUEL */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-8">
          {isEbookGuide ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A3CFF]">
                L&apos;Agent IA Emploi
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#0D0D0D]">
                50 prompts prêts à copier-coller.
              </h2>
              <p className="mt-2 text-zinc-500">
                On a condensé tout ce qu&apos;il faut pour ton CV, ta lettre, et tes entretiens en 50 prompts IA. PDF livré instantanément. 9€.
              </p>
              <Link
                href="/agent-ia-emploi"
                className="mt-5 inline-block rounded-xl bg-[#1A3CFF] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
              >
                Obtenir le guide — 9€ →
              </Link>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A3CFF]">
                CV Pro
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#0D0D0D]">
                Ton CV réécrit en 30 minutes.
              </h2>
              <p className="mt-2 text-zinc-500">
                On applique tout ce que tu viens de lire — et plus. CV optimisé ATS, réécrit par notre IA. Livré en 30 minutes. 12€.
              </p>
              <Link
                href="/order"
                className="mt-5 inline-block rounded-xl bg-[#1A3CFF] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
              >
                Commander mon CV réécrit →
              </Link>
            </>
          )}
        </div>

        {/* GUIDES LIÉS */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#0D0D0D]">Sur le même thème</h2>
            <div className="mt-6 space-y-3">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  href={`/bible-agent-ia-cv/${g.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-zinc-100 p-4 hover:border-zinc-200 hover:bg-zinc-50 transition-all"
                >
                  <span className="mt-0.5 text-[#1A3CFF]">→</span>
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">{g.title}</p>
                    <p className="mt-0.5 text-sm text-zinc-500 line-clamp-1">{g.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* RETOUR BIBLE */}
        <div className="mt-12 border-t border-zinc-100 pt-8 text-center">
          <Link
            href="/bible-agent-ia-cv"
            className="text-sm font-semibold text-[#1A3CFF] hover:underline"
          >
            ← Voir tous les 100 guides
          </Link>
        </div>
      </article>
    </main>
  )
}
