# Phase 2 — Email Sequences Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development or superpowers:executing-plans

**Goal:** Implement delayed email sequences — 3 emails post-CV-delivery (J+1, J+2, J+4) and 5 emails post-ebook-purchase (J+1, J+2, J+4, J+7, J+10) — using a DB-backed queue and a cron route.

**Architecture:** An `email_queue` table stores scheduled emails. When a CV is delivered or an ebook is purchased, emails are enqueued with future `send_at` timestamps. A `/api/cron/emails` route runs on a schedule (Vercel Cron in prod, manual call in dev) and processes any pending items. Email rendering is handled by React Email templates.

**Tech Stack:** Drizzle ORM + drizzle-kit push, React Email, Resend/mailpit SMTP, Next.js App Router API routes

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `lib/db/schema.ts` | Modify | Add `email_queue` table |
| `lib/email-queue.ts` | Create | `enqueueEmail()` + `processEmailQueue()` |
| `tests/email-queue.test.ts` | Create | Unit tests for queue logic |
| `emails/cv-activation.tsx` | Create | J+1 CV: how to maximize your CV |
| `emails/cv-feedback.tsx` | Create | J+2 CV: feedback request |
| `emails/cv-upsell-ebook.tsx` | Create | J+4 CV: upsell ebook |
| `emails/ebook-upsell-cv-1.tsx` | Create | J+1 ebook: upsell CV (complementarity) |
| `emails/ebook-tip.tsx` | Create | J+2 ebook: one key prompt highlight |
| `emails/ebook-nurturing.tsx` | Create | J+4 ebook: "any interviews?" nurturing |
| `emails/ebook-feedback.tsx` | Create | J+7 ebook: NPS feedback |
| `emails/ebook-upsell-cv-2.tsx` | Create | J+10 ebook: upsell CV (social proof) |
| `lib/email.ts` | Modify | Add `sendSequenceEmail()` dispatcher |
| `app/api/admin/orders/[orderId]/route.ts` | Modify | Enqueue CV sequence on delivery |
| `app/api/stripe/webhook/route.ts` | Modify | Enqueue ebook sequence on purchase |
| `app/api/cron/emails/route.ts` | Create | Cron route to process queue |

---

### Task 1: Schema — add email_queue table

**Files:**
- Modify: `lib/db/schema.ts`

- [ ] **Step 1: Add email_queue table**

In `lib/db/schema.ts`, after the `ebookPurchases` table:

```typescript
export const emailQueue = pgTable('email_queue', {
  id: uuid('id').primaryKey().defaultRandom(),
  to: text('to').notNull(),
  template: text('template').notNull(),
  params: text('params').notNull().default('{}'),
  sendAt: timestamp('send_at').notNull(),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type EmailQueueItem = typeof emailQueue.$inferSelect
```

Valid template values: `'cv-activation'`, `'cv-feedback'`, `'cv-upsell-ebook'`, `'ebook-upsell-cv-1'`, `'ebook-tip'`, `'ebook-nurturing'`, `'ebook-feedback'`, `'ebook-upsell-cv-2'`

- [ ] **Step 2: Run drizzle-kit push**

```bash
DATABASE_URL=postgresql://dev:dev@localhost:5432/cvpro pnpm drizzle-kit push
```

Expected: "Changes applied"

- [ ] **Step 3: Commit**

```bash
git add lib/db/schema.ts
git commit -m "feat: add email_queue table to schema"
```

---

### Task 2: email-queue lib + tests (TDD)

**Files:**
- Create: `lib/email-queue.ts`
- Create: `tests/email-queue.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/email-queue.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { daysFromNow } from '../lib/email-queue'

describe('daysFromNow', () => {
  it('returns a date N days in the future', () => {
    const before = Date.now()
    const result = daysFromNow(1)
    const after = Date.now()
    const expected = 24 * 60 * 60 * 1000
    expect(result.getTime()).toBeGreaterThanOrEqual(before + expected)
    expect(result.getTime()).toBeLessThanOrEqual(after + expected)
  })

  it('returns a date 0 days from now for daysFromNow(0)', () => {
    const before = Date.now()
    const result = daysFromNow(0)
    const after = Date.now()
    expect(result.getTime()).toBeGreaterThanOrEqual(before)
    expect(result.getTime()).toBeLessThanOrEqual(after)
  })

  it('returns correct day for daysFromNow(7)', () => {
    const before = Date.now()
    const result = daysFromNow(7)
    const expected = 7 * 24 * 60 * 60 * 1000
    expect(result.getTime()).toBeGreaterThanOrEqual(before + expected)
  })
})
```

