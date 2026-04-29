import { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/content/blog'

export const metadata: Metadata = {
  title: 'Blog — Conseils CV et recherche d\'emploi avec l\'IA | CV Pro',
  description: 'Guides pratiques pour optimiser votre recherche d\'emploi avec l\'IA : CV, ATS, lettres de motivation, entretiens.',
  alternates: { canonical: 'https://cvpro.lbframe.com/blog' },
}

export default function BlogPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-[-0.03em] text-[#0D0D0D]">Blog</h1>
          <p className="mt-3 text-lg text-zinc-500">
            Guides pratiques pour décrocher plus d&apos;entretiens avec l&apos;IA.
          </p>
        </div>

        <div className="space-y-4">
          {sorted.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                    {' · '}
                    {article.readTime} min de lecture
                  </p>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-[#0D0D0D]">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {article.description}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1A3CFF]">Lire →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
