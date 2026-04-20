'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium"
    >
      Log Out
    </button>
  )
}
