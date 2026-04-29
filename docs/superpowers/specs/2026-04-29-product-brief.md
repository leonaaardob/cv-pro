# CV Pro — Product Brief
*Rédigé le 29 avril 2026*

---

## 1. Vision & Marché

### Vision produit
CV Pro est une plateforme de services IA pour la recherche d'emploi. L'entrée de gamme est un service de réécriture de CV à 12€, livré en 30 minutes. Le deuxième produit est un ebook pratique à 9€ — 50 prompts pour piloter toute sa recherche d'emploi avec l'IA. Les deux produits se renforcent via un système d'upsell bidirectionnel.

### Marché cible
Toute personne en recherche d'emploi en France, sans distinction d'âge ou de secteur. Le message est universel : le marché du recrutement est une guerre de sélection automatisée, et l'IA est l'arme qui rééquilibre les chances.

### Positionnement
Pas un outil SaaS à abonnement. Pas un cabinet de coaching à 500€. Un service direct, au prix d'un repas, avec une promesse concrète : passer devant 95% des candidats en 30 minutes. Zéro friction, zéro engagement.

### Entité
LB FRAME — service opéré sous la marque CV Pro (`cvpro.lbframe.com`).

---

## 2. Offres & Upsells

### Règle fondamentale
**Une seule offre présentée à la fois.** Pas de bundle. Les deux produits coexistent mais ne sont jamais proposés ensemble sur la même page.

### Offre 1 — Réécriture de CV · 12€
- Service humain assisté par IA
- Upload CV (PDF/Word) + email de livraison → Stripe → traitement admin → livraison en 30 min
- Révisions incluses sans limite (promesse de satisfaction)
- Canal d'acquisition : SEO + contenu long format (bible IA emploi)

### Offre 2 — L'Agent IA Emploi · 9€
- Ebook PDF : 50 prompts copier-coller couvrant CV, lettre de motivation, préparation entretien, suivi candidatures
- Livraison instantanée par email via lien sécurisé (Cloudflare Worker + R2, intégré dans cv-pro)
- Canal d'acquisition : TikTok Shop + Meta Ads
- Landing page dédiée : `/agent-ia-emploi`

### Upsell CV → Ebook (email J+4 post-livraison)
> "Ton CV est prêt. Tu veux aller plus loin dans ta recherche ? 50 prompts pour trouver le job dont tu as besoin — sans perdre de temps."

### Upsell Ebook → CV (emails J+1 et J+10 post-achat)
> "Les prompts du guide t'aident à réécrire ton CV toi-même — comptez ~2h. Ou laisse-nous le faire en 30 minutes chrono pour 12€."
*Angle : convertir du temps en argent — rendre visible et calculé le coût des 2h perdues vs 12€.*

---

## 3. Parcours utilisateur

### Flux A — Achat CV
1. Landing page → CTA "Commander"
2. `/order` : upload CV + email → Stripe Checkout
3. Webhook Stripe → création commande `pending` + création compte (magic link Redis 7j) + email de confirmation
4. Admin traite la commande → upload CV réécrit → statut `delivered`
5. Email de livraison avec lien de téléchargement sécurisé (R2)
6. Séquence email post-livraison (voir Section 5)
7. `/dashboard` : historique commandes + bouton "Demander une révision" si `delivered`

### Flux B — Achat Ebook
1. TikTok Shop / Meta Ads → landing page `/agent-ia-emploi`
2. Stripe Checkout ebook (9€)
3. Webhook → email de livraison instantané (lien sécurisé R2 via Cloudflare Worker)
4. Séquence email post-achat (voir Section 5)

### Flux C — Révision
1. Client dans `/dashboard` → bouton "Demander une révision" (visible si statut `delivered`)
2. Notification admin + email de confirmation client
3. Admin re-traite → upload nouvelle version → email de livraison v2

### Flux D — Accès espace client
- Post-achat CV : magic link dans email de confirmation (connexion sans mot de passe)
- Retour direct : `/dashboard` → redirige vers login si pas de session active

---

## 4. Dashboard Admin

Zone de travail quotidienne — conçue pour traiter les commandes le plus vite possible.

### Vue liste (`/admin`)
- Compteurs par statut : en attente / en cours / livré
- Tableau des commandes triées par date, filtrable par statut
- Badge **URGENT** sur les commandes `pending` depuis plus de 30 min (SLA affiché)
- Badge **RÉVISION DEMANDÉE** visible depuis la liste
- Accès rapide à la commande en un clic

### Vue commande (`/admin/orders/[id]`)
- Téléchargement direct du CV original
- Upload du CV réécrit + livraison en un bouton (déclenche statut `delivered` + email livraison)
- Passage automatique en `processing` dès ouverture de la commande
- Historique des révisions (versions successives)
- Indicateur de révision demandée avec message du client

### Manques actuels à combler
- Notifications en temps réel (pas de rechargement manuel)
- Badge URGENT / SLA
- Gestion des révisions
- Passage automatique en `processing`

---

## 5. Séquences Email

*Stack : React Email + Resend. Séquences validées par un expert marketing.*
*Principe : la fenêtre d'intent post-achat se ferme à J+5. Tout upsell après J+7 s'appuie sur un nouveau déclencheur (résultat, social proof), pas sur le temps.*

### Séquence A — CV réécrit

