import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { sendRevisionNotificationEmail } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orderId } = await params
  const body = await request.json().catch(() => ({})) as { message?: string }
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 500) || null : null

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (order.status !== 'delivered') return NextResponse.json({ error: 'Order not delivered' }, { status: 400 })

  const limitReached = order.revisionLimit !== -1 && order.revisionCount >= order.revisionLimit
  if (limitReached) return NextResponse.json({ error: 'Revision limit reached' }, { status: 429 })

  if (order.revisionRequestedAt !== null) {
    return NextResponse.json({ error: 'Revision already pending' }, { status: 409 })
  }

  await db
    .update(orders)
    .set({
      status: 'pending',
      revisionCount: sql`${orders.revisionCount} + 1`,
      revisionRequestedAt: new Date(),
      revisionMessage: message,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))

  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail) {
    sendRevisionNotificationEmail({
      to: adminEmail,
      customerEmail: session.user.email,
      orderId,
      productName: order.productName,
      message: message ?? undefined,
    }).catch(console.error)
  }

  return NextResponse.json({ revisionCount: order.revisionCount + 1 })
}
