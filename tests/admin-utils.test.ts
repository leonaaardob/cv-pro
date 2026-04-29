import { describe, it, expect } from 'vitest'
import { isUrgentOrder } from '@/lib/admin-utils'

describe('isUrgentOrder', () => {
  it('returns false for non-pending status', () => {
    const order = { status: 'completed', createdAt: new Date(Date.now() - 60 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })

  it('returns false for pending order under 30 minutes old', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 10 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })

  it('returns true for pending order over 30 minutes old', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 31 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(true)
  })

  it('respects custom threshold', () => {
    const order = { status: 'pending', createdAt: new Date(Date.now() - 10 * 60 * 1000) }
    expect(isUrgentOrder(order, 5 * 60 * 1000)).toBe(true)
  })

  it('returns false for processing status', () => {
    const order = { status: 'processing', createdAt: new Date(Date.now() - 60 * 60 * 1000) }
    expect(isUrgentOrder(order)).toBe(false)
  })
})
