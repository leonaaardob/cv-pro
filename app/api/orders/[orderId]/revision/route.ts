import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { and, eq, sql } from 'drizzle-orm'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orderId } = await params

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
  })

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (order.status !== 'delivered') return NextResponse.json({ error: 'Order not delivered' }, { status: 400 })

  const limitReached = order.revisionLimit !== -1 && order.revisionCount >= order.revisionLimit
  if (limitReached) return NextResponse.json({ error: 'Revision limit reached' }, { status: 429 })

  await db
    .update(orders)
    .set({ revisionCount: sql`${orders.revisionCount} + 1`, updatedAt: new Date() })
    .where(eq(orders.id, orderId))

  return NextResponse.json({ revisionCount: order.revisionCount + 1 })
}
