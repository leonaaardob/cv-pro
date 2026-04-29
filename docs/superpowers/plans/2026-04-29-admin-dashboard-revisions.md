# Admin Dashboard + Révisions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finaliser le dashboard admin pour un traitement rapide des commandes, et câbler le flow de révision côté client et admin.

**Architecture:** Ajout de champs `revisionRequestedAt` / `revisionMessage` dans le schéma Drizzle, mise à jour des routes API et des pages admin/client. Les badges URGENT et RÉVISION sont calculés côté serveur à chaque render. Un composant `AdminAutoRefresh` rafraîchit la page toutes les 30s via `router.refresh()`.

**Tech Stack:** Next.js App Router (Server Components + Client Components), Drizzle ORM + drizzle-kit push, Vitest, React Email + Resend/SMTP.

---

## Carte des fichiers

| Fichier | Action | Rôle |
|---------|--------|------|
| `lib/db/schema.ts` | Modifier | Ajouter `revisionRequestedAt`, `revisionMessage` |
| `lib/admin-utils.ts` | Créer | Utilitaire `isUrgentOrder` (testable) |
| `lib/email.ts` | Modifier | Ajouter `sendRevisionNotificationEmail` |
| `emails/revision-request.tsx` | Modifier | Ajouter prop `message` optionnel |
| `app/api/orders/[orderId]/revision/route.ts` | Modifier | Accepter message, set `revisionRequestedAt`, notifier admin |
| `app/api/admin/orders/[orderId]/route.ts` | Modifier | Clear `revisionRequestedAt` + `revisionMessage` à la livraison |
| `components/RevisionButton.tsx` | Modifier | Textarea message optionnel, flow en 2 étapes |
| `components/AdminAutoRefresh.tsx` | Créer | Client component polling `router.refresh()` toutes les 30s |
| `app/(admin)/admin/page.tsx` | Modifier | Badges URGENT + RÉVISION, filtre par statut, auto-refresh |
| `app/(admin)/admin/orders/[orderId]/page.tsx` | Modifier | Auto-processing, indicateur révision |
| `.env.example` | Modifier | Ajouter `ADMIN_EMAIL` |
| `tests/admin-utils.test.ts` | Créer | Tests `isUrgentOrder` |

---

## Task 1 : Schéma DB — champs révision

**Files:**
- Modify: `lib/db/schema.ts`
- Modify: `.env.example`

- [ ] **Step 1 : Ajouter les champs dans le schéma**

Dans `lib/db/schema.ts`, ajouter deux champs dans `orders` après `revisionLimit` :

```typescript
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  stripeProductId: text('stripe_product_id').notNull(),
  productName: text('product_name').notNull(),
  status: text('status').notNull().default('pending'),
  cvOriginalKey: text('cv_original_key').notNull(),
  cvRewrittenKey: text('cv_rewritten_key'),
  revisionCount: integer('revision_count').notNull().default(0),
  revisionLimit: integer('revision_limit').notNull().default(-1),
  revisionRequestedAt: timestamp('revision_requested_at'),
  revisionMessage: text('revision_message'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
```

- [ ] **Step 2 : Ajouter ADMIN_EMAIL dans .env.example**

Ajouter à la fin de `.env.example` :

```
# Admin
ADMIN_EMAIL=ton@email.com
```

- [ ] **Step 3 : Pousser le schéma en base**

```bash
npx drizzle-kit push
```

Expected : `✓ Changes applied` (ou similaire sans erreur).

- [ ] **Step 4 : Vérifier que les tests passent toujours**

```bash
npm test
```

Expected : tous les tests passent.

- [ ] **Step 5 : Commit**

```bash
git add lib/db/schema.ts .env.example
git commit -m "feat: add revisionRequestedAt and revisionMessage to orders schema"
```

---

## Task 2 : Utilitaire isUrgentOrder (TDD)

**Files:**
- Create: `lib/admin-utils.ts`
- Create: `tests/admin-utils.test.ts`

- [ ] **Step 1 : Écrire le test en premier**

Créer `tests/admin-utils.test.ts` :

