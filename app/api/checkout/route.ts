import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const { email, priceId, cvOriginalKey, uploadUuid } = await request.json() as {
    email: string
    priceId: string
    cvOriginalKey: string
    uploadUuid: string
  }

  if (!email || !priceId || !cvOriginalKey || !uploadUuid) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const price = await stripe.prices.retrieve(priceId, { expand: ['product'] })
  const product = price.product as Stripe.Product

  const appUrl = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      email,
      cvOriginalKey,
      productId: product.id,
      productName: product.name,
    },
    customer_email: email,
    success_url: `${appUrl}/succes`,
    cancel_url: `${appUrl}/order?cancelled=1`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