| Timing | Email | Objectif |
|--------|-------|----------|
| J+0 immédiat | Confirmation commande | Rassurer, poser les attentes |
| J+0 +30 min | Livraison CV réécrit | Délivrer la promesse |
| J+1 | Activation : "comment tirer le maximum de votre CV" | Réduire l'anxiété post-achat, inviter à demander une révision |
| J+2 | Demande de feedback | Collecter pendant que l'expérience est fraîche |
| J+4 | Upsell ebook | Intent encore chaud |

### Séquence B — Ebook

| Timing | Email | Objectif |
|--------|-------|----------|
| J+0 immédiat | Livraison PDF + accès | Délivrer instantanément |
| J+1 | Upsell CV — angle complémentarité | Pic d'intent post-achat |
| J+2 | Relance contenu — focus 1 prompt clé à fort impact | Engagement, valeur perçue |
| J+4 | Nurturing — "avez-vous décroché un entretien ?" | Segmenter, créer du lien |
| J+7 | Feedback + NPS (Klozeo) | Mesurer satisfaction, identifier promoteurs |
| J+10 | Upsell CV 2e angle (social proof / urgence) | Dernier levier de conversion |

*Note : J+14 est commercialement mort sur ces tickets — écarté.*

---

## 6. Stratégie d'acquisition

### Canal CV Pro — SEO + Contenu long format
- Pilier central : "bible de l'IA pour la recherche d'emploi", dérivée du contenu de l'ebook
- Articles longs (2000-4000 mots) ciblant des requêtes transactionnelles ("réécrire son CV avec l'IA", "ATS optimisation CV", "prompts ChatGPT CV")
- Maillage interne systématique vers `/order`
- Délai pour des résultats organiques : 3-6 mois (canal lent, gratuit, durable)

### Canal Ebook — TikTok Shop + Meta Ads
- Formats courts : Before/After CV, révélation score ATS, demo prompt live
- TikTok Shop : vente directe in-app
- Meta Ads : redirection vers `/agent-ia-emploi`
- Production initiale : Canva / Runway

### LinkedIn Ads — Écarté
CPC trop élevé (5-15€) pour un produit à 9-12€. ROAS négatif garanti.

---

## 7. KPIs & Outils de mesure

*Stack : Plausible (analytics) · GlitchTip (error tracking) · Growthbook (A/B testing)*

### Produit CV
- Commandes par jour / semaine
- Délai moyen de livraison (objectif : < 30 min)
- Taux de révision demandée (signal qualité)
- Taux de conversion upsell ebook (email J+4)

### Produit Ebook
- Ventes par canal (TikTok Shop vs Meta Ads vs organique)
- Coût par vente (ads)
- Taux d'ouverture de chaque email de la séquence
- NPS J+7
- Taux de conversion upsell CV (emails J+1 et J+10)

### Contenu SEO (bible IA emploi)
- Pages vues et articles les plus lus (Plausible)
- Taux de rebond par article
- Profondeur de scroll — identifier les articles trop longs / trop courts / optimaux
- Point de décrochage sur les landings CV et ebook
- Taux de conversion article → `/order` ou `/agent-ia-emploi`
- Temps de lecture moyen par article

### Global
- Revenu total (CV + Ebook)
- Revenu par canal d'acquisition
- LTV client (achat unique vs achat des deux produits)
- Expérimentations A/B sur les landings et emails (Growthbook)

---

## 8. Roadmap

### Phase 1 — Socle opérationnel *(priorité immédiate)*
- Dashboard admin : badge URGENT/SLA, filtre statut, gestion révisions, notifications temps réel
- Bouton "Demander une révision" dans `/dashboard` client
- Intégration ebook dans cv-pro : Stripe product ebook, webhook livraison, page `/agent-ia-emploi`

### Phase 2 — Emails *(dès que Phase 1 stable)*
- 11 templates React Email / Resend : séquences CV (5 emails) et ebook (6 emails)
- Intégration Klozeo pour NPS J+7 ebook

### Phase 3 — Acquisition
- Landing page ebook `/agent-ia-emploi`
- Structure blog / bible IA emploi (routing, templates articles, sitemap)
- Plausible : tracking scroll depth + events de conversion sur les landings

### Phase 4 — Optimisation *(continue)*
- Premiers articles SEO dérivés de l'ebook
- A/B tests landings et emails (Growthbook)
- Analyse NPS et itération produit

### Phase 5 — Remotion Ads Builder *(quand tout le reste est stable)*
- Générateur automatique d'ads vidéo depuis le contenu de l'ebook
- Compositions : BeforeAfterAd, ATSRevealAd, PromptDemoAd, StorytellingAd
- Stack : Remotion + React + Tailwind

---

## 9. Stack technique

| Composant | Outil |
|-----------|-------|
| Framework | Next.js App Router |
| Base de données | PostgreSQL + Drizzle ORM |
| Auth | Better-Auth (magic link) |
| Paiement | Stripe (Checkout + Webhooks) |
| Stockage fichiers | Cloudflare R2 (EU, RGPD) |
| Email | Resend + React Email |
| Sessions / tokens | Redis |
| Analytics | Plausible |
| Error tracking | GlitchTip |
| A/B testing | Growthbook |
| CRM / feedback | Klozeo |
| Ebook delivery | Cloudflare Worker (token HMAC-SHA256) |
