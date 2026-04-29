export function isUrgentOrder(
  order: { status: string; createdAt: Date | string },
  thresholdMs = 30 * 60 * 1000
): boolean {
  if (order.status !== 'pending') return false
  const createdAt =
    order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt)
  return Date.now() - createdAt.getTime() > thresholdMs
}
