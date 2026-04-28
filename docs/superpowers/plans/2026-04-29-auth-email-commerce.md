# Auth, Email & Commerce Integration — CV Pro

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Better-auth (magic link + Google OAuth), Resend emails, Stripe Checkout, Cloudflare R2 file storage, customer dashboard, and admin back-office to CV Pro.

**Architecture:** Everything lives in the existing Next.js 16 app. Better-auth manages sessions (PostgreSQL + Redis secondary storage). Stripe Checkout creates orders via webhook. CVs are stored in R2 with signed URLs. Route protection uses Next.js 16 Proxy (`proxy.ts`, not `middleware.ts`). Schema synced via `drizzle-kit push` — never manual SQL migrations.

**Tech Stack:** better-auth@1.6.9, drizzle-orm@0.45.2, drizzle-kit@0.31.10, postgres.js, ioredis, resend@6.12.2, react-email, @react-email/components, @aws-sdk/client-s3@^3, @aws-sdk/s3-request-presigner@^3, stripe@22.1.0 (existing), vitest@^3

---

## File Map

**New files:**
| File | Purpose |
|---|---|
| `drizzle.config.ts` | Drizzle config (PostgreSQL connection) |
| `lib/db/schema.ts` | All Drizzle tables: user, session, account, verification, orders |
| `lib/db/index.ts` | postgres.js DB client singleton |
| `lib/auth.ts` | Better-auth server config (magic link + Google + Redis) |
| `lib/auth-client.ts` | Better-auth browser client |
| `lib/r2.ts` | R2 S3 client + upload / getSignedUrl / deleteFile / buildCvKey |
| `lib/email.ts` | Resend client + typed send helpers |
| `lib/order-handler.ts` | Pure function: build order from Stripe session metadata |
| `emails/magic-link.tsx` | React Email magic link template |
| `emails/order-confirmation.tsx` | React Email order confirmation template |
| `emails/cv-delivered.tsx` | React Email CV delivered template |
| `emails/account-deleted.tsx` | React Email account deletion template |
| `app/api/auth/[...all]/route.ts` | Better-auth handler (GET + POST) |
| `app/api/upload/route.ts` | POST: upload CV to R2, return key + uploadUuid |
| `app/api/checkout/route.ts` | POST: create Stripe Checkout session |
| `app/api/stripe/webhook/route.ts` | POST: handle checkout.session.completed |
| `app/api/files/[key]/route.ts` | GET: generate signed R2 URL and redirect |
| `app/api/account/route.ts` | DELETE: RGPD account deletion |
| `app/(public)/auth/login/page.tsx` | Magic link + Google login page |
| `app/(customer)/order/page.tsx` | CV upload form + initiate checkout (auth required) |
| `app/(customer)/dashboard/page.tsx` | Customer orders list |
| `app/(customer)/dashboard/[orderId]/page.tsx` | Order detail + CV download |
| `app/(admin)/admin/page.tsx` | Admin orders dashboard |
| `app/(admin)/admin/orders/[orderId]/page.tsx` | Admin order detail: status + CV upload/download |
| `app/(admin)/admin/users/page.tsx` | Admin users list |
| `proxy.ts` | Next.js 16 Proxy for route protection |
| `vitest.config.ts` | Vitest config |
| `tests/order-handler.test.ts` | Unit tests for Stripe order business logic |
| `tests/r2.test.ts` | Unit tests for R2 key helpers |

**Modified files:**
| File | Change |
|---|---|
| `package.json` | Add new dependencies |
| `.env.example` | Add all new env vars |
| `app/page.tsx` | Update CTA href to `/order` |
| `components/CTAButton.tsx` | Link to `/order` instead of Stripe direct link |

---

## Task 1: Install dependencies + set up Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install all new dependencies**

```bash
npm install better-auth drizzle-orm postgres ioredis resend react-email @react-email/components @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install -D drizzle-kit vitest @types/node
```

> **Note:** `stripe` is already in `dependencies` — do not reinstall it.

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Create Vitest config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 3: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify Vitest runs**

```bash
npm test
```

