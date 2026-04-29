import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "L'Agent IA Emploi — 50 prompts pour trouver un job avec l'IA | CV Pro",
  description:
    "50 prompts IA prêts à copier-coller pour ton CV, ta lettre de motivation et tes entretiens. Compatible ChatGPT, Claude, Gemini. PDF livré instantanément. 9€.",
  alternates: { canonical: 'https://cvpro.lbframe.com/agent-ia-emploi' },
  openGraph: {
    title: "L'Agent IA Emploi — 50 prompts pour trouver un job avec l'IA",
    description:
      "50 prompts IA prêts à copier-coller. CV, lettre de motivation, entretien. PDF livré instantanément. 9€.",
    type: 'website',
    url: 'https://cvpro.lbframe.com/agent-ia-emploi',
  },
}

export default function AgentIaEmploiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
