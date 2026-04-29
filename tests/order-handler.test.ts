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
      cvRewrittenKey: null,
    })
  })
})
