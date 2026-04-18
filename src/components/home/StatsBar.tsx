'use client'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import { Building2, MapPin, Home, Users } from 'lucide-react'

const stats = [
  { icon: Building2, value: 3, suffix: '+', label: 'Projects Completed' },
  { icon: MapPin, value: 132, suffix: '+', label: 'Plots Sold' },
  { icon: Home, value: 179, suffix: '+', label: 'Flats Sold' },
  { icon: Users, value: 325, suffix: '+', label: 'Happy Clients' },
]

function StatItem({ icon: Icon, value, suffix, label }: typeof stats[0] & { inView: boolean }) {
  const [ref, isInView] = useInView()
  const count = useCountUp(value, 2000, isInView)

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center mb-3">
        <Icon size={22} className="text-brand-secondary" />
      </div>
      <div className="font-serif font-bold text-3xl sm:text-4xl text-brand-primary">
        {count}{suffix}
      </div>
      <div className="text-text-secondary text-sm font-medium mt-1">{label}</div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="py-16 md:py-20 bg-white relative -mt-8 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-card z-10 max-w-6xl lg:mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} inView={false} />
        ))}
      </div>
    </section>
  )
}
