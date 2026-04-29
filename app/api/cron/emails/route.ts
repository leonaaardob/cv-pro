import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { emailQueue } from '@/lib/db/schema'
import { getPendingEmails } from '@/lib/email-queue'
import { sendSequenceEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'

async function runQueue(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pending = await getPendingEmails()

  let sent = 0
  let failed = 0

  for (const item of pending) {
    try {
      const params = JSON.parse(item.params) as Record<string, string>
      await sendSequenceEmail(item.to, item.template, params)
      await db
        .update(emailQueue)
        .set({ sentAt: new Date() })
        .where(eq(emailQueue.id, item.id))
      sent++
    } catch (err) {
      console.error('Failed to send queued email', item.id, err)
      failed++
    }
  }

  return NextResponse.json({ sent, failed, total: pending.length })
}

export async function POST(request: NextRequest) {
  return runQueue(request)
}

export async function GET(request: NextRequest) {
  return runQueue(request)
}
