'use client'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const reasons = [
  '325+ happy families served across Vadodara',
  'Legally verified, RERA-compliant properties',
  'End-to-end support — from search to possession',
  'Trusted banking partnerships for seamless home loans',
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="font-serif font-bold text-6xl mb-2">325+</div>
                  <div className="text-lg">Happy Families</div>
                </div>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-white rounded-2xl shadow-card-hover p-5 max-w-[200px]">
              <div className="font-serif font-bold text-2xl text-brand-primary">5+ Years</div>
              <div className="text-text-secondary text-sm">of Trusted Service</div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="section-eyebrow">Why Choose Us</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-[2.5rem] mb-6">
              Vadodara&apos;s Most Trusted
              <br />
              <span className="text-brand-secondary">Real Estate Partner</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              We combine deep local knowledge with professional ethics to help
              every client feel confident and well-supported at every step of
              their property journey.
            </p>

            <ul className="space-y-4 mb-8">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-text-primary font-medium">{reason}</span>
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppUrl('Hi! I would like to talk to an expert about properties in Vadodara.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              Talk to an Expert
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
