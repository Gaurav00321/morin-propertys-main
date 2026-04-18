'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Building2, CheckCircle2 } from 'lucide-react'

export function ProjectsTeaser() {
  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="section-container">
        <div className="text-center mb-12 lg:mb-16">
          <p className="section-eyebrow justify-center">Projects</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            Our Signature Projects
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="card overflow-hidden !rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-accent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building2 size={64} className="mx-auto mb-4 opacity-60" />
                    <div className="font-serif font-bold text-3xl">Sarthak Enclave</div>
                    <div className="text-white/70 mt-2">Subhanpura, Vadodara</div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="badge badge-new w-fit mb-4">Signature Project</span>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-text-primary mb-2">
                  Sarthak Enclave
                </h3>
                <div className="flex items-center gap-2 text-text-secondary text-sm mb-6">
                  <MapPin size={14} className="text-brand-secondary" />
                  Subhanpura, Vadodara
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  A premium residential project in one of Vadodara&apos;s most prestigious
                  neighbourhoods. Sarthak Enclave offers modern apartments with world-class
                  amenities, designed for families who value comfort and convenience.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['Prime Location', 'Modern Amenities', 'RERA Compliant', 'Easy Home Loan'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-text-primary">
                      <CheckCircle2 size={16} className="text-brand-accent flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link href="/projects/sarthak-enclave" className="btn-primary w-fit">
                  View Project Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
