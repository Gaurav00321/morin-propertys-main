'use client'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export function CTABanner() {
  return (
    <section className="py-16 md:py-24 navy-gradient relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
            Ready to Find Your
            <br />
            <span className="gold-gradient-text">Dream Home?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Talk to our experts today — no pressure, just honest guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-white">
              <Phone size={18} />
              Call Now
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