- [ ] **Step 2: Run to verify failure**

```bash
pnpm test tests/email-queue.test.ts
```

Expected: FAIL — "Cannot find module"

- [ ] **Step 3: Create lib/email-queue.ts**

```typescript
import { db } from '@/lib/db'
import { emailQueue } from '@/lib/db/schema'
import { and, isNull, lte } from 'drizzle-orm'

export function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

export async function enqueueEmail(
  to: string,
  template: string,
  params: Record<string, unknown>,
  sendAt: Date,
): Promise<void> {
  await db.insert(emailQueue).values({
    to,
    template,
    params: JSON.stringify(params),
    sendAt,
  })
}

export async function enqueueCvSequence(to: string, orderId: string): Promise<void> {
  await Promise.all([
    enqueueEmail(to, 'cv-activation', { orderId }, daysFromNow(1)),
    enqueueEmail(to, 'cv-feedback', { orderId }, daysFromNow(2)),
    enqueueEmail(to, 'cv-upsell-ebook', { orderId }, daysFromNow(4)),
  ])
}

export async function enqueueEbookSequence(to: string): Promise<void> {
  await Promise.all([
    enqueueEmail(to, 'ebook-upsell-cv-1', {}, daysFromNow(1)),
    enqueueEmail(to, 'ebook-tip', {}, daysFromNow(2)),
    enqueueEmail(to, 'ebook-nurturing', {}, daysFromNow(4)),
    enqueueEmail(to, 'ebook-feedback', {}, daysFromNow(7)),
    enqueueEmail(to, 'ebook-upsell-cv-2', {}, daysFromNow(10)),
  ])
}

export async function getPendingEmails() {
  return db.query.emailQueue.findMany({
    where: and(
      isNull(emailQueue.sentAt),
      lte(emailQueue.sendAt, new Date()),
    ),
  })
}
```

- [ ] **Step 4: Run tests to verify pass**

```bash
pnpm test tests/email-queue.test.ts
```

Expected: 3 tests pass (note: `enqueueEmail` and sequence functions touch DB and won't be unit-tested here — tested via integration)

- [ ] **Step 5: Commit**

```bash
git add lib/email-queue.ts tests/email-queue.test.ts
git commit -m "feat: add email queue utility (enqueue, sequence helpers)"
```

---

### Task 3: Eight email templates

**Files:**
- Create: `emails/cv-activation.tsx`
- Create: `emails/cv-feedback.tsx`
- Create: `emails/cv-upsell-ebook.tsx`
- Create: `emails/ebook-upsell-cv-1.tsx`
- Create: `emails/ebook-tip.tsx`
- Create: `emails/ebook-nurturing.tsx`
- Create: `emails/ebook-feedback.tsx`
- Create: `emails/ebook-upsell-cv-2.tsx`

All templates use the same React Email base pattern as existing templates. Brand colors: `#0D0D0D` dark, `#1A3CFF` blue, zinc-400 for secondary text.

- [ ] **Step 1: Create emails/cv-activation.tsx** (J+1 after CV delivery)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

interface CvActivationEmailProps {
  orderId: string
}

export function CvActivationEmail({ orderId: _ }: CvActivationEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            3 choses à faire avec ton CV réécrit
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Ton CV est optimisé pour les ATS. Voici comment l'utiliser au maximum :
          </Text>
          {[
            { n: '1.', t: 'Mets à jour ton profil LinkedIn', d: "Colle les nouvelles formulations de ton CV dans ton résumé et tes expériences. Les recruteurs cherchent les mêmes mots que les ATS." },
            { n: '2.', t: 'Adapte pour chaque offre', d: "Repère les 3-5 mots-clés de chaque annonce et vérifie qu'ils apparaissent dans ton CV. 5 min par candidature, taux de réponse x2." },
            { n: '3.', t: 'Résultat pas satisfaisant ?', d: "Tu peux demander une révision depuis ton espace client. C'est gratuit, illimité, sans justification à donner." },
          ].map(({ n, t, d }) => (
            <div key={n} style={{ marginBottom: '16px' }}>
              <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: '0 0 4px' }}>
                {n} {t}
              </Text>
              <Text style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                {d}
              </Text>
            </div>
          ))}
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 2: Create emails/cv-feedback.tsx** (J+2 after CV delivery)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function CvFeedbackEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Est-ce que ça se passe bien ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Ton CV réécrit est entre tes mains depuis hier. On aimerait savoir si tu es satisfait(e).
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Réponds directement à cet email — ton retour nous aide à améliorer le service et, si quelque chose ne va pas, on s'en occupe immédiatement.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Bonne recherche,
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: '0' }}>
            L'équipe CV Pro
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 3: Create emails/cv-upsell-ebook.tsx** (J+4 after CV delivery)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const EBOOK_URL = 'https://cvpro.lbframe.com/agent-ia-emploi'