```typescript
import { describe, it, expect } from 'vitest'
import { isUrgentOrder } from '@/lib/admin-utils'

describe('isUrgentOrder', () => {
  it('returns false for a non-pending order regardless of age', () => {
    const order = { status: 'delivered', createdAt: new Date(Date.now() - 60 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })

  it('returns false for a pending order under the 30-min threshold', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 15 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })

  it('returns true for a pending order over the 30-min threshold', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 35 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(true)
  })

  it('respects a custom threshold', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 5 * 60 * 1000) }
    expect(isUrgentOrder(order, 3 * 60 * 1000)).toBe(true)
  })

  it('returns false for processing orders even when old', () => {
    const order = { status: 'processing', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })
})
```

- [ ] **Step 2 : Vérifier que le test échoue**

```bash
npm test tests/admin-utils.test.ts
```

Expected : `FAIL` — `Cannot find module '@/lib/admin-utils'`.

- [ ] **Step 3 : Implémenter l'utilitaire**

Créer `lib/admin-utils.ts` :

```typescript
export function isUrgentOrder(
  order: { status: string; createdAt: Date | string },
  thresholdMs = 30 * 60 * 1000,
): boolean {
  if (order.status !== 'pending') return false
  const created = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt)
  return Date.now() - created.getTime() > thresholdMs
}
```

- [ ] **Step 4 : Vérifier que les tests passent**

```bash
npm test tests/admin-utils.test.ts
```

Expected : `5 passed`.

- [ ] **Step 5 : Commit**

```bash
git add lib/admin-utils.ts tests/admin-utils.test.ts
git commit -m "feat: add isUrgentOrder utility with tests"
```

---

## Task 3 : Email — template + helper notification admin

**Files:**
- Modify: `emails/revision-request.tsx`
- Modify: `lib/email.ts`

- [ ] **Step 1 : Mettre à jour le template pour afficher le message**

Remplacer le contenu de `emails/revision-request.tsx` :

```tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

export function RevisionRequestEmail({
  customerEmail,
  orderId,
  productName,
  message,
}: {
  customerEmail: string
  orderId: string
  productName: string
  message?: string
}) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Révision demandée
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Le client <strong>{customerEmail}</strong> a demandé une révision pour :
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '16px', fontWeight: '600' }}>
            {productName}
          </Text>
          {message && (
            <Text style={{ color: '#374151', fontSize: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '12px 16px', marginTop: '16px' }}>
              &ldquo;{message}&rdquo;
            </Text>
          )}
          <Button
            href={`${APP_URL}/admin/orders/${orderId}`}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Voir la commande →
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Admin · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 2 : Ajouter le helper dans lib/email.ts**

Ajouter l'import en haut de `lib/email.ts` :

```typescript
import { RevisionRequestEmail } from '@/emails/revision-request'
```

Puis ajouter la fonction à la fin du fichier :

```typescript
export async function sendRevisionNotificationEmail({
  to,
  customerEmail,
  orderId,
  productName,
  message,
}: {
  to: string
  customerEmail: string
  orderId: string
  productName: string
  message?: string
}) {
  await sendEmail({
    to,
    subject: `Révision demandée — ${productName}`,
    react: RevisionRequestEmail({ customerEmail, orderId, productName, message }),
  })
}
```

- [ ] **Step 3 : Vérifier que le build TS ne lève pas d'erreur**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 4 : Commit**

```bash
git add emails/revision-request.tsx lib/email.ts
git commit -m "feat: update RevisionRequestEmail with optional message + add sendRevisionNotificationEmail"
```

---

## Task 4 : Route révision — message + notification admin

**Files:**
- Modify: `app/api/orders/[orderId]/revision/route.ts`

- [ ] **Step 1 : Remplacer le contenu de la route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { sendRevisionNotificationEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orderId } = await params
  const body = await request.json().catch(() => ({})) as { message?: string }
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) || null : null

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (order.status !== 'delivered') return NextResponse.json({ error: 'Order not delivered' }, { status: 400 })

  const limitReached = order.revisionLimit !== -1 && order.revisionCount >= order.revisionLimit
  if (limitReached) return NextResponse.json({ error: 'Revision limit reached' }, { status: 429 })

  await db
    .update(orders)
    .set({
      revisionCount: sql`${orders.revisionCount} + 1`,
      revisionRequestedAt: new Date(),
      revisionMessage: message,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))

  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail) {
    sendRevisionNotificationEmail({
      to: adminEmail,
      customerEmail: session.user.email,
      orderId,
      productName: order.productName,
      message: message ?? undefined,
    }).catch(console.error)
  }

  return NextResponse.json({ revisionCount: order.revisionCount + 1 })
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Vérifier que les tests passent**

```bash
npm test
```

Expected : tous les tests passent.

- [ ] **Step 4 : Commit**

```bash
git add "app/api/orders/[orderId]/revision/route.ts"
git commit -m "feat: revision route stores message, sets revisionRequestedAt, notifies admin"
```

---

## Task 5 : RevisionButton — textarea message en 2 étapes

**Files:**
- Modify: `components/RevisionButton.tsx`

- [ ] **Step 1 : Remplacer le contenu du composant**

```tsx
'use client'

