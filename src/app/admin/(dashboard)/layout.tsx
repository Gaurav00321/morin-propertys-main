import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin_auth')

  if (!auth || auth.value !== 'authenticated') {
    redirect('/admin/login')
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFEFE]">
      <AdminSidebar />

      {/* Main Content - Added lg:ml-72 to account for the fixed sidebar on desktop */}
      <main className="flex-1 lg:ml-72 lg:h-screen lg:overflow-y-auto px-4 py-8 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
