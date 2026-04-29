import { describe, it, expect } from 'vitest'
import { generateEbookToken, EBOOK_TOKEN_EXPIRY_MS } from '../lib/ebook-token'

const TEST_SECRET = 'test-secret-32-bytes-long-enough!'

describe('generateEbookToken', () => {
  it('returns a string with at least one dot separator', () => {
    const token = generateEbookToken('test@example.com', TEST_SECRET)
    expect(token).toContain('.')
  })

  it('payload decodes to correct email and future expiry', () => {
    const before = Date.now()
    const token = generateEbookToken('user@test.com', TEST_SECRET)
    const dotIndex = token.lastIndexOf('.')
    const payloadB64 = token.slice(0, dotIndex)
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf-8'))
    expect(payload.email).toBe('user@test.com')
    expect(payload.exp).toBeGreaterThan(before)
    expect(payload.exp).toBeLessThanOrEqual(before + EBOOK_TOKEN_EXPIRY_MS + 1000)
  })

  it('produces different tokens for different emails', () => {
    const t1 = generateEbookToken('a@a.com', TEST_SECRET)
    const t2 = generateEbookToken('b@b.com', TEST_SECRET)
    expect(t1).not.toBe(t2)
  })

  it('token has valid base64 payload and signature parts', () => {
    const token = generateEbookToken('user@example.com', TEST_SECRET)
    const dotIndex = token.lastIndexOf('.')
    const payloadB64 = token.slice(0, dotIndex)
    const sigB64 = token.slice(dotIndex + 1)
    expect(payloadB64.length).toBeGreaterThan(0)
    expect(sigB64.length).toBeGreaterThan(0)
    expect(() => Buffer.from(payloadB64, 'base64')).not.toThrow()
    expect(() => Buffer.from(sigB64, 'base64')).not.toThrow()
  })
})
