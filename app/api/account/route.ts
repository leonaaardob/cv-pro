// app/api/account/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { deleteFromR2 } from '@/lib/r2'
import { sendAccountDeletedEmail } from '@/lib/email'

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = session.user.id
  const userEmail = session.user.email

  // Delete all R2 files for this user
  const userOrders = await db.query.orders.findMany({ where: eq(orders.userId, userId) })
  await Promise.allSettled(
    userOrders.flatMap((order) => {
      const keys = [order.cvOriginalKey, order.cvRewrittenKey].filter(Boolean) as string[]
      return keys.map((key) => deleteFromR2(key))
    }),
  )

  // Delete user from DB (cascade deletes sessions, accounts, orders)
  await db.delete(user).where(eq(user.id, userId))

  // Sign out session
  await auth.api.signOut({ headers: request.headers })

  // Send confirmation email (fire-and-forget)
  sendAccountDeletedEmail({ to: userEmail }).catch(console.error)

  return NextResponse.redirect(new URL('/?deleted=1', request.url))
}

// Support HTML form POST with _method=DELETE workaround
export async function POST(request: NextRequest) {
  return DELETE(request)
}
