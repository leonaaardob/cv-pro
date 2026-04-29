'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { sendCvDeliveredEmail } from '@/lib/email'
import { enqueueCvSequence } from '@/lib/email-queue'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') {
    redirect('/auth/login')
  }
}

export async function uploadRewritten(orderId: string, formData: FormData) {
  await requireAdmin()

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return

  const order = await db.query.orders.findFirst({ where: eq(orders.id, orderId) })
  if (!order) return

  const ext = file.name.split('.').pop() ?? 'pdf'
  const uploadUuid = order.cvOriginalKey.split('/')[1]
  const key = buildCvKey(uploadUuid, 'rewritten', ext)
  const buffer = Buffer.from(await file.arrayBuffer())
  await uploadToR2(key, buffer, file.type)

  await db
    .update(orders)
    .set({
      cvRewrittenKey: key,
      status: 'delivered',
      revisionRequestedAt: null,
      revisionMessage: null,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))

  const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
  if (customer) {
    sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
    enqueueCvSequence(customer.email, orderId).catch(console.error)
  }

  redirect(`/admin/orders/${orderId}`)
}

export async function updateStatus(orderId: string, formData: FormData) {
  await requireAdmin()

  const status = formData.get('status') as string
  if (!['pending', 'processing', 'delivered'].includes(status)) return

  const updateData: Record<string, unknown> = { status, updatedAt: new Date() }
  if (status === 'delivered') {
    updateData.revisionRequestedAt = null
    updateData.revisionMessage = null
  }

  await db.update(orders).set(updateData).where(eq(orders.id, orderId))

  if (status === 'delivered') {
    const order = await db.query.orders.findFirst({ where: eq(orders.id, orderId) })
    if (order) {
      const customer = await db.query.user.findFirst({ where: eq(user.id, order.userId) })
      if (customer) {
        sendCvDeliveredEmail({ to: customer.email, orderId }).catch(console.error)
        enqueueCvSequence(customer.email, orderId).catch(console.error)
      }
    }
  }

  redirect(`/admin/orders/${orderId}`)
}
