import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { DeleteAccountButton } from '@/components/DeleteAccountButton'

const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  processing: 'En cours',
  delivered: 'Livré',
}

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/auth/login')

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, session.user.id),
    orderBy: desc(orders.createdAt),
  })

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Mes commandes</h1>
          <Link
            href="/order"
            className="rounded-full bg-[#1A3CFF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Nouvelle commande
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-10 text-center">
            <p className="text-zinc-500">Aucune commande pour l'instant.</p>
            <Link href="/order" className="mt-4 inline-block font-semibold text-[#1A3CFF] hover:underline">
              Commander maintenant →
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {userOrders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/${order.id}`}
                className="block rounded-2xl border border-zinc-200 bg-white p-6 hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[#0D0D0D]">{order.productName}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  )
}
