# Phase 1b — Ebook Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the ebook "L'Agent IA Emploi" (9€) into cv-pro — Stripe checkout, instant delivery by email with a secure download token, and landing page `/agent-ia-emploi`.

**Architecture:** The ebook checkout uses a dedicated `/api/checkout/ebook` route that creates a Stripe session without needing a file upload. The webhook detects ebook purchases via `productType: 'ebook'` in Stripe metadata and handles them separately: creates an `ebook_purchases` record, generates a HMAC-SHA256 download token, and sends the delivery email. The download URL points to the pre-deployed Cloudflare Worker at `https://ebooks.lbframe.com/download?token=...`.

**Tech Stack:** Next.js App Router, Drizzle ORM + drizzle-kit push, Stripe webhooks, HMAC-SHA256 (Node.js crypto), React Email + Resend/mailpit, Cloudflare Worker (pre-deployed separately)

**Environment variables already set:**
- `EBOOK_PRICE_ID=price_1TRUX9LRPHGhew1YdVasrWI7`
- `EBOOK_TOKEN_SECRET=f84d7616d82600648340d8695177672143e6eeed9311eb8ab0c675645d36b835`
- `EBOOK_DOWNLOAD_BASE_URL=https://ebooks.lbframe.com/download`
- `NEXT_PUBLIC_EBOOK_PRICE_ID` — not yet set, add with same value as `EBOOK_PRICE_ID`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `lib/db/schema.ts` | Modify | Add `ebook_purchases` table |
| `lib/ebook-token.ts` | Create | Generate HMAC-SHA256 download tokens |
| `tests/ebook-token.test.ts` | Create | Tests for token generation |
| `emails/ebook-delivered.tsx` | Create | Ebook delivery email template |
| `lib/email.ts` | Modify | Add `sendEbookDeliveredEmail` |
| `app/api/stripe/webhook/route.ts` | Modify | Handle ebook purchases |
| `app/api/checkout/ebook/route.ts` | Create | Ebook-specific checkout (no file upload) |
| `app/(public)/agent-ia-emploi/page.tsx` | Create | Ebook landing page with CTA |
| `.env.local` | Modify | Add `NEXT_PUBLIC_EBOOK_PRICE_ID` |

---

### Task 1: Schema — add ebook_purchases table

**Files:**
- Modify: `lib/db/schema.ts`

- [ ] **Step 1: Add the ebook_purchases table to schema.ts**

```typescript
// In lib/db/schema.ts, after the orders table, add:
export const ebookPurchases = pgTable('ebook_purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type EbookPurchase = typeof ebookPurchases.$inferSelect
```

- [ ] **Step 2: Run drizzle-kit push (NEVER manual SQL)**

```bash
pnpm drizzle-kit push
```

Expected: "Changes applied" or "No changes" if already exists. If it asks "Are you sure?", type `y`.

- [ ] **Step 3: Commit**

```bash
git add lib/db/schema.ts
git commit -m "feat: add ebook_purchases table to schema"
```

---

### Task 2: ebook-token lib + tests (TDD)

**Files:**
- Create: `lib/ebook-token.ts`
- Create: `tests/ebook-token.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/ebook-token.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { generateEbookToken, EBOOK_TOKEN_EXPIRY_MS } from '../lib/ebook-token'

// Use a test secret so tests don't need env
const TEST_SECRET = 'test-secret-32-bytes-long-enough!'

describe('generateEbookToken', () => {
  it('returns a string with one dot separator', () => {
    const token = generateEbookToken('test@example.com', TEST_SECRET)
    const parts = token.split('.')
    // base64 may have dots so we check there are at least 2 parts
    expect(parts.length).toBeGreaterThanOrEqual(2)
  })

  it('payload decodes to correct email and future expiry', () => {
    const before = Date.now()
    const token = generateEbookToken('user@test.com', TEST_SECRET)
    const dotIndex = token.lastIndexOf('.')
    const payloadB64 = token.slice(0, dotIndex)
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf-8'))
    expect(payload.email).toBe('user@test.com')
    expect(payload.exp).toBeGreaterThan(before)
    expect(payload.exp).toBeLessThanOrEqual(before + EBOOK_TOKEN_EXPIRY_MS + 1000)
  })

  it('produces different tokens for different emails', () => {
    const t1 = generateEbookToken('a@a.com', TEST_SECRET)
    const t2 = generateEbookToken('b@b.com', TEST_SECRET)
    expect(t1).not.toBe(t2)
  })

  it('produces different tokens on successive calls (exp differs)', () => {
    const t1 = generateEbookToken('a@a.com', TEST_SECRET)
    const t2 = generateEbookToken('a@a.com', TEST_SECRET)
    // exp is Date.now() so successive calls within same ms may match — just check format
    const dotIndex = t1.lastIndexOf('.')
    expect(dotIndex).toBeGreaterThan(0)
    expect(t1.slice(dotIndex + 1).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test tests/ebook-token.test.ts
```

