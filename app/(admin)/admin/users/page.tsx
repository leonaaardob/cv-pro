import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user, orders } from '@/lib/db/schema'
import { eq, desc, count } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || (session.user as { role: string }).role !== 'admin') redirect('/auth/login')

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      orderCount: count(orders.id),
    })
    .from(user)
    .leftJoin(orders, eq(orders.userId, user.id))
    .groupBy(user.id)
    .orderBy(desc(user.createdAt))

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-[#0D0D0D]">Utilisateurs</h1>
          <Link href="/admin" className="text-sm text-zinc-500 hover:text-[#0D0D0D] underline">
            ← Commandes
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Commandes</th>
                <th className="px-6 py-4">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#0D0D0D]">{u.name}</div>
                    <div className="text-zinc-500">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-zinc-100 text-zinc-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#0D0D0D]">{u.orderCount}</td>
                  <td className="px-6 py-4 text-zinc-500">
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