Expected output: `No test files found` (not an error, just no tests yet).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add auth/email/commerce dependencies and Vitest"
```

---

## Task 2: Drizzle schema + DB connection

**Files:**
- Create: `lib/db/schema.ts`
- Create: `lib/db/index.ts`
- Create: `drizzle.config.ts`

- [ ] **Step 1: Create Drizzle schema**

```ts
// lib/db/schema.ts
import { pgTable, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  role: text('role').notNull().default('user'), // 'user' | 'admin'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  stripeProductId: text('stripe_product_id').notNull(),
  productName: text('product_name').notNull(),
  status: text('status').notNull().default('pending'), // 'pending' | 'processing' | 'delivered'
  cvOriginalKey: text('cv_original_key').notNull(),
  cvRewrittenKey: text('cv_rewritten_key'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type Order = typeof orders.$inferSelect
export type OrderInsert = typeof orders.$inferInsert
export type User = typeof user.$inferSelect
export type OrderStatus = 'pending' | 'processing' | 'delivered'
```

- [ ] **Step 2: Create DB client**

```ts
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema })
```

- [ ] **Step 3: Create Drizzle config**

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

- [ ] **Step 4: Create .env.local entries** (do not commit the actual values)

Add to `.env.local`:
```
DATABASE_URL=postgresql://user:password@2a01:4f8:1c18:26bb::1:5432/cvpro
REDIS_URL=redis://2a01:4f8:1c18:26bb::1:6379
```

- [ ] **Step 5: Push schema to DB**

```bash
npx drizzle-kit push
```

Expected output: tables `user`, `session`, `account`, `verification`, `orders` created with no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/db/ drizzle.config.ts .env.example
git commit -m "feat: add Drizzle schema and PostgreSQL connection"
```

---

## Task 3: R2 helpers + unit tests

**Files:**
- Create: `lib/r2.ts`
- Create: `tests/r2.test.ts`

- [ ] **Step 1: Write failing tests first**

```ts
// tests/r2.test.ts
import { describe, it, expect } from 'vitest'
import { buildCvKey } from '@/lib/r2'

describe('buildCvKey', () => {
  it('builds original key with pdf extension', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'original', 'pdf')
    expect(key).toBe('cvs/user-123/uuid-456/original.pdf')
  })

  it('builds rewritten key', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'rewritten', 'docx')
    expect(key).toBe('cvs/user-123/uuid-456/rewritten.docx')
  })

  it('sanitizes extension to lowercase', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'original', 'PDF')
    expect(key).toBe('cvs/user-123/uuid-456/original.pdf')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test
```

Expected: `FAIL tests/r2.test.ts > buildCvKey > builds original key...` (import fails, buildCvKey not defined).

- [ ] **Step 3: Implement R2 helpers**

```ts
// lib/r2.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export function buildCvKey(
  userId: string,
  uploadUuid: string,
  type: 'original' | 'rewritten',
  ext: string,
): string {
  return `cvs/${userId}/${uploadUuid}/${type}.${ext.toLowerCase()}`
}

export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<void> {
  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: body,
    ContentType: contentType,
  }))
}

export async function getSignedDownloadUrl(key: string, expiresInSeconds = 900): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key }),
    { expiresIn: expiresInSeconds },
  )
}

export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
  }))
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test
```

Expected: `PASS tests/r2.test.ts` — 3 tests passing.

- [ ] **Step 5: Commit**

```bash
git add lib/r2.ts tests/r2.test.ts
git commit -m "feat: add R2 file storage helpers"
```

---

## Task 4: Order business logic + unit tests

**Files:**
- Create: `lib/order-handler.ts`
- Create: `tests/order-handler.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// tests/order-handler.test.ts
import { describe, it, expect } from 'vitest'
import { buildOrderFromStripeSession } from '@/lib/order-handler'
import type Stripe from 'stripe'

function makeSession(metadata: Record<string, string> = {}): Stripe.Checkout.Session {
  return {
    id: 'cs_test_123',
    metadata,
  } as unknown as Stripe.Checkout.Session
}

describe('buildOrderFromStripeSession', () => {
  it('returns null when metadata is missing', () => {
    expect(buildOrderFromStripeSession(makeSession({}))).toBeNull()
  })

  it('returns null when any required field is missing', () => {
    const partial = makeSession({ userId: 'u1', cvOriginalKey: 'cvs/u1/x/original.pdf' })
    expect(buildOrderFromStripeSession(partial)).toBeNull()
  })

  it('returns order insert when all metadata present', () => {
    const session = makeSession({
      userId: 'u1',
      cvOriginalKey: 'cvs/u1/uuid/original.pdf',
      productId: 'prod_abc',
      productName: 'CV Pro',
    })
    const order = buildOrderFromStripeSession(session)
    expect(order).toEqual({
      userId: 'u1',
      stripeSessionId: 'cs_test_123',
      stripeProductId: 'prod_abc',
      productName: 'CV Pro',
      status: 'pending',
      cvOriginalKey: 'cvs/u1/uuid/original.pdf',
    })
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test
```

