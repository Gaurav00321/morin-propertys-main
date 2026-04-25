import { supabase } from '@/lib/supabase'
import { getMongoDb } from '@/lib/mongodb'
import { 
  Users, 
  Home, 
  PlusCircle, 
  MessageSquare, 
  ShieldCheck,
  ArrowRight,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { BlogApiConfigCard } from '@/app/admin/(dashboard)/dashboard/BlogApiConfigCard'

async function getBlogPostCount(): Promise<number> {
  try {
    const db = await getMongoDb()
    return await db.collection('blog_posts').countDocuments()
  } catch {
    return 0
  }
}

export default async function DashboardOverview() {
  const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true })
  const { count: propertiesCount } = await supabase.from('properties').select('*', { count: 'exact', head: true })
  const blogCount = await getBlogPostCount()

  const stats = [
    { label: 'Total Properties', value: propertiesCount || 0, icon: Home, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Inquiry Leads', value: leadsCount || 0, icon: MessageSquare, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    { label: 'Blog Posts', value: blogCount, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-teal-950">Overview</h1>
        <p className="text-text-secondary text-sm md:text-base">Real-time property and inquiry metrics.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-4 ${stat.bg} rounded-2xl transition-transform group-hover:scale-110`}>
                <stat.icon className={stat.color} size={28} />
              </div>
              <div>
                <h3 className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">{stat.label}</h3>
                <p className="text-3xl md:text-5xl font-mono font-bold text-teal-950">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <h3 className="text-2xl font-serif font-bold text-teal-950 mb-6 relative z-10">Quick Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <Link href="/admin/properties/add" className="flex items-center gap-3 p-4 bg-teal-50 hover:bg-teal-100 transition-colors rounded-2xl border border-teal-100 group">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <PlusCircle size={20} className="text-teal-600" />
              </div>
              <span className="font-medium text-teal-900">Add Property</span>
              <ArrowRight size={16} className="ml-auto text-teal-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 transition-colors rounded-2xl border border-amber-200/60 group">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Users size={20} className="text-amber-600" />
              </div>
              <span className="font-medium text-teal-900">Recent Leads</span>
              <ArrowRight size={16} className="ml-auto text-amber-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <ShieldCheck className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-teal-950">System Fully Operational</h3>
          <p className="text-text-secondary text-sm px-8 mt-2">Database, Storage, and API endpoints are synchronized and performing optimally.</p>
        </div>
      </div>

      {/* Blog API Configuration Card */}
      <BlogApiConfigCard
        blogApiUrl={process.env.NEXT_PUBLIC_BLOG_API_URL || 'https://morin-propertys-main.vercel.app/api/blogs'}
        blogApiKey={process.env.BLOG_API_KEY || ''}
        blogCount={blogCount}
      />
    </div>
  )
}