import { useState } from 'react'

export function RevisionButton({
  orderId,
  initialCount,
  revisionLimit,
}: {
  orderId: string
  initialCount: number
  revisionLimit: number
}) {
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)
  const [justRequested, setJustRequested] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  const limitReached = revisionLimit !== -1 && count >= revisionLimit

  async function handleRevision() {
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/${orderId}/revision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() || undefined }),
      })
      if (res.ok) {
        const data = await res.json()
        setCount(data.revisionCount)
        setJustRequested(true)
        setShowForm(false)
        setMessage('')
        setTimeout(() => setJustRequested(false), 4000)
      }
    } finally {
      setLoading(false)
    }
  }

  if (limitReached) return null

  return (
    <div className="mt-4 space-y-3">
      {justRequested && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Révision demandée — on s&apos;en occupe.
        </div>
      )}

      {!showForm && !justRequested && (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-[#0D0D0D] hover:bg-zinc-50 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          {count > 0 ? 'Nouvelle révision' : 'Demander une révision'}
        </button>
      )}

      {showForm && (
        <>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décris les modifications souhaitées (optionnel)"
            maxLength={500}
            rows={3}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-[#0D0D0D] placeholder-zinc-400 focus:border-[#1A3CFF] focus:outline-none focus:ring-2 focus:ring-[#1A3CFF]/20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleRevision}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1A3CFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Envoi...' : 'Confirmer →'}
            </button>
            <button
              onClick={() => { setShowForm(false); setMessage('') }}
              className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm text-zinc-500 hover:bg-zinc-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </>
      )}

      <p className="text-xs text-zinc-400">Zéro justification, zéro euro de plus.</p>
    </div>
  )
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add components/RevisionButton.tsx
git commit -m "feat: RevisionButton — textarea message optionnel, flow 2 étapes"
```

---

## Task 6 : AdminAutoRefresh — polling 30s

**Files:**
- Create: `components/AdminAutoRefresh.tsx`

- [ ] **Step 1 : Créer le composant**

```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AdminAutoRefresh({ intervalMs = 30_000 }: { intervalMs?: number }) {
  const router = useRouter()
  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs)
    return () => clearInterval(id)
  }, [router, intervalMs])
  return null
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add components/AdminAutoRefresh.tsx
git commit -m "feat: add AdminAutoRefresh client component (router.refresh every 30s)"
```

---

## Task 7 : Admin list — badges URGENT + RÉVISION + filtre statut + auto-refresh

**Files:**
- Modify: `app/(admin)/admin/page.tsx`

- [ ] **Step 1 : Remplacer le contenu de la page**

```tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isUrgentOrder } from '@/lib/admin-utils'
import { AdminAutoRefresh } from '@/components/AdminAutoRefresh'

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
}
const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  processing: 'En cours',
  delivered: 'Livré',
}

