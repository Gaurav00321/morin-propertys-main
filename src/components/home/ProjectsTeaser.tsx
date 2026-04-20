'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, CheckCircle2, Car, Zap, Building2, Shield, Trees, Users, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const amenities = [
  { icon: Car, label: 'Parking' },
  { icon: Zap, label: 'Power Backup' },
  { icon: Building2, label: 'Lift' },
  { icon: Shield, label: '24/7 Security' },
  { icon: Trees, label: 'Garden' },
  { icon: Users, label: 'Community Hall' },
]

export function ProjectsTeaser() {
  return (
    <section className="py-20 md:py-28 charcoal-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <p className="section-eyebrow justify-center !text-brand-secondary">Signature Project</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem] text-white">
            Featured Project Spotlight
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Side */}
            <div className="relative h-72 lg:h-auto lg:min-h-[480px]">
              <Image
                src="/images/gallery-images/10.jpg"
                alt="Sarthak Enclave - Premium Apartments in Subhanpura"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-primary/40" />
              <div className="absolute bottom-6 left-6 lg:hidden">
                <span className="badge badge-featured">Signature Project</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-12 bg-brand-primary/50 backdrop-blur-sm flex flex-col justify-center">
              <span className="badge badge-featured w-fit mb-4 hidden lg:inline-flex">Signature Project</span>
              <h3 className="font-serif font-bold text-3xl md:text-4xl text-white mb-2">
                Sarthak Enclave
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <MapPin size={14} className="text-brand-secondary" />
                Subhanpura, Vadodara
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                A premium residential project in one of Vadodara&apos;s most prestigious
                neighbourhoods. Modern apartments with world-class amenities, designed
                for families who value comfort and convenience.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Prime Location', 'Modern Amenities', 'RERA Compliant', 'Easy Home Loan'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 size={14} className="text-brand-secondary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Amenities Strip */}
              <div className="flex flex-wrap gap-3 mb-8">
                {amenities.map(a => (
                  <div key={a.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                    <a.icon size={12} />
                    {a.label}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/projects/sarthak-enclave" className="btn-primary">
                  Explore Project <ArrowRight size={16} />
                </Link>
                <a
                  href={getWhatsAppUrl("Hi! I'd like to register my interest in Sarthak Enclave, Subhanpura. Please share availability and pricing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  Register Interest
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