Expected: FAIL — "Cannot find module '../lib/ebook-token'"

- [ ] **Step 3: Create lib/ebook-token.ts**

```typescript
import { createHmac } from 'crypto'

export const EBOOK_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

export function generateEbookToken(email: string, secret?: string): string {
  const tokenSecret = secret ?? process.env.EBOOK_TOKEN_SECRET!
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + EBOOK_TOKEN_EXPIRY_MS }),
  ).toString('base64')
  const sig = createHmac('sha256', tokenSecret).update(payload).digest('base64')
  return `${payload}.${sig}`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm test tests/ebook-token.test.ts
```

Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/ebook-token.ts tests/ebook-token.test.ts
git commit -m "feat: add ebook token generation with HMAC-SHA256"
```

---

### Task 3: Ebook delivery email template

**Files:**
- Create: `emails/ebook-delivered.tsx`
- Modify: `lib/email.ts`

- [ ] **Step 1: Create emails/ebook-delivered.tsx**

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Section
} from '@react-email/components'

interface EbookDeliveredEmailProps {
  downloadUrl: string
}

export function EbookDeliveredEmail({ downloadUrl }: EbookDeliveredEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '24px', fontWeight: '900', margin: '0 0 8px' }}>
            Ton guide est prêt 🎯
          </Heading>
          <Text style={{ color: '#71717a', fontSize: '15px', margin: '0 0 24px' }}>
            50 prompts pour piloter ta recherche d'emploi avec l'IA — disponibles maintenant.
          </Text>

          <Section style={{ marginBottom: '32px' }}>
            <Button
              href={downloadUrl}
              style={{
                backgroundColor: '#1A3CFF',
                borderRadius: '10px',
                color: '#ffffff',
                display: 'inline-block',
                fontSize: '15px',
                fontWeight: '700',
                padding: '14px 28px',
                textDecoration: 'none',
              }}
            >
              Télécharger L'Agent IA Emploi →
            </Button>
          </Section>

          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />

          <Text style={{ color: '#71717a', fontSize: '13px', margin: '0 0 8px' }}>
            Ce lien est valable <strong>7 jours</strong>. Pense à sauvegarder le PDF.
          </Text>
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: '0' }}>
            Un service LB FRAME · <a href="mailto:commande@lbframe.com" style={{ color: '#a1a1aa' }}>commande@lbframe.com</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 2: Add sendEbookDeliveredEmail to lib/email.ts**

Add after the existing functions:

```typescript
import { EbookDeliveredEmail } from '@/emails/ebook-delivered'

