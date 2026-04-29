import { describe, it, expect } from 'vitest'
import { daysFromNow } from '../lib/email-queue'

describe('daysFromNow', () => {
  it('returns a date 1 day in the future', () => {
    const before = Date.now()
    const result = daysFromNow(1)
    const after = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    expect(result.getTime()).toBeGreaterThanOrEqual(before + oneDay)
    expect(result.getTime()).toBeLessThanOrEqual(after + oneDay)
  })

  it('returns a date approximately now for daysFromNow(0)', () => {
    const before = Date.now()
    const result = daysFromNow(0)
    const after = Date.now()
    expect(result.getTime()).toBeGreaterThanOrEqual(before)
    expect(result.getTime()).toBeLessThanOrEqual(after)
  })

  it('returns correct timing for daysFromNow(7)', () => {
    const before = Date.now()
    const result = daysFromNow(7)
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    expect(result.getTime()).toBeGreaterThanOrEqual(before + sevenDays)
  })

  it('returns a Date instance', () => {
    expect(daysFromNow(1)).toBeInstanceOf(Date)
  })
})
