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
  const downloadUrl = `${process.env.EBOOK_DOWNLOAD_BASE_URL ?? 'https://ebooks.lbframe.com/download'}?token=${token}`

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
