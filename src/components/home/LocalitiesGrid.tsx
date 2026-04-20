'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Bell, MapPin } from 'lucide-react'
import { localities } from '@/data/localities'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function LocalitiesGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <SectionHeading
          eyebrow="Explore"
          title="Explore Vadodara, Neighbourhood by Neighbourhood"
          subtitle="Discover verified properties in Vadodara's best-connected and most desirable areas"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {localities.map((locality, i) => (
            <motion.div
              key={locality.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {locality.propertyCount > 0 ? (
                <Link
                  href={`/properties?locality=${encodeURIComponent(locality.name)}`}
                  className="group block relative overflow-hidden rounded-2xl h-72"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/80 to-brand-accent group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Map Pin Decoration */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <MapPin size={18} className="text-brand-secondary" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif font-bold text-white text-xl mb-1 group-hover:text-brand-secondary transition-colors">
                      {locality.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">{locality.description.split('.')[0]}.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-semibold font-mono">
                        {locality.propertyCount} {locality.propertyCount === 1 ? 'property' : 'properties'}
                      </span>
                      <ArrowRight size={16} className="text-brand-secondary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative overflow-hidden rounded-2xl h-72 border border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white" />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center">
                      <MapPin size={18} className="text-text-muted" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif font-bold text-text-primary text-xl mb-1">
                      {locality.name}
                    </h3>
                    <p className="text-text-muted text-sm mb-3">{locality.description.split('.')[0]}.</p>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary/80 transition-colors">
                      <Bell size={14} />
                      Notify Me When Available
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
