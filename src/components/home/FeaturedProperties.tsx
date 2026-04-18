'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Bed, Bath, Maximize, Home } from 'lucide-react'
import { getFeaturedProperties } from '@/data/properties'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FeaturedProperties() {
  const properties = getFeaturedProperties()

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="Featured"
            title="Featured Properties in Vadodara"
            subtitle="Hand-picked listings across Vadodara's most sought-after neighbourhoods"
          />
          <Link href="/properties" className="btn-ghost flex items-center gap-2 shrink-0">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={property.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="card group h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/60">
                      <Home size={48} className="mx-auto mb-2 opacity-50" />
                      <span className="text-sm">{property.type}</span>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`badge ${
                      property.badge === 'Hot Deal' ? 'badge-hot' :
                      property.badge === 'New' ? 'badge-new' : 'badge-sale'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Price */}
                  <div className="font-serif font-bold text-2xl text-brand-primary mb-1">
                    {property.priceLabel}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-semibold text-lg text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-4">
                    <MapPin size={14} className="text-brand-secondary flex-shrink-0" />
                    {property.location}
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-sm text-text-secondary border-t border-border pt-4 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Bed size={15} className="text-brand-primary" />
                      {property.bhk}
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5">
                      <Bath size={15} className="text-brand-primary" />
                      {property.bathrooms} Bath
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5">
                      <Maximize size={15} className="text-brand-primary" />
                      {property.area} {property.areaUnit}
                    </span>
                  </div>

                  {/* Code */}
                  <p className="text-xs text-text-muted mb-4">Code: {property.code}</p>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="btn-secondary flex-1 !py-2.5 !px-4 text-sm justify-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/919376786108?text=${encodeURIComponent(`Hi! I'm interested in ${property.title} (${property.code}) at ${property.location}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 !py-2.5 !px-4 text-sm justify-center"
                    >
                      Enquire Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
