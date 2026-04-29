import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { uploadRewritten, updateStatus } from './actions'

export default async function AdminOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const result = await db
    .select({ order: orders, userEmail: user.email, userName: user.name })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!result[0]) notFound()
  let { order, userEmail, userName } = result[0]

  if (order.status === 'pending') {
    await db
      .update(orders)
      .set({ status: 'processing', updatedAt: new Date() })
      .where(eq(orders.id, orderId))
    order = { ...order, status: 'processing' }
  }

  const originalDownloadUrl = `/api/files/${encodeURIComponent(order.cvOriginalKey)}`
  const rewrittenDownloadUrl = order.cvRewrittenKey
    ? `/api/files/${encodeURIComponent(order.cvRewrittenKey)}`
    : null

  const STATUS_COLOR: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
  }
  const STATUS_LABEL: Record<string, string> = {
    pending: 'En attente',
    processing: 'En cours',
    delivered: 'Livré',
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors">
          ← Retour
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0D0D0D]">{order.productName}</h1>
            <p className="mt-1 text-zinc-500">{userName} · {userEmail}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${STATUS_COLOR[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>

        {order.revisionRequestedAt && (
          <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-6 py-4">
            <p className="text-sm font-semibold text-orange-700">Révision demandée</p>
            {order.revisionMessage && (
              <p className="mt-1 text-sm text-orange-600">&ldquo;{order.revisionMessage}&rdquo;</p>
            )}
            <p className="mt-1 text-xs text-orange-400">
              {new Date(order.revisionRequestedAt).toLocaleString('fr-FR')}
            </p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">CV original</h2>
            <a
              href={originalDownloadUrl}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Télécharger ↓
            </a>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">CV réécrit</h2>

            {rewrittenDownloadUrl && (
              <a
                href={rewrittenDownloadUrl}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Télécharger le CV réécrit ↓
              </a>
            )}

            <form action={uploadRewritten.bind(null, orderId)} className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-700">
                  {order.revisionRequestedAt ? 'Uploader la révision' : 'Upload CV réécrit'}
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 block w-full text-sm text-zinc-500 file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#0D0D0D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                {order.revisionRequestedAt ? 'Uploader et livrer la révision →' : 'Uploader et livrer →'}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-[#0D0D0D]">Changer le statut manuellement</h2>
            <form action={updateStatus.bind(null, orderId)} className="mt-4 flex gap-3">
              <select
                name="status"
                defaultValue={order.status}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700"
              >
                <option value="pending">En attente</option>
                <option value="processing">En cours</option>
                <option value="delivered">Livré</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-[#1A3CFF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
