// app/api/files/[key]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { getSignedDownloadUrl } from '@/lib/r2'
import { eq, or } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key: encodedKey } = await params
  const key = decodeURIComponent(encodedKey)

  const isAdmin = (session.user as { role: string }).role === 'admin'

  if (!isAdmin) {
    // Verify the user owns a file with this key
    const order = await db.query.orders.findFirst({
      where: or(
        eq(orders.cvOriginalKey, key),
        eq(orders.cvRewrittenKey, key),
      ),
    })
    if (!order || order.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    // Clients can only download rewritten CVs
    if (order.cvOriginalKey === key && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const signedUrl = await getSignedDownloadUrl(key, 900)
  return NextResponse.redirect(signedUrl)
}
