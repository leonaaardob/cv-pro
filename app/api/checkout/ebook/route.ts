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
