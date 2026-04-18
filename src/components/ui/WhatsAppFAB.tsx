'use client'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export function WhatsAppFAB() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
        <MessageCircle size={26} className="text-white" fill="white" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-white text-text-primary text-sm font-medium px-4 py-2 rounded-xl shadow-card whitespace-nowrap">
          Chat with us
        </div>
      </div>
    </a>
  )
}
