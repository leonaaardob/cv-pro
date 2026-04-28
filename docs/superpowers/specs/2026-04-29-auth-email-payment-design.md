# Auth, Email & Payment Integration — CV Pro

**Date:** 2026-04-29  
**Status:** Approved

---

## 1. Objectif

Ajouter à CV Pro :
- Une authentification complète (magic link + Google OAuth) via Better-auth
- Un service email transactionnel et d'auth via Resend
- Une intégration Stripe Checkout avec webhooks pour lier paiements et commandes
- Un espace client (dashboard) et un back-office admin

---

## 2. Stack

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | Better-auth · magic link plugin + Google OAuth |
| ORM | Drizzle ORM · `drizzle-kit push` (aucune migration SQL manuelle) |
| DB | PostgreSQL sur VPS Hetzner |
| Sessions | Redis sur VPS (Better-auth plugin) |
| Emails | Resend · endpoint EU · expéditeur `cvpro@lbframe.com` |
| Paiement | Stripe Checkout + webhooks · multi-produits |
| Fichiers | Cloudflare R2 · SDK S3-compatible |
| Templates email | React Email |

---

## 3. Structure des routes

```
app/
├── (public)/
│   ├── page.tsx                  # Landing (existant)
│   └── auth/
│       └── login/page.tsx        # Email + bouton Google (magic link)
├── (customer)/
│   └── dashboard/
│       ├── page.tsx              # Liste commandes client
│       └── [orderId]/page.tsx    # Détail + download CV réécrit
├── (admin)/
│   └── admin/
│       ├── page.tsx              # Dashboard orders
│       ├── orders/[orderId]/page.tsx
│       └── users/page.tsx
└── api/
    ├── auth/[...all]/route.ts    # Better-auth handler
    ├── stripe/webhook/route.ts   # Stripe webhook
    └── files/[key]/route.ts      # Proxy download R2 signé
```

---

## 4. Modèle de données (Drizzle)

### Tables gérées par Better-auth
- `users` — id, email, name, emailVerified, role (`user` | `admin`), createdAt
- `sessions` — gestion des sessions (+ Redis pour la perf)
- `accounts` — liens OAuth (Google)
- `verificationTokens` — tokens magic link

### Table métier : `orders`

```ts
orders = pgTable('orders', {
  id:               uuid().primaryKey().defaultRandom(),
  userId:           uuid().notNull().references(() => users.id),
  stripeSessionId:  text().notNull().unique(),
  stripeProductId:  text().notNull(),
  productName:      text().notNull(),
  status:           text().notNull().default('pending'),
    // 'pending' | 'processing' | 'delivered'
  cvOriginalKey:    text().notNull(),    // clé R2 du CV soumis
  cvRewrittenKey:   text(),              // clé R2 du CV réécrit (null jusqu'à livraison)
  createdAt:        timestamp().defaultNow(),
  updatedAt:        timestamp().defaultNow(),
})
```

---

## 5. Flux de commande complet

```
1. User connecté → page /dashboard (ou landing)
2. Sélectionne un produit → upload son CV → clé R2 stockée temporairement
3. Stripe Checkout créé avec metadata: { userId, cvOriginalKey, productId, productName }
4. Paiement confirmé → webhook checkout.session.completed
5. → Row créée dans orders (status: pending)
6. → Email Resend "Confirmation commande" envoyé au client
7. Admin voit la commande → download CV original (lien R2 signé 15 min)
8. Admin traite → upload CV réécrit → cvRewrittenKey enregistré
9. Admin passe status à 'delivered'
10. → Email Resend "Ton CV est prêt" envoyé au client
11. Client accède au dashboard → download CV réécrit (lien R2 signé 15 min)
```

---

## 6. Flows d'authentification

### Magic link (inscription + connexion unifiés)
1. User saisit son email sur `/auth/login`
2. Better-auth (magic link plugin) → Resend envoie le lien (valide 15 min)
3. User clique → connecté
   - Email inconnu → compte créé automatiquement → onboarding
   - Email connu → reconnecté directement

### Google OAuth
1. Bouton "Continuer avec Google" → callback Better-auth
2. Compte créé ou lié automatiquement

### Suppression de compte (RGPD)
1. User demande la suppression depuis le dashboard
2. → Fichiers R2 associés supprimés
3. → Données BDD supprimées (cascade)
4. → Email Resend de confirmation de suppression envoyé

---

## 7. Emails Resend

| Template | Déclencheur | Contenu |
|---|---|---|
| Magic link | Auth Better-auth | Lien de connexion, valide 15 min |
| Confirmation commande | Webhook Stripe `checkout.session.completed` | Récap commande, produit, délai 30 min, lien dashboard |
| CV livré | Admin passe status → `delivered` | Lien dashboard pour télécharger le CV réécrit |
| Suppression compte | Demande RGPD utilisateur | Confirmation suppression données + fichiers |

- **Expéditeur :** `cvpro@lbframe.com`
- **Endpoint :** `api.eu.resend.com` (conformité RGPD)
- **Templates :** React Email (composants JSX, preview local)

---

## 8. Fichiers — Cloudflare R2

- Les CVs (originaux et réécrits) sont stockés dans un bucket R2
- Nommage des clés :
  - CV original : `cvs/{userId}/{uploadUuid}/original.{ext}` — généré à l'upload, avant paiement
  - CV réécrit : `cvs/{userId}/{uploadUuid}/rewritten.{ext}` — uploadé par l'admin après traitement
- L'`uploadUuid` est généré côté serveur au moment de l'upload et passé dans les metadata Stripe lors de la création du Checkout. Le webhook l'utilise pour créer la row `orders` avec `cvOriginalKey` correct.
- Accès via liens pré-signés (15 min d'expiration) générés côté serveur
- Aucune clé R2 exposée côté client
- Uploads orphelins (CV uploadé mais paiement abandonné) : nettoyage possible via un cron R2 ou ignorés (faible volume)
- Suppression des fichiers lors de la suppression de compte (RGPD)

---

## 9. Protection des routes

```
Middleware Next.js
├── /dashboard/*  → session requise (redirect /auth/login)
├── /admin/*      → session requise + role === 'admin' (redirect 403)
└── /api/files/*  → session requise + (ownership || role === 'admin')
```

- Le rôle `admin` est défini manuellement en BDD sur le compte de l'opérateur
- Les liens R2 sont signés et à durée limitée — jamais d'URL publique permanente

---

## 10. Conformité RGPD

- Email vérifié par nature avec magic link (pas de compte fantôme possible)
- Consentement cookies : banner existant conservé
- Page `/confidentialite` à enrichir : mention Better-auth, Resend, Cloudflare R2, Stripe comme sous-traitants
- Droit à l'effacement : route de suppression compte + fichiers R2 + données BDD
- Données hébergées en UE : VPS Hetzner EU, Resend endpoint EU, R2 bucket région EU
- Cloisonnement des données : seul l'admin accède aux CVs d'autres utilisateurs

---

## 11. Variables d'environnement requises

```env
# Database
DATABASE_URL=postgresql://...

# Redis
REDIS_URL=redis://...

# Better-auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://cvpro.lbframe.com

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend
RESEND_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
```
