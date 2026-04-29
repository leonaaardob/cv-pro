import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { RevisionButton } from '@/components/RevisionButton'

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/auth/login')

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
  })
  if (!order) notFound()

  const cvKey = order.cvRewrittenKey
  const downloadUrl = cvKey ? `/api/files/${encodeURIComponent(cvKey)}` : null

  return (
    <main className="min-h-screen bg-[#F7F7F4] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-[#0D0D0D] transition-colors">
          ← Retour
        </Link>

        <h1 className="mt-6 text-3xl font-black tracking-tight text-[#0D0D0D]">{order.productName}</h1>
        <p className="mt-1 text-zinc-500">
          Commande du{' '}
          {new Date(order.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-8">
          {order.status === 'delivered' && downloadUrl ? (
            <>
              <p className="text-lg font-semibold text-green-600">Ton CV réécrit est prêt !</p>
              <p className="mt-2 text-zinc-500">Télécharge-le et commence à postuler.</p>
              <a
                href={downloadUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1A3CFF] px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Télécharger mon CV →
              </a>
              <RevisionButton
                orderId={order.id}
                initialCount={order.revisionCount}
                revisionLimit={order.revisionLimit}
              />
            </>
          ) : order.status === 'pending' && order.revisionRequestedAt ? (
            <>
              <p className="text-lg font-semibold text-purple-700">Révision en cours</p>
              <p className="mt-2 text-zinc-500">
                Ta demande de révision a bien été prise en compte. Tu recevras un email dès que ton CV révisé sera prêt.
              </p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-[#0D0D0D] hover:bg-zinc-50 transition-colors"
                >
                  Télécharger la version actuelle →
                </a>
              )}
            </>
          ) : order.status === 'processing' ? (
            <>
              <p className="text-lg font-semibold text-[#0D0D0D]">Ton CV est en cours de réécriture</p>
              <p className="mt-2 text-zinc-500">Tu recevras un email dès qu'il sera prêt.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-[#0D0D0D]">Commande reçue</p>
              <p className="mt-2 text-zinc-500">Ton CV va être pris en charge très prochainement.</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