export function CvUpsellEbookEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ton CV est prêt. Tu veux aller plus loin ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Le CV optimisé c'est la base. Mais les candidats qui décrochent le plus d'entretiens font aussi autre chose : ils utilisent l'IA pour chaque étape.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            <strong>L'Agent IA Emploi</strong> — 50 prompts copier-coller pour piloter toute ta recherche avec l'IA. Lettre de motivation, préparation entretien, suivi des candidatures, relances.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            <strong>9€.</strong> PDF livré instantanément par email.
          </Text>
          <Button
            href={EBOOK_URL}
            style={{
              backgroundColor: '#1A3CFF',
              borderRadius: '10px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '15px',
              fontWeight: '700',
              padding: '14px 28px',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Découvrir L'Agent IA Emploi →
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 4: Create emails/ebook-upsell-cv-1.tsx** (J+1 after ebook purchase)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const CV_URL = 'https://cvpro.lbframe.com/order'

export function EbookUpsellCv1Email() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Tu as le guide. Il te manque peut-être une chose.
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            L'Agent IA Emploi te donne tous les prompts pour réécrire ton CV toi-même. C'est une des meilleures façons de le faire — si tu as 2 heures devant toi.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Si tu veux que ce soit fait en 30 minutes — sans t'en occuper — c'est ce qu'on fait chez CV Pro pour 12€.
          </Text>
          <Text style={{ color: '#71717a', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', margin: '0 0 24px' }}>
            2 heures de travail vs 30 minutes et 12€. Tu choisis.
          </Text>
          <Button
            href={CV_URL}
            style={{
              backgroundColor: '#0D0D0D',
              borderRadius: '10px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '15px',
              fontWeight: '700',
              padding: '14px 28px',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Faire réécrire mon CV en 30 min →
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L'Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 5: Create emails/ebook-tip.tsx** (J+2 after ebook purchase)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Section, Hr,
} from '@react-email/components'

export function EbookTipEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ce prompt a aidé 3 candidats à décrocher un entretien
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Dans le guide, le prompt #7 (Optimisation ATS) est celui qui a le plus fort impact immédiat. Voici comment l'utiliser :
          </Text>
          <Section style={{ backgroundColor: '#f8fafc', borderLeft: '3px solid #1A3CFF', borderRadius: '4px', padding: '16px 20px', marginBottom: '20px' }}>
            <Text style={{ color: '#0D0D0D', fontSize: '14px', fontFamily: 'monospace', margin: 0, lineHeight: '1.6' }}>
              "Analyse cette offre d'emploi et ce CV. Liste les 10 mots-clés manquants dans le CV qui apparaissent dans l'offre. Propose une reformulation pour chaque expérience pour les intégrer naturellement."
            </Text>
          </Section>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Résultat : un CV qui parle exactement le même langage que l'ATS du recruteur. La plupart des candidats passent à côté de ça.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Bonne chasse,<br />L'équipe LB FRAME
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L'Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 6: Create emails/ebook-nurturing.tsx** (J+4 after ebook purchase)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function EbookNurturingEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Est-ce que tu as eu des réponses ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Tu as le guide depuis quelques jours. J'espère que les prompts t'ont été utiles.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Si tu as eu des retours positifs sur ton CV ou décroché des entretiens, réponds-moi — ça nous aide à savoir ce qui marche vraiment.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Et si tu galères encore, on est là aussi. Un simple retour suffit.
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: 0 }}>
            Leonardo — LB FRAME
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L'Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 7: Create emails/ebook-feedback.tsx** (J+7 after ebook purchase)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function EbookFeedbackEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ton avis en 30 secondes
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Tu as eu le guide il y a une semaine. Une seule question :
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '18px', fontWeight: '700', lineHeight: '1.5', margin: '0 0 8px' }}>
            Sur une échelle de 0 à 10, est-ce que tu recommanderais L'Agent IA Emploi à quelqu'un en recherche d'emploi ?
          </Text>
          <Text style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Réponds directement à cet email avec ton score (et pourquoi si tu veux). Chaque retour est lu personnellement.
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: 0 }}>
            Leonardo — LB FRAME
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L'Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 8: Create emails/ebook-upsell-cv-2.tsx** (J+10 after ebook purchase)

