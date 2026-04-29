import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { sendCvDeliveredEmail } from '@/lib/email'
import { randomUUID } from 'crypto'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session || (session.user as { role: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { orderId } = await params

  const order = await db.query.orders.findFirst({ where: eq(orders.id, orderId) })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const action = formData.get('action') as string
    const file = formData.get('file') as File | null

    if (action === 'upload-rewritten' && file) {
      const ext = file.name.split('.').pop() ?? 'pdf'
      const uploadUuid = order.cvOriginalKey.split('/')[2] // reuse same uuid folder
      const key = buildCvKey(order.userId, uploadUuid, 'rewritten', ext)
      const buffer = Buffer.from(await file.arrayBuffer())
      await uploadToR2(key, buffer, file.type)

      await db
        .update(orders)
        .set({ cvRewrittenKey: key, status: 'delivered', updatedAt: new Date() })
        .where(eq(orders.id, orderId))

      // Send delivered email
      const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
      if (customer) {
        sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
      }
    } else if (action === 'update-status') {
      const status = formData.get('status') as string
      if (!['pending', 'processing', 'delivered'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
      }
      await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, orderId))

      if (status === 'delivered') {
        const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
        if (customer) {
          sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
        }
      }
    }
  }

  return NextResponse.redirect(new URL(`/admin/orders/${orderId}`, request.url))
}
