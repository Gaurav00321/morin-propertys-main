'use client'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import { Building2, MapPin, Home, Users, Heart } from 'lucide-react'

const stats = [
  { icon: Heart, value: 325, suffix: '+', label: 'Happy Families', context: 'Real families. Real homes.' },
  { icon: Building2, value: 3, suffix: '+', label: 'Landmark Projects', context: 'Signature developments.' },
  { icon: MapPin, value: 132, suffix: '+', label: 'Plots Sold', context: 'Prime Vadodara locations.' },
  { icon: Users, value: 5, suffix: '+', label: 'Years of Service', context: 'Trusted since day one.' },
]

function StatItem({ icon: Icon, value, suffix, label, context, delay }: typeof stats[0] & { delay: number }) {
  const [ref, isInView] = useInView()
  const count = useCountUp(value, 2000, isInView)

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center px-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-brand-secondary" />
      </div>
      <div className="font-mono font-bold text-3xl sm:text-4xl text-brand-primary tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-text-primary font-semibold text-sm mt-1">{label}</div>
      <div className="text-text-muted text-xs mt-1">{context}</div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="py-16 md:py-20 bg-white relative -mt-12 mx-4 sm:mx-6 lg:mx-8 rounded-3xl shadow-card z-10 max-w-6xl lg:mx-auto border border-border/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}
