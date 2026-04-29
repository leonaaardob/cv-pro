import { db } from '@/lib/db'
import { emailQueue } from '@/lib/db/schema'
import { and, isNull, lte } from 'drizzle-orm'

export function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

export async function enqueueEmail(
  to: string,
  template: string,
  params: Record<string, unknown>,
  sendAt: Date,
): Promise<void> {
  await db.insert(emailQueue).values({
    to,
    template,
    params: JSON.stringify(params),
    sendAt,
  })
}

export async function enqueueCvSequence(to: string, orderId: string): Promise<void> {
  await Promise.all([
    enqueueEmail(to, 'cv-activation', { orderId }, daysFromNow(1)),
    enqueueEmail(to, 'cv-feedback', { orderId }, daysFromNow(2)),
    enqueueEmail(to, 'cv-upsell-ebook', { orderId }, daysFromNow(4)),
  ])
}

export async function enqueueEbookSequence(to: string): Promise<void> {
  await Promise.all([
    enqueueEmail(to, 'ebook-upsell-cv-1', {}, daysFromNow(1)),
    enqueueEmail(to, 'ebook-tip', {}, daysFromNow(2)),
    enqueueEmail(to, 'ebook-nurturing', {}, daysFromNow(4)),
    enqueueEmail(to, 'ebook-feedback', {}, daysFromNow(7)),
    enqueueEmail(to, 'ebook-upsell-cv-2', {}, daysFromNow(10)),
  ])
}

export async function getPendingEmails() {
  return db.query.emailQueue.findMany({
    where: and(
      isNull(emailQueue.sentAt),
      lte(emailQueue.sendAt, new Date()),
    ),
  })
}
