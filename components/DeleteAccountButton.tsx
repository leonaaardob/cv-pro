'use client'

export function DeleteAccountButton() {
  async function handleDelete() {
    if (!confirm('Supprimer définitivement ton compte et toutes tes données ? Cette action est irréversible.')) return
    await fetch('/api/account', { method: 'DELETE' })
    window.location.href = '/?deleted=1'
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-zinc-400 hover:text-red-500 underline transition-colors"
    >
      Supprimer mon compte (RGPD)
    </button>
  )
}
