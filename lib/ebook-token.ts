import { createHmac } from 'crypto'

export const EBOOK_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

export function generateEbookToken(email: string, secret?: string): string {
  const tokenSecret = secret ?? process.env.EBOOK_TOKEN_SECRET!
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + EBOOK_TOKEN_EXPIRY_MS }),
  ).toString('base64')
  const sig = createHmac('sha256', tokenSecret).update(payload).digest('base64')
  return `${payload}.${sig}`
}
