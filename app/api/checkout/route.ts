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
