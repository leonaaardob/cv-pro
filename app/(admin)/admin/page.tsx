import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, user } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isUrgentOrder } from '@/lib/admin-utils'
import { AdminAutoRefresh } from '@/components/AdminAutoRefresh'

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

const TABS = [
  { value: '', label: 'Tous' },
  { value: 'pending', label: 'En attente' },
  { value: 'processing', label: 'En cours' },
  { value: 'delivered', label: 'Livré' },
]

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const { status: filterStatus } = await searchParams

  const allOrders = await db
    .select({ order: orders, userEmail: user.email, userName: user.name })
    .from(orders)
    .innerJoin(user, eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))

  const filtered = filterStatus
    ? allOrders.filter((o) => o.order.status === filterStatus)
    : allOrders

  const counts = {
    pending: allOrders.filter((o) => o.order.status === 'pending').length,
    processing: allOrders.filter((o) => o.order.status === 'processing').length,
    delivered: allOrders.filter((o) => o.order.status === 'delivered').length,
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <AdminAutoRefresh />
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Admin</h1>
          <Link href="/admin/users" className="text-sm text-zinc-500 hover:text-[#0D0D0D] underline">
            Utilisateurs →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center">
              <div className="text-4xl font-black text-[#0D0D0D]">{count}</div>
              <div className="mt-1 text-sm text-zinc-500">{STATUS_LABEL[status]}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {TABS.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value ? `/admin?status=${tab.value}` : '/admin'}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                (filterStatus ?? '') === tab.value
                  ? 'bg-[#0D0D0D] text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map(({ order, userEmail, userName }) => {
                const urgent = isUrgentOrder(order)
                const hasRevision = order.revisionRequestedAt !== null
                return (
                  <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#0D0D0D]">{userName}</div>
                      <div className="text-zinc-500">{userEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-700">{order.productName}</td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                        {urgent && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                            URGENT
                          </span>
                        )}
                        {hasRevision && (
                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-600">
                            RÉVISION
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-[#1A3CFF] hover:underline">
                        Gérer →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-zinc-400">
                    Aucune commande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
