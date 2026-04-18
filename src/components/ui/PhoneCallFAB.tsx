'use client'
import { Phone } from 'lucide-react'
import { getCallUrl } from '@/lib/utils'

export function PhoneCallFAB() {
  return (
    <a
      href={getCallUrl()}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 lg:hidden"
      aria-label="Call us"
    >
      <Phone size={24} className="text-white" />
    </a>
  )
}