Expected: `FAIL tests/order-handler.test.ts` (buildOrderFromStripeSession not defined).

- [ ] **Step 3: Implement order handler**

```ts
// lib/order-handler.ts
import type Stripe from 'stripe'
import type { OrderInsert } from '@/lib/db/schema'

export function buildOrderFromStripeSession(
  session: Stripe.Checkout.Session,
): Omit<OrderInsert, 'id' | 'createdAt' | 'updatedAt'> | null {
  const { userId, cvOriginalKey, productId, productName } = session.metadata ?? {}
  if (!userId || !cvOriginalKey || !productId || !productName) return null
  return {
    userId,
    stripeSessionId: session.id,
    stripeProductId: productId,
    productName,
    status: 'pending',
    cvOriginalKey,
    cvRewrittenKey: null,
  }
}
```

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: `PASS tests/r2.test.ts`, `PASS tests/order-handler.test.ts` — 6 tests total passing.

- [ ] **Step 5: Commit**

```bash
git add lib/order-handler.ts tests/order-handler.test.ts
git commit -m "feat: add order business logic with unit tests"
```

---

## Task 5: Better-auth setup

**Files:**
- Create: `lib/auth.ts`
- Create: `lib/auth-client.ts`
- Create: `app/api/auth/[...all]/route.ts`

- [ ] **Step 1: Create Better-auth server config**

```ts
// lib/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { db } from '@/lib/db'
import * as schema from '@/lib/db/schema'
import { sendMagicLinkEmail } from '@/lib/email'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  secondaryStorage: {
    get: async (key) => redis.get(key),
    set: async (key, value, ttl) => {
      if (ttl) await redis.setex(key, ttl, value)
      else await redis.set(key, value)
    },
    delete: async (key) => { await redis.del(key) },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({ to: email, magicLinkUrl: url })
      },
      expiresIn: 900, // 15 minutes
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // refresh if older than 1 day
  },
})

export type Session = typeof auth.$Infer.Session
```

- [ ] **Step 2: Create Better-auth client config**

```ts
// lib/auth-client.ts
import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  plugins: [magicLinkClient()],
})

export const { signIn, signOut, useSession } = authClient
```

- [ ] **Step 3: Create Better-auth API route handler**

```ts
// app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)
```

- [ ] **Step 4: Add env vars to .env.local**

```
BETTER_AUTH_SECRET=<generate with: openssl rand -base64 32>
BETTER_AUTH_URL=https://cvpro.lbframe.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- [ ] **Step 5: Commit**

```bash
git add lib/auth.ts lib/auth-client.ts app/api/auth/
git commit -m "feat: configure Better-auth with magic link and Google OAuth"
```

---

## Task 6: Resend email helpers + React Email templates

**Files:**
- Create: `lib/email.ts`
- Create: `emails/magic-link.tsx`
- Create: `emails/order-confirmation.tsx`
- Create: `emails/cv-delivered.tsx`
- Create: `emails/account-deleted.tsx`

- [ ] **Step 1: Create Resend client + send helpers**

```ts
// lib/email.ts
import { Resend } from 'resend'
import { MagicLinkEmail } from '@/emails/magic-link'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { CvDeliveredEmail } from '@/emails/cv-delivered'
import { AccountDeletedEmail } from '@/emails/account-deleted'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'cvpro@lbframe.com'

export async function sendMagicLinkEmail({ to, magicLinkUrl }: { to: string; magicLinkUrl: string }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Ton lien de connexion CV Pro',
    react: MagicLinkEmail({ magicLinkUrl }),
  })
}

export async function sendOrderConfirmationEmail({
  to,
  productName,
  orderId,
}: {
  to: string
  productName: string
  orderId: string
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Commande confirmée — CV Pro',
    react: OrderConfirmationEmail({ productName, orderId }),
  })
}

