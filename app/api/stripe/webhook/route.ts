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