```tsx
import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const CV_URL = 'https://cvpro.lbframe.com/order'

export function EbookUpsellCv2Email() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ce que les candidats qui trouvent vite font différemment
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            On a traité plus de 200 CVs ces derniers mois. Le point commun des profils qui décrochent le plus d'entretiens : leur CV est réécrit par quelqu'un d'autre.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Pas parce qu'ils ne savent pas écrire. Parce qu'on ne voit pas ses propres angles morts. Un CV réécrit avec un regard extérieur passe toujours mieux.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            <strong>CV Pro, 12€.</strong> CV réécrit en 30 minutes, livré dans ta boîte mail. Révisions incluses sans limite.
          </Text>
          <Button
            href={CV_URL}
            style={{
              backgroundColor: '#1A3CFF',
              borderRadius: '10px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '15px',
              fontWeight: '700',
              padding: '14px 28px',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Faire réécrire mon CV pour 12€ →
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L'Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
```

- [ ] **Step 9: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 10: Commit**

```bash
git add emails/
git commit -m "feat: add 8 email sequence templates (CV activation/feedback/upsell, ebook sequences)"
```

---

### Task 4: Add sendSequenceEmail dispatcher to lib/email.ts

**Files:**
- Modify: `lib/email.ts`

Add imports for all 8 new templates and a `sendSequenceEmail` dispatcher that takes a template name and params.

- [ ] **Step 1: Add imports and dispatcher to lib/email.ts**

Add at the top of the imports:
```typescript
import { CvActivationEmail } from '@/emails/cv-activation'
import { CvFeedbackEmail } from '@/emails/cv-feedback'
import { CvUpsellEbookEmail } from '@/emails/cv-upsell-ebook'
import { EbookUpsellCv1Email } from '@/emails/ebook-upsell-cv-1'
import { EbookTipEmail } from '@/emails/ebook-tip'
import { EbookNurturingEmail } from '@/emails/ebook-nurturing'
import { EbookFeedbackEmail } from '@/emails/ebook-feedback'
import { EbookUpsellCv2Email } from '@/emails/ebook-upsell-cv-2'
```

Add the dispatcher function at the end of lib/email.ts:

```typescript
const SEQUENCE_TEMPLATES: Record<string, { subject: string; render: (params: Record<string, string>) => React.ReactElement }> = {
  'cv-activation': {
    subject: '3 choses à faire avec ton CV réécrit',
    render: (p) => CvActivationEmail({ orderId: p.orderId }),
  },
  'cv-feedback': {
    subject: 'Est-ce que ça se passe bien ?',
    render: () => CvFeedbackEmail(),
  },
  'cv-upsell-ebook': {
    subject: 'Tu veux aller plus loin dans ta recherche ?',
    render: () => CvUpsellEbookEmail(),
  },
  'ebook-upsell-cv-1': {
    subject: 'Tu as le guide. Il te manque peut-être une chose.',
    render: () => EbookUpsellCv1Email(),
  },
  'ebook-tip': {
    subject: "Ce prompt a aidé 3 candidats à décrocher un entretien",
    render: () => EbookTipEmail(),
  },
  'ebook-nurturing': {
    subject: 'Est-ce que tu as eu des réponses ?',
    render: () => EbookNurturingEmail(),
  },
  'ebook-feedback': {
    subject: 'Ton avis en 30 secondes',
    render: () => EbookFeedbackEmail(),
  },
  'ebook-upsell-cv-2': {
    subject: 'Ce que les candidats qui trouvent vite font différemment',
    render: () => EbookUpsellCv2Email(),
  },
}

export async function sendSequenceEmail(
  to: string,
  template: string,
  params: Record<string, string>,
): Promise<void> {
  const config = SEQUENCE_TEMPLATES[template]
  if (!config) {
    console.error('Unknown email template:', template)
    return
  }
  await sendEmail({ to, subject: config.subject, react: config.render(params) })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/email.ts
git commit -m "feat: add sendSequenceEmail dispatcher for all sequence templates"
```

