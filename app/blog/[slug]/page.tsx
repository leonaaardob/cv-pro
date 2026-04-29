import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, getArticle } from '@/content/blog'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} | CV Pro`,
    description: article.description,
    alternates: { canonical: `https://cvpro.lbframe.com/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `https://cvpro.lbframe.com/blog/${slug}`,
      publishedTime: article.date,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = getArticle(slug)
  if (!meta) notFound()

  let ArticleContent: React.ComponentType
  try {
    const mod = await import(`../../../content/blog/${slug}`)
    ArticleContent = mod.default
  } catch {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { '@type': 'Organization', name: 'CV Pro', url: 'https://cvpro.lbframe.com' },
    publisher: { '@type': 'Organization', name: 'CV Pro', url: 'https://cvpro.lbframe.com' },
    url: `https://cvpro.lbframe.com/blog/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://cvpro.lbframe.com/blog/${slug}` },
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-sm text-zinc-500 transition-colors hover:text-[#0D0D0D]"
        >
          ← Blog
        </Link>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            {new Date(meta.date).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
            {' · '}
            {meta.readTime} min de lecture
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-[#0D0D0D] md:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-500">{meta.description}</p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white px-8 py-10 prose prose-zinc max-w-none prose-headings:tracking-tight prose-h2:text-[1.5rem] prose-h2:font-extrabold prose-h2:mt-10 prose-h3:text-[1.15rem] prose-h3:mt-7 prose-p:text-base prose-p:leading-[1.8] prose-p:text-zinc-700 prose-li:text-base prose-blockquote:border-l-[3px] prose-blockquote:border-[#1A3CFF] prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:not-italic">
          <ArticleContent />
        </div>

        <div className="mt-10 rounded-2xl border border-[#1A3CFF]/20 bg-[#1A3CFF]/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#1A3CFF]">
            CV Pro
          </p>
          <h2 className="mt-2 text-xl font-black text-[#0D0D0D]">
            Ton CV optimisé en 30 minutes
          </h2>
          <p className="mt-2 text-zinc-600">
            On applique ces optimisations ATS sur ton CV, plus une réécriture complète par notre IA.
            Livré en 30 minutes. 12€.
          </p>
          <Link
            href="/order"
            className="mt-4 inline-block rounded-xl bg-[#1A3CFF] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            Commander mon CV réécrit →
          </Link>
        </div>
      </div>
    </main>
  )
}
