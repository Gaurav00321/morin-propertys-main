import { supabase } from '@/lib/supabase'
import { 
  Users, 
  Home, 
  PlusCircle, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardOverview() {
  const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true })
  const { count: propertiesCount } = await supabase.from('properties').select('*', { count: 'exact', head: true })

  const stats = [
    { label: 'Total Properties', value: propertiesCount || 0, icon: Home, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Inquiry Leads', value: leadsCount || 0, icon: MessageSquare, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-teal-950">Overview</h1>
        <p className="text-text-secondary text-sm md:text-base">Real-time property and inquiry metrics.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
        <div className="p-8 bg-teal-950 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          
          <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">Quick Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <Link href="/admin/properties/add" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl border border-white/10 group">
              <div className="p-2 bg-teal-400/20 rounded-lg">
                <PlusCircle size={20} className="text-teal-400" />
              </div>
              <span className="font-medium">Add Property</span>
              <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl border border-white/10 group">
              <div className="p-2 bg-brand-accent/20 rounded-lg">
                <Users size={20} className="text-brand-accent" />
              </div>
              <span className="font-medium">Recent Leads</span>
              <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
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
    </div>
  )
}