---

### Task 5: Cron route to process email queue

**Files:**
- Create: `app/api/cron/emails/route.ts`

- [ ] **Step 1: Create the cron directory and route**

```bash
mkdir -p app/api/cron/emails
```

Create `app/api/cron/emails/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { emailQueue } from '@/lib/db/schema'
import { getPendingEmails } from '@/lib/email-queue'
import { sendSequenceEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  // Simple secret check to prevent unauthorized calls
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pending = await getPendingEmails()

  let sent = 0
  let failed = 0

  for (const item of pending) {
    try {
      const params = JSON.parse(item.params) as Record<string, string>
      await sendSequenceEmail(item.to, item.template, params)
      await db
        .update(emailQueue)
        .set({ sentAt: new Date() })
        .where(eq(emailQueue.id, item.id))
      sent++
    } catch (err) {
      console.error('Failed to send queued email', item.id, err)
      failed++
    }
  }

  return NextResponse.json({ sent, failed, total: pending.length })
}

// Also support GET for Vercel cron jobs (which use GET)
export async function GET(request: NextRequest) {
  return POST(request)
}
```

- [ ] **Step 2: Add CRON_SECRET to .env.local**

Add to `.env.local`:
```
CRON_SECRET=dev-cron-secret-change-in-prod
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Test the cron route responds**

```bash
curl -s -X POST http://localhost:3000/api/cron/emails \
  -H "Authorization: Bearer dev-cron-secret-change-in-prod" | jq .
```

Expected: `{"sent":0,"failed":0,"total":0}` (no pending emails yet)

- [ ] **Step 5: Commit**

```bash
git add app/api/cron/emails/route.ts
git commit -m "feat: add email queue cron route /api/cron/emails"
```

---

### Task 6: Wire up email queue at CV delivery and ebook purchase

**Files:**
- Modify: `app/api/admin/orders/[orderId]/route.ts` — enqueue CV sequence on delivery
- Modify: `app/api/stripe/webhook/route.ts` — enqueue ebook sequence on purchase

- [ ] **Step 1: Update admin orders route to enqueue CV sequence on delivery**

In `app/api/admin/orders/[orderId]/route.ts`, add the import:
```typescript
import { enqueueCvSequence } from '@/lib/email-queue'
```

In the `upload-rewritten` action (after `sendCvDeliveredEmail`), add:
```typescript
if (customer) {
  sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
  enqueueCvSequence(customer.email, orderId).catch(console.error)
}
```

In the `update-status` to `delivered` case, also add after `sendCvDeliveredEmail`:
```typescript
if (customer) {
  sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
  enqueueCvSequence(customer.email, orderId).catch(console.error)
}
```

- [ ] **Step 2: Update webhook to enqueue ebook sequence on purchase**

In `app/api/stripe/webhook/route.ts`, add the import:
```typescript
import { enqueueEbookSequence } from '@/lib/email-queue'
```

In `handleEbookPurchase`, after `sendEbookDeliveredEmail`:
```typescript
sendEbookDeliveredEmail({ to: resolvedEmail, downloadUrl }).catch(console.error)
enqueueEbookSequence(resolvedEmail).catch(console.error)
```

- [ ] **Step 3: Verify TypeScript compiles and tests pass**

```bash
pnpm tsc --noEmit
pnpm test
```

Expected: no errors, all tests pass

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/orders/ app/api/stripe/
git commit -m "feat: wire up email sequences — CV delivery and ebook purchase trigger queue"
```

---

### Final verification

```bash
pnpm tsc --noEmit
pnpm test
curl -s -X POST http://localhost:3000/api/cron/emails \
  -H "Authorization: Bearer dev-cron-secret-change-in-prod" | head -c 100
tail -10 /tmp/nextjs.log
```
