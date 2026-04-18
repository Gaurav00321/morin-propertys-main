'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { localities } from '@/data/localities'
import { SectionHeading } from '@/components/ui/SectionHeading'

const localityColors = [
  'from-brand-primary/80 to-brand-accent/60',
  'from-brand-accent/80 to-brand-primary/60',
  'from-brand-secondary/80 to-brand-primary/60',
  'from-brand-primary/80 to-brand-secondary/60',
]

export function LocalitiesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <SectionHeading
          eyebrow="Explore"
          title="Explore Popular Localities"
          subtitle="Discover properties in Vadodara's best-connected and most desirable neighbourhoods"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localities.map((locality, i) => (
            <motion.div
              key={locality.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/properties/${locality.slug}`}
                className="group block relative overflow-hidden rounded-2xl h-72"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${localityColors[i]} group-hover:scale-110 transition-transform duration-700`} />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif font-bold text-white text-xl mb-1 group-hover:text-brand-secondary transition-colors">
                    {locality.name}
                  </h3>
                  <p className="text-white/70 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    {locality.propertyCount} properties <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