export async function sendEbookDeliveredEmail({
  to,
  downloadUrl,
}: {
  to: string
  downloadUrl: string
}) {
  await sendEmail({
    to,
    subject: 'L'Agent IA Emploi — Ton guide est prêt',
    react: EbookDeliveredEmail({ downloadUrl }),
  })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add emails/ebook-delivered.tsx lib/email.ts
git commit -m "feat: add ebook delivery email template"
```

---

### Task 4: Ebook checkout route

**Files:**
- Create: `app/api/checkout/ebook/route.ts`
- Modify: `.env.local` — add `NEXT_PUBLIC_EBOOK_PRICE_ID=price_1TRUX9LRPHGhew1YdVasrWI7`

- [ ] **Step 1: Add NEXT_PUBLIC_EBOOK_PRICE_ID to .env.local**

Add to `.env.local`:
```
NEXT_PUBLIC_EBOOK_PRICE_ID=price_1TRUX9LRPHGhew1YdVasrWI7
```

- [ ] **Step 2: Create app/api/checkout/ebook/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const { email } = await request.json() as { email: string }

  if (!email) {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  const priceId = process.env.EBOOK_PRICE_ID!
  const price = await stripe.prices.retrieve(priceId, { expand: ['product'] })
  const product = price.product as Stripe.Product

  const appUrl = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      email,
      productId: product.id,
      productName: product.name,
      productType: 'ebook',
    },
    customer_email: email,
    success_url: `${appUrl}/agent-ia-emploi/merci`,
    cancel_url: `${appUrl}/agent-ia-emploi?cancelled=1`,
  })

  return NextResponse.json({ url: session.url })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/api/checkout/ebook/route.ts
git commit -m "feat: add ebook checkout API route"
```

---

### Task 5: Update webhook to handle ebook purchases

**Files:**
- Modify: `app/api/stripe/webhook/route.ts`

The current webhook handles CV purchases. We need to detect ebook purchases (via `productType: 'ebook'` in metadata) and route to separate logic: create `ebook_purchases` record, generate token, send delivery email.

- [ ] **Step 1: Update the webhook route**

Replace the full `app/api/stripe/webhook/route.ts` content with:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { orders, user, ebookPurchases } from '@/lib/db/schema'
import { sendOrderConfirmationEmail, sendEbookDeliveredEmail } from '@/lib/email'
import { generateEbookToken } from '@/lib/ebook-token'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import Redis from 'ioredis'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function findOrCreateUser(email: string): Promise<string> {
  const existing = await db.query.user.findFirst({ where: eq(user.email, email) })
  if (existing) return existing.id

  const id = randomUUID()
  await db.insert(user).values({
    id,
    email,
    name: email.split('@')[0],
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return id
}

async function createMagicLinkUrl(email: string): Promise<string> {
  const redis = new Redis(process.env.REDIS_URL!)
  const token = randomUUID().replace(/-/g, '')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const now = new Date().toISOString()

  await redis.setex(
    `verification:${token}`,
    7 * 24 * 60 * 60,
    JSON.stringify({
      createdAt: now,
      updatedAt: now,
      identifier: token,
      value: JSON.stringify({ email, attempt: 0 }),
      expiresAt: expiresAt.toISOString(),
    }),
  )
  await redis.quit()

  const appUrl = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'
  return `${appUrl}/api/auth/magic-link/verify?token=${token}&callbackURL=%2Fdashboard`
}

async function handleCvPurchase(session: Stripe.Checkout.Session) {
  const existing = await db.query.orders.findFirst({
    where: eq(orders.stripeSessionId, session.id),
  })
  if (existing) return

  const { email, cvOriginalKey, productId, productName } = session.metadata ?? {}
  const resolvedEmail = email ?? session.customer_email

  if (!resolvedEmail || !cvOriginalKey || !productId || !productName) {
    console.error('CV purchase: missing metadata', session.id)
    return
  }

  const userId = await findOrCreateUser(resolvedEmail)

  const [order] = await db.insert(orders).values({
    userId,
    stripeSessionId: session.id,
    stripeProductId: productId,
    productName,
    status: 'pending',
    cvOriginalKey,
    cvRewrittenKey: null,
  }).returning()

  const magicLinkUrl = await createMagicLinkUrl(resolvedEmail)

  sendOrderConfirmationEmail({
    to: resolvedEmail,
    productName,
    orderId: order.id,
    magicLinkUrl,
  }).catch(console.error)
}

async function handleEbookPurchase(session: Stripe.Checkout.Session) {
  const existing = await db.query.ebookPurchases.findFirst({
    where: eq(ebookPurchases.stripeSessionId, session.id),
  })
  if (existing) return

  const { email, productName } = session.metadata ?? {}
  const resolvedEmail = email ?? session.customer_email

  if (!resolvedEmail) {
    console.error('Ebook purchase: missing email', session.id)
    return
  }

  await db.insert(ebookPurchases).values({
    email: resolvedEmail,
    stripeSessionId: session.id,
  })

  const token = generateEbookToken(resolvedEmail)
  const downloadUrl = `${process.env.EBOOK_DOWNLOAD_BASE_URL}?token=${token}`

  sendEbookDeliveredEmail({
    to: resolvedEmail,
    downloadUrl,
  }).catch(console.error)
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const productType = session.metadata?.productType

    if (productType === 'ebook') {
      await handleEbookPurchase(session)
    } else {
      await handleCvPurchase(session)
    }
  }

  return NextResponse.json({ received: true })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Run all tests**

```bash
pnpm test
```

Expected: 17+ tests pass

- [ ] **Step 4: Commit**

```bash
git add app/api/stripe/webhook/route.ts
git commit -m "feat: handle ebook purchases in Stripe webhook"
```

---

### Task 6: Landing page /agent-ia-emploi

**Files:**
- Create: `app/(public)/agent-ia-emploi/page.tsx`
- Create: `app/(public)/agent-ia-emploi/merci/page.tsx`

Check if `(public)` route group exists. If not, create pages in `app/agent-ia-emploi/` directly.

- [ ] **Step 1: Check where to create the landing page**

```bash
ls app/
ls app/(public)/ 2>/dev/null || echo "No (public) group"
```

Look at how the current routes are structured. The login page is at `app/(public)/auth/login/page.tsx`. Create the ebook page under `app/(public)/`.

- [ ] **Step 2: Create app/(public)/agent-ia-emploi/page.tsx**

The page must:
- Be a 'use client' component
- Have an email input + "Acheter pour 9€" button
- On submit, call `POST /api/checkout/ebook` with the email
- Redirect to Stripe checkout URL
- Support `?cancelled=1` query param to show a cancellation message
- Match the dark design of the rest of the site (bg-[#0D0D0D] with blue accents)

```tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function AgentIaEmploiInner() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const cancelled = searchParams.get('cancelled') === '1'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout/ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Erreur lors du paiement.')
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.25),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-lg">
        {cancelled && (
          <div className="mb-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-4 text-center text-sm text-yellow-400">
            Paiement annulé. Tu peux réessayer quand tu veux.
          </div>
        )}

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-[#1A3CFF]/30 bg-[#1A3CFF]/10 px-4 py-1.5 text-xs font-semibold text-[#6B8AFF] tracking-wide uppercase">
            50 prompts copier-coller
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-center text-4xl font-black tracking-[-0.04em] md:text-5xl">
          L'Agent IA Emploi
        </h1>
        <p className="mb-10 text-center text-lg text-zinc-400">
          CV, lettre de motivation, préparation entretien, suivi candidatures — 
          tout ce qu'il te faut pour trouver un job avec l'IA.
        </p>

        {/* Value props */}
        <div className="mb-8 space-y-2">
          {[
            '50 prompts prêts à l'emploi — zéro effort de rédaction',
            'Couvre tout le parcours : du CV à l'offre signée',
            'Compatible ChatGPT, Claude, Gemini, Grok',
            'Livraison instantanée par email, PDF à garder',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-zinc-400">
              <svg className="mt-0.5 shrink-0 text-[#1A3CFF]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>

        {/* CTA form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-600 focus:border-[#1A3CFF]/50 focus:outline-none focus:ring-2 focus:ring-[#1A3CFF]/20"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full rounded-xl bg-[#1A3CFF] py-4 text-base font-bold text-white hover:bg-blue-600 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Redirection...' : 'Obtenir le guide pour 9€ →'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-600">
          Paiement sécurisé Stripe · PDF envoyé instantanément · Aucun abonnement
        </p>
      </div>
    </main>
  )
}

export default function AgentIaEmploiPage() {
  return (
    <Suspense>
      <AgentIaEmploiInner />
    </Suspense>
  )
}
```

- [ ] **Step 3: Create the "merci" page after ebook purchase**

Create `app/(public)/agent-ia-emploi/merci/page.tsx`:

```tsx
export const metadata = { title: "Guide commandé — L'Agent IA Emploi" }

export default function EbookMerciPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-24 font-[family-name:var(--font-geist)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,60,255,.2),transparent_50%)]" />
      <div className="relative mx-auto w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A3CFF]/10 ring-1 ring-[#1A3CFF]/25">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A3CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-[-0.04em]">
          Guide en route !
        </h1>
        <p className="text-lg text-zinc-400">
          Vérifie ta boîte mail — le lien de téléchargement arrive dans quelques secondes.
        </p>
        <p className="mt-6 text-sm text-zinc-600">
          Le lien est valable 7 jours. Pense à sauvegarder le PDF.
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles and server renders correctly**

```bash
pnpm tsc --noEmit
curl -s http://localhost:3000/agent-ia-emploi > /dev/null && echo "OK" || echo "ERREUR"
curl -s http://localhost:3000/agent-ia-emploi/merci > /dev/null && echo "OK" || echo "ERREUR"
```

Expected: no TypeScript errors, both pages return 200

- [ ] **Step 5: Commit**

```bash
git add app/
git commit -m "feat: add /agent-ia-emploi landing page and thank you page"
```

---

### Task 7: Add NEXT_PUBLIC_EBOOK_PRICE_ID to .env.local

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Add the env var**

In `.env.local`, in the `# Ebook delivery` section, add:
```
NEXT_PUBLIC_EBOOK_PRICE_ID=price_1TRUX9LRPHGhew1YdVasrWI7
```

Note: this env var isn't actually used client-side (the checkout is server-side), but it's good to have for potential future use. The actual price ID used in the checkout route comes from `EBOOK_PRICE_ID` (server-side).

- [ ] **Step 2: Restart dev server to pick up new env vars**

```bash
pkill -f "next dev" 2>/dev/null
nohup pnpm dev > /tmp/nextjs.log 2>&1 &
sleep 5 && tail -5 /tmp/nextjs.log
```

Expected: "Ready in Xms"

- [ ] **Step 3: Run full test suite**

```bash
pnpm test
```

Expected: all tests pass

- [ ] **Step 4: Commit (env file is gitignored, nothing to commit)**

No commit needed for .env.local — it's gitignored.

---

### Final verification

After all tasks:

```bash
# TypeScript
pnpm tsc --noEmit

# Tests
pnpm test

# Pages respond
curl -s http://localhost:3000/agent-ia-emploi > /dev/null && echo "Landing OK"
curl -s http://localhost:3000/agent-ia-emploi/merci > /dev/null && echo "Merci OK"

# Check server logs for errors
tail -20 /tmp/nextjs.log
```