export async function sendCvDeliveredEmail({
  to,
  orderId,
}: {
  to: string
  orderId: string
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Ton CV réécrit est prêt — CV Pro',
    react: CvDeliveredEmail({ orderId }),
  })
}

export async function sendAccountDeletedEmail({ to }: { to: string }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Ton compte CV Pro a été supprimé',
    react: AccountDeletedEmail(),
  })
}
```

- [ ] **Step 2: Create magic link email template**

```tsx
// emails/magic-link.tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

export function MagicLinkEmail({ magicLinkUrl }: { magicLinkUrl: string }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D', marginBottom: '8px' }}>
            Connexion à CV Pro
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Clique sur le bouton ci-dessous pour te connecter. Ce lien est valable 15 minutes.
          </Text>
          <Button
            href={magicLinkUrl}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Se connecter
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            Si tu n'as pas demandé ce lien, ignore cet email. Aucune action n'est requise.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 3: Create order confirmation template**

```tsx
// emails/order-confirmation.tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

export function OrderConfirmationEmail({ productName, orderId }: { productName: string; orderId: string }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Commande confirmée !
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Merci pour ta commande <strong>{productName}</strong>. Ton CV sera réécrit et livré dans ta boîte mail sous 30 minutes.
          </Text>
          <Button
            href={`${APP_URL}/dashboard/${orderId}`}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Voir ma commande
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 4: Create CV delivered template**

```tsx
// emails/cv-delivered.tsx
import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

export function CvDeliveredEmail({ orderId }: { orderId: string }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Ton CV réécrit est prêt 🎯
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Ton CV a été réécrit par notre équipe. Tu peux maintenant le télécharger depuis ton espace client.
          </Text>
          <Button
            href={`${APP_URL}/dashboard/${orderId}`}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Télécharger mon CV
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 5: Create account deleted template**

```tsx
// emails/account-deleted.tsx
import { Html, Head, Body, Container, Heading, Text, Hr } from '@react-email/components'

export function AccountDeletedEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Compte supprimé
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Ton compte CV Pro et toutes tes données associées (fichiers, commandes) ont été supprimés conformément au RGPD. Cette action est irréversible.
          </Text>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · Si tu n'as pas demandé cette suppression, contacte-nous à cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 6: Add Resend env var and commit**

Add to `.env.local`:
```
RESEND_API_KEY=re_xxx
```

```bash
git add lib/email.ts emails/
git commit -m "feat: add Resend email helpers and React Email templates"
```

---

## Task 7: Next.js 16 Proxy (route protection)

**Files:**
- Create: `proxy.ts`

> **Note:** In Next.js 16, the file is `proxy.ts` (not `middleware.ts`). The export is `proxy` (named) or default export. Same API as old middleware.

- [ ] **Step 1: Create proxy.ts**

```ts
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken =
    request.cookies.get('better-auth.session_token')?.value ??
    request.cookies.get('__Secure-better-auth.session_token')?.value

  const isAuthed = Boolean(sessionToken)

  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/order')) && !isAuthed) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith('/admin') && !isAuthed) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/order/:path*', '/admin/:path*'],
}
```

> **Important:** The proxy only checks for session token presence (optimistic check). Full session validation happens in Server Components/Route Handlers via `auth.api.getSession()`. Admin role check happens in the page/layout, not here.

- [ ] **Step 2: Commit**

```bash
git add proxy.ts
git commit -m "feat: add Next.js 16 proxy for route protection"
```

---

## Task 8: Auth login page

**Files:**
- Create: `app/(public)/auth/login/page.tsx`

- [ ] **Step 1: Create login page**

```tsx
// app/(public)/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await authClient.signIn.magicLink({ email, callbackURL: redirect })
    setLoading(false)
    if (error) {
      setError(error.message ?? 'Une erreur est survenue.')
    } else {
      setSent(true)
    }
  }

  async function handleGoogle() {
    await authClient.signIn.social({ provider: 'google', callbackURL: redirect })
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Vérifie ta boîte mail</div>
          <p className="mt-4 text-zinc-500">
            Un lien de connexion a été envoyé à <strong>{email}</strong>. Valable 15 minutes.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
      <div className="w-full max-w-sm">
        <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Connexion</div>
        <p className="mt-2 text-zinc-500">Accède à ton espace CV Pro</p>

        <form onSubmit={handleMagicLink} className="mt-8 space-y-4">
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[#0D0D0D] outline-none focus:border-[#1A3CFF] focus:ring-2 focus:ring-[#1A3CFF]/20"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0D0D0D] py-3 font-semibold text-white disabled:opacity-50 hover:bg-zinc-800 transition-colors"
          >
            {loading ? 'Envoi...' : 'Recevoir un lien de connexion'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-sm text-zinc-400">ou</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <button
          onClick={handleGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white py-3 font-medium text-[#0D0D0D] hover:bg-zinc-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
          Continuer avec Google
        </button>

        <p className="mt-8 text-center text-xs text-zinc-400">
          En continuant, tu acceptes notre{' '}
          <a href="/confidentialite" className="underline">politique de confidentialité</a>.
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/
git commit -m "feat: add magic link + Google OAuth login page"
```

---

## Task 9: CV upload API

**Files:**
- Create: `app/api/upload/route.ts`

- [ ] **Step 1: Create upload route**

```ts
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Invalid file type. Only PDF and Word files accepted.' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 400 })

  const ext = file.name.split('.').pop() ?? 'pdf'
  const uploadUuid = randomUUID()
  const key = buildCvKey(session.user.id, uploadUuid, 'original', ext)

  const buffer = Buffer.from(await file.arrayBuffer())
  await uploadToR2(key, buffer, file.type)

  return NextResponse.json({ key, uploadUuid })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/upload/
git commit -m "feat: add CV upload API endpoint"
```

---

## Task 10: Stripe Checkout API

**Files:**
- Create: `app/api/checkout/route.ts`

- [ ] **Step 1: Add Stripe env vars to .env.local**

```
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

- [ ] **Step 2: Create Stripe Checkout route**

```ts
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { priceId, cvOriginalKey, uploadUuid } = await request.json() as {
    priceId: string
    cvOriginalKey: string
    uploadUuid: string
  }

  if (!priceId || !cvOriginalKey || !uploadUuid) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Retrieve product info from Stripe price
  const price = await stripe.prices.retrieve(priceId, { expand: ['product'] })
  const product = price.product as Stripe.Product
  const productName = product.name

  const appUrl = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      userId: session.user.id,
      cvOriginalKey,
      productId: product.id,
      productName,
    },
    customer_email: session.user.email,
    success_url: `${appUrl}/dashboard?success=1`,
    cancel_url: `${appUrl}/order?cancelled=1`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/checkout/
git commit -m "feat: add Stripe Checkout session creation endpoint"
```

---

## Task 11: Stripe webhook handler

**Files:**
- Create: `app/api/stripe/webhook/route.ts`

- [ ] **Step 1: Create webhook handler**

```ts
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { buildOrderFromStripeSession } from '@/lib/order-handler'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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

    // Idempotency: skip if order already exists
    const existing = await db.query.orders.findFirst({
      where: eq(orders.stripeSessionId, session.id),
    })
    if (existing) return NextResponse.json({ received: true })

    const orderData = buildOrderFromStripeSession(session)
    if (!orderData) {
      console.error('Missing metadata in Stripe session', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const [order] = await db.insert(orders).values(orderData).returning()

    // Send confirmation email (fire-and-forget, don't block webhook response)
    sendOrderConfirmationEmail({
      to: session.customer_email!,
      productName: orderData.productName,
      orderId: order.id,
    }).catch(console.error)
  }

  return NextResponse.json({ received: true })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/stripe/
git commit -m "feat: add Stripe webhook handler with idempotent order creation"
```

---

## Task 12: R2 signed URL proxy

**Files:**
- Create: `app/api/files/[key]/route.ts`

- [ ] **Step 1: Create files proxy**

The URL param `key` is URL-encoded since it contains slashes. Use `decodeURIComponent`.

```ts
// app/api/files/[key]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { getSignedDownloadUrl } from '@/lib/r2'
import { eq, or } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key: encodedKey } = await params
  const key = decodeURIComponent(encodedKey)

  const isAdmin = (session.user as { role: string }).role === 'admin'

  if (!isAdmin) {
    // Verify the user owns a file with this key
    const order = await db.query.orders.findFirst({
      where: or(
        eq(orders.cvOriginalKey, key),
        eq(orders.cvRewrittenKey, key),
      ),
    })
    if (!order || order.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // Clients can only download rewritten CVs
    if (order.cvOriginalKey === key && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const signedUrl = await getSignedDownloadUrl(key, 900)
  return NextResponse.redirect(signedUrl)
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/files/
git commit -m "feat: add R2 signed URL proxy with ownership check"
```

---

## Task 13: Order page (customer — upload CV + initiate checkout)

**Files:**
- Create: `app/(customer)/order/page.tsx`

- [ ] **Step 1: Create order page**

```tsx
// app/(customer)/order/page.tsx
'use client'

import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Default price ID — override via query param for multiple products
const DEFAULT_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? ''

export default function OrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const priceId = searchParams.get('priceId') ?? DEFAULT_PRICE_ID

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError('')

    try {
      // 1. Upload CV to R2
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) {
        const { error } = await uploadRes.json()
        throw new Error(error ?? 'Erreur lors de l\'upload.')
      }
      const { key: cvOriginalKey, uploadUuid } = await uploadRes.json()

      // 2. Create Stripe Checkout session
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, cvOriginalKey, uploadUuid }),
      })
      if (!checkoutRes.ok) throw new Error('Erreur lors de la création du paiement.')
      const { url } = await checkoutRes.json()

      // 3. Redirect to Stripe Checkout
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-4xl font-black tracking-tight text-[#0D0D0D]">Envoie ton CV</div>
        <p className="mt-2 text-zinc-500">
          PDF ou Word · Réécrit en 30 min · Livré dans ta boîte mail
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div
            onClick={() => inputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-10 text-center hover:border-[#1A3CFF] hover:bg-blue-50/30 transition-colors"
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            {file ? (
              <p className="font-semibold text-[#0D0D0D]">{file.name}</p>
            ) : (
              <>
                <p className="font-semibold text-zinc-700">Clique pour sélectionner ton CV</p>
                <p className="mt-1 text-sm text-zinc-400">PDF, DOC, DOCX · Max 10 Mo</p>
              </>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full rounded-xl bg-[#1A3CFF] py-4 font-bold text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Chargement...' : 'Payer 12€ et commander →'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Paiement sécurisé Stripe · Sans abonnement
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add NEXT_PUBLIC_STRIPE_PRICE_ID to .env.local**

```
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxx
```

- [ ] **Step 3: Update CTAButton to link to /order**

```tsx
// components/CTAButton.tsx — replace the existing Stripe link with /order
'use client'

import { useRouter } from 'next/navigation'

interface CTAButtonProps {
  dark?: boolean
  location: string
}

export function CTAButton({ dark = false, location }: CTAButtonProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).posthog) {
          (window as any).posthog.capture('cta_clicked', { location })
        }
        router.push('/order')
      }}
      className={
        dark
          ? 'inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors'
          : 'inline-flex items-center gap-2 rounded-full bg-[#1A3CFF] px-8 py-4 text-lg font-bold text-white hover:bg-blue-700 transition-colors'
      }
    >
      Commander — 12€
      <span aria-hidden>→</span>
    </button>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/ components/CTAButton.tsx
git commit -m "feat: add order page with CV upload + Stripe Checkout flow"
```

---

## Task 14: Customer dashboard

**Files:**
- Create: `components/DeleteAccountButton.tsx`
- Create: `app/(customer)/dashboard/page.tsx`
- Create: `app/(customer)/dashboard/[orderId]/page.tsx`

- [ ] **Step 1: Create DeleteAccountButton client component**

The dashboard is a Server Component and cannot have `onClick` handlers. Extract the delete button into a client component.

```tsx
// components/DeleteAccountButton.tsx
'use client'

export function DeleteAccountButton() {
  async function handleDelete() {
    if (!confirm('Supprimer définitivement ton compte et toutes tes données ? Cette action est irréversible.')) return
    await fetch('/api/account', { method: 'DELETE' })
    window.location.href = '/?deleted=1'
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-zinc-400 hover:text-red-500 underline transition-colors"
    >
      Supprimer mon compte (RGPD)
    </button>
  )
}
```

- [ ] **Step 3: Create dashboard orders list page**

```tsx
// app/(customer)/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DeleteAccountButton } from '@/components/DeleteAccountButton'

const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  processing: 'En cours',
  delivered: 'Livré',
}

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/auth/login')

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
    orderBy: desc(orders.createdAt),
  })

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Mes commandes</h1>
          <Link
            href="/order"
            className="rounded-full bg-[#1A3CFF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Nouvelle commande
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-10 text-center">
            <p className="text-zinc-500">Aucune commande pour l'instant.</p>
            <Link href="/order" className="mt-4 inline-block font-semibold text-[#1A3CFF] hover:underline">
              Commander maintenant →
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {userOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/${order.id}`}
                className="block rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">{order.productName}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Create order detail page**

```tsx
// app/(customer)/dashboard/[orderId]/page.tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/auth/login')

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
  })
  if (!order) notFound()

  const cvKey = order.cvRewrittenKey
  const downloadUrl = cvKey ? `/api/files/${encodeURIComponent(cvKey)}` : null

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors">
          ← Retour
        </Link>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-[#0D0D0D]">{order.productName}</h1>
        <p className="mt-1 text-zinc-500">
          Commande du{' '}
          {new Date(order.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8">
          {order.status === 'delivered' && downloadUrl ? (
            <>
              <p className="text-lg font-semibold text-green-600">Ton CV réécrit est prêt !</p>
              <p className="mt-2 text-zinc-500">Télécharge-le et commence à postuler.</p>
              <a
                href={downloadUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1A3CFF] px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Télécharger mon CV →
              </a>
            </>
          ) : order.status === 'processing' ? (
            <>
              <p className="text-lg font-semibold text-[#0D0D0D]">Ton CV est en cours de réécriture</p>
              <p className="mt-2 text-zinc-500">Tu recevras un email dès qu'il sera prêt.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-[#0D0D0D]">Commande reçue</p>
              <p className="mt-2 text-zinc-500">Ton CV va être pris en charge très prochainement.</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/DeleteAccountButton.tsx app/\(customer\)/
git commit -m "feat: add customer dashboard with orders list and order detail"
```

---

## Task 15: Admin back-office

**Files:**
- Create: `app/(admin)/admin/page.tsx`
- Create: `app/(admin)/admin/orders/[orderId]/page.tsx`
- Create: `app/(admin)/admin/users/page.tsx`
- Create: `app/api/admin/orders/[orderId]/route.ts`

- [ ] **Step 1: Create admin orders dashboard**

```tsx
// app/(admin)/admin/page.tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const allOrders = await db
    .select({ order: orders, userEmail: user.email, userName: user.name })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))

  const counts = {
    pending: allOrders.filter((o) => o.order.status === 'pending').length,
    processing: allOrders.filter((o) => o.order.status === 'processing').length,
    delivered: allOrders.filter((o) => o.order.status === 'delivered').length,
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Admin</h1>
          <Link href="/admin/users" className="text-sm text-zinc-500 hover:text-[#0D0D0D] underline">
            Utilisateurs →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
              <div className="text-4xl font-black text-[#0D0D0D]">{count}</div>
              <div className="mt-1 text-sm text-zinc-500">{STATUS_LABEL[status]}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
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
              {allOrders.map(({ order, userEmail, userName }) => (
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
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                      {STATUS_LABEL[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-[#1A3CFF] hover:underline">
                      Gérer →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create admin order management page**

```tsx
// app/(admin)/admin/orders/[orderId]/page.tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
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
  const { order, userEmail, userName } = result[0]

  const originalDownloadUrl = `/api/files/${encodeURIComponent(order.cvOriginalKey)}`
  const rewrittenDownloadUrl = order.cvRewrittenKey
    ? `/api/files/${encodeURIComponent(order.cvRewrittenKey)}`
    : null

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors">
          ← Retour
        </Link>

        <h1 className="mt-6 text-2xl font-black text-[#0D0D0D]">{order.productName}</h1>
        <p className="mt-1 text-zinc-500">{userName} · {userEmail}</p>

        <div className="mt-8 space-y-4">
          {/* Download original CV */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">CV original</h2>
            <a
              href={originalDownloadUrl}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Télécharger ↓
            </a>
          </div>

          {/* Upload rewritten CV + change status */}
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
                <label className="text-sm font-medium text-zinc-700">Upload CV réécrit</label>
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
                Uploader et livrer →
              </button>
            </form>
          </div>

          {/* Status selector */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">Statut actuel : <span className="text-[#1A3CFF]">{order.status}</span></h2>
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

- [ ] **Step 3: Create admin API route (status update + CV upload)**

```ts
// app/api/admin/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { sendCvDeliveredEmail } from '@/lib/email'
import { randomUUID } from 'crypto'

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
      const uploadUuid = order.cvOriginalKey.split('/')[2] // reuse same uuid folder
      const key = buildCvKey(order.userId, uploadUuid, 'rewritten', ext)
      const buffer = Buffer.from(await file.arrayBuffer())
      await uploadToR2(key, buffer, file.type)

      await db
        .update(orders)
        .set({ cvRewrittenKey: key, status: 'delivered', updatedAt: new Date() })
        .where(eq(orders.id, orderId))

      // Send delivered email
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

- [ ] **Step 4: Create admin users page**

```tsx
// app/(admin)/admin/users/page.tsx
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user, orders } from '@/lib/db/schema'
import { eq, desc, count } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      orderCount: count(orders.id),
    })
    .from(user)
    .leftJoin(orders, eq(orders.userId, user.id))
    .groupBy(user.id)
    .orderBy(desc(user.createdAt))

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Utilisateurs</h1>
          <Link href="/admin" className="text-sm text-zinc-500 hover:text-[#0D0D0D] underline">
            ← Commandes
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Commandes</th>
                <th className="px-6 py-4">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#0D0D0D]">{u.name}</div>
                    <div className="text-zinc-500">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-zinc-100 text-zinc-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#0D0D0D]">{u.orderCount}</td>
                  <td className="px-6 py-4 text-zinc-500">
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add app/\(admin\)/ app/api/admin/
git commit -m "feat: add admin back-office (orders dashboard, order management, users)"
```

---

## Task 16: Account deletion (RGPD)

**Files:**
- Create: `app/api/account/route.ts`

- [ ] **Step 1: Create account deletion endpoint**

```ts
// app/api/account/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { deleteFromR2 } from '@/lib/r2'
import { sendAccountDeletedEmail } from '@/lib/email'

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = session.user.id
  const userEmail = session.user.email

  // Delete all R2 files for this user
  const userOrders = await db.query.orders.findMany({ where: eq(orders.userId, userId) })
  await Promise.allSettled(
    userOrders.flatMap((order) => {
      const keys = [order.cvOriginalKey, order.cvRewrittenKey].filter(Boolean) as string[]
      return keys.map((key) => deleteFromR2(key))
    }),
  )

  // Delete user from DB (cascade deletes sessions, accounts, orders)
  await db.delete(user).where(eq(user.id, userId))

  // Sign out session
  await auth.api.signOut({ headers: request.headers })

  // Send confirmation email (fire-and-forget)
  sendAccountDeletedEmail({ to: userEmail }).catch(console.error)

  return NextResponse.redirect(new URL('/?deleted=1', request.url))
}

// Support HTML form POST with _method=DELETE workaround
export async function POST(request: NextRequest) {
  return DELETE(request)
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/account/
git commit -m "feat: add RGPD account deletion endpoint with R2 cleanup"
```

---

## Task 17: Update .env.example + R2 env vars

**Files:**
- Modify: `.env.example`

- [ ] **Step 1: Update .env.example with all required vars**

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/cvpro

# Redis
REDIS_URL=redis://host:6379

# Better-auth
BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=https://cvpro.lbframe.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (console.cloud.google.com)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend
RESEND_API_KEY=re_xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxx

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=cvpro-files
```

- [ ] **Step 2: Commit**

```bash
git add .env.example
git commit -m "chore: update .env.example with all required environment variables"
```

---

## Task 18: Run full test suite + final verification

- [ ] **Step 1: Run all tests**

```bash
npm test
```

Expected: `PASS tests/r2.test.ts` (3 tests), `PASS tests/order-handler.test.ts` (3 tests) — 6 tests total, no failures.

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Dev server smoke test**

```bash
npm run dev
```

Visit:
- `http://localhost:3000` — landing page loads, CTA button links to `/order`
- `http://localhost:3000/order` — redirects to `/auth/login?redirect=/order` (not logged in)
- `http://localhost:3000/auth/login` — login page loads, both magic link form and Google button visible
- `http://localhost:3000/admin` — redirects to `/auth/login`

- [ ] **Step 4: Push schema to DB one final time**

```bash
npx drizzle-kit push
```

Expected: "No changes detected" or schema synced — no manual SQL.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete auth/email/commerce integration (Better-auth, Resend, Stripe, R2)"
```