const TABS = [
  { value: '', label: 'Tous' },
  { value: 'pending', label: 'En attente' },
  { value: 'processing', label: 'En cours' },
  { value: 'delivered', label: 'Livré' },
]

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const { status: filterStatus } = await searchParams

  const allOrders = await db
    .select({ order: orders, userEmail: user.email, userName: user.name })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))

  const filtered = filterStatus
    ? allOrders.filter((o) => o.order.status === filterStatus)
    : allOrders

  const counts = {
    pending: allOrders.filter((o) => o.order.status === 'pending').length,
    processing: allOrders.filter((o) => o.order.status === 'processing').length,
    delivered: allOrders.filter((o) => o.order.status === 'delivered').length,
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <AdminAutoRefresh />
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Admin</h1>
          <Link href="/admin/users" className="text-sm text-zinc-500 hover:text-[#0D0D0D] underline">
            Utilisateurs →
          </Link>
        </div>

        {/* Compteurs */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
              <div className="text-4xl font-black text-[#0D0D0D]">{count}</div>
              <div className="mt-1 text-sm text-zinc-500">{STATUS_LABEL[status]}</div>
            </div>
          ))}
        </div>

        {/* Filtre par statut */}
        <div className="mt-6 flex gap-2">
          {TABS.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value ? `/admin?status=${tab.value}` : '/admin'}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                (filterStatus ?? '') === tab.value
                  ? 'bg-[#0D0D0D] text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map(({ order, userEmail, userName }) => {
                const urgent = isUrgentOrder(order)
                const hasRevision = order.revisionRequestedAt !== null
                return (
                  <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0D0D0D]">{userName}</div>
                      <div className="text-zinc-500">{userEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-700">{order.productName}</td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                        {urgent && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                            URGENT
                          </span>
                        )}
                        {hasRevision && (
                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-600">
                            RÉVISION
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-[#1A3CFF] hover:underline">
                        Gérer →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-zinc-400">
                    Aucune commande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Vérifier que les tests passent**

```bash
npm test
```

Expected : tous passent.

- [ ] **Step 4 : Commit**

```bash
git add "app/(admin)/admin/page.tsx"
git commit -m "feat: admin list — badges URGENT/RÉVISION, filtre statut, auto-refresh 30s"
```

---

## Task 8 : Admin order page — auto-processing + indicateur révision

**Files:**
- Modify: `app/(admin)/admin/orders/[orderId]/page.tsx`

- [ ] **Step 1 : Remplacer le contenu de la page**

```tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export default async function AdminOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const result = await db
    .select({ order: orders, userEmail: user.email, userName: user.name })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!result[0]) notFound()
  let { order, userEmail, userName } = result[0]

  // Auto-processing : signale au client que son CV est en cours de traitement
  if (order.status === 'pending') {
    await db
      .update(orders)
      .set({ status: 'processing', updatedAt: new Date() })
      .where(eq(orders.id, orderId))
    order = { ...order, status: 'processing' }
  }

  const originalDownloadUrl = `/api/files/${encodeURIComponent(order.cvOriginalKey)}`
  const rewrittenDownloadUrl = order.cvRewrittenKey
    ? `/api/files/${encodeURIComponent(order.cvRewrittenKey)}`
    : null

  const STATUS_COLOR: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
  }
  const STATUS_LABEL: Record<string, string> = {
    pending: 'En attente',
    processing: 'En cours',
    delivered: 'Livré',
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors">
          ← Retour
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0D0D0D]">{order.productName}</h1>
            <p className="mt-1 text-zinc-500">{userName} · {userEmail}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${STATUS_COLOR[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        {/* Indicateur révision */}
        {order.revisionRequestedAt && (
          <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-6 py-4">
            <p className="text-sm font-semibold text-orange-700">Révision demandée</p>
            {order.revisionMessage && (
              <p className="mt-1 text-sm text-orange-600">&ldquo;{order.revisionMessage}&rdquo;</p>
            )}
            <p className="mt-1 text-xs text-orange-400">
              {new Date(order.revisionRequestedAt).toLocaleString('fr-FR')}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {/* CV original */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">CV original</h2>
            <a
              href={originalDownloadUrl}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Télécharger ↓
            </a>
          </div>

          {/* Upload CV réécrit */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">CV réécrit</h2>

            {rewrittenDownloadUrl && (
              <a
                href={rewrittenDownloadUrl}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Télécharger le CV réécrit ↓
              </a>
            )}

            <form action={`/api/admin/orders/${orderId}`} method="POST" encType="multipart/form-data" className="mt-4 space-y-4">
              <input type="hidden" name="action" value="upload-rewritten" />
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  {order.revisionRequestedAt ? 'Uploader la révision' : 'Upload CV réécrit'}
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#0D0D0D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                {order.revisionRequestedAt ? 'Uploader et livrer la révision →' : 'Uploader et livrer →'}
              </button>
            </form>
          </div>

          {/* Changement de statut manuel */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">Changer le statut manuellement</h2>
            <form action={`/api/admin/orders/${orderId}`} method="POST" className="mt-4 flex gap-3">
              <input type="hidden" name="action" value="update-status" />
              <select
                name="status"
                defaultValue={order.status}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700"
              >
                <option value="pending">En attente</option>
                <option value="processing">En cours</option>
                <option value="delivered">Livré</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-[#1A3CFF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add "app/(admin)/admin/orders/[orderId]/page.tsx"
git commit -m "feat: admin order page — auto-processing on open, revision indicator with message"
```

---

## Task 9 : Admin route — clear revision flag à la livraison

**Files:**
- Modify: `app/api/admin/orders/[orderId]/route.ts`

- [ ] **Step 1 : Ajouter le clear du flag dans l'action upload-rewritten**

Remplacer le contenu de `app/api/admin/orders/[orderId]/route.ts` :

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { sendCvDeliveredEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session || (session.user as { role: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { orderId } = await params

  const order = await db.query.orders.findFirst({ where: eq(orders.id, orderId) })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const action = formData.get('action') as string
    const file = formData.get('file') as File | null

    if (action === 'upload-rewritten' && file) {
      const ext = file.name.split('.').pop() ?? 'pdf'
      const uploadUuid = order.cvOriginalKey.split('/')[1]
      const key = buildCvKey(uploadUuid, 'rewritten', ext)
      const buffer = Buffer.from(await file.arrayBuffer())
      await uploadToR2(key, buffer, file.type)

      await db
        .update(orders)
        .set({
          cvRewrittenKey: key,
          status: 'delivered',
          revisionRequestedAt: null,
          revisionMessage: null,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, orderId))

      const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
      if (customer) {
        sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
      }
    } else if (action === 'update-status') {
      const status = formData.get('status') as string
      if (!['pending', 'processing', 'delivered'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }
      await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId))

      if (status === 'delivered') {
        const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
        if (customer) {
          sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
        }
      }
    }
  }

  return NextResponse.redirect(new URL(`/admin/orders/${orderId}`, request.url))
}
```

- [ ] **Step 2 : Vérifier le type check**

```bash
npx tsc --noEmit
```

Expected : aucune erreur.

- [ ] **Step 3 : Vérifier que tous les tests passent**

```bash
npm test
```

Expected : tous passent.

- [ ] **Step 4 : Commit final**

```bash
git add "app/api/admin/orders/[orderId]/route.ts"
git commit -m "feat: clear revisionRequestedAt and revisionMessage on CV delivery"
```

---

## Vérification finale

- [ ] Démarrer l'environnement local

```bash
docker-compose -f docker-compose.dev.yaml up -d
npm run dev
```

- [ ] Tester le flow complet dans le navigateur :
  1. En tant que client : aller sur `/dashboard/{orderId}` avec une commande `delivered`, cliquer "Demander une révision", saisir un message, confirmer → vérifier la confirmation verte
  2. En tant qu'admin : aller sur `/admin` → vérifier le badge RÉVISION sur la ligne, le filtre par statut, l'auto-refresh
  3. En tant qu'admin : ouvrir la commande → vérifier auto-passage en `processing`, l'encart orange avec le message de révision
  4. En tant qu'admin : uploader un CV réécrit → vérifier que le badge RÉVISION disparaît de la liste

- [ ] Vérifier qu'ADMIN_EMAIL est configuré dans `.env.local` et que l'email de notification arrive bien dans Mailpit (`http://localhost:8025`)
