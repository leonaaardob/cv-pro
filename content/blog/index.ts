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
  {
    slug: 'reecrire-son-cv-avec-ia',
    title: 'Réécrire son CV avec l\'IA : le guide complet (2026)',
    description: 'Comment utiliser ChatGPT, Claude et d\'autres IA pour réécrire son CV en professionnel. Méthode étape par étape avec les prompts exacts.',
    date: '2026-04-28',
    readTime: 8,
    tags: ['cv', 'ia', 'chatgpt'],
  },
  {
    slug: 'lettre-de-motivation-ia',
    title: 'Lettre de motivation avec l\'IA : méthode + prompts (ne pas ressembler à tout le monde)',
    description: 'Comment rédiger une lettre de motivation qui sort du lot avec l\'IA. Les prompts qui évitent les formules creuses et les pièges à éviter.',
    date: '2026-04-27',
    readTime: 6,
    tags: ['lettre-motivation', 'ia', 'emploi'],
  },
]

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}
