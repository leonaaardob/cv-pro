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
