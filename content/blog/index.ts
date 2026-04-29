export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  tags: string[]
}

export const articles: ArticleMeta[] = [
  {
    slug: 'comment-optimiser-son-cv-pour-les-ats',
    title: 'Comment optimiser son CV pour passer les filtres ATS en 2026',
    description: "95% des grandes entreprises utilisent des logiciels ATS pour filtrer les CV avant qu'un humain les lise. Voici comment leur parler le bon langage.",
    date: '2026-04-29',
    readTime: 6,
    tags: ['CV', 'ATS', 'Recherche d\'emploi'],
  },
]

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}
