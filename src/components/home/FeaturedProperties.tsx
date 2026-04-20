'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Bed, Bath, Maximize, MessageCircle, Home } from 'lucide-react'
import { getFeaturedProperties } from '@/data/properties'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getWhatsAppUrl } from '@/lib/utils'
import { Property } from '@/types/property'

const filters = ['All', 'Flat / Apartment', 'Independent House', 'Plot']

export function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [allProps, setAllProps] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getFeaturedProperties()
      setAllProps(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = activeFilter === 'All' ? allProps : allProps.filter(p => p.type === activeFilter)
  const displayProps = filtered.length > 0 ? filtered : allProps

  return (
    <section className="py-20 md:py-28 bg-brand-light">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <SectionHeading
            eyebrow="Curated"
            title="Handpicked for You"
            subtitle="Verified listings across Vadodara's most sought-after neighbourhoods"
          />
          <Link href="/properties" className="btn-ghost flex items-center gap-2 shrink-0">
            View All Properties <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`pill-toggle ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter === 'All' ? 'All Types' : filter}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card h-[400px] bg-white/50 animate-pulse rounded-2xl" />
          ))}
          {!loading && displayProps.slice(0, 6).map((property, i) => (
            <motion.div
              key={property.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="card group h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(!property.images || !property.images.length) && (
                      <div className="text-center text-white/50">
                        <Home size={40} className="mx-auto mb-1 opacity-40" />
                        <span className="text-xs">{property.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                    <div className="font-mono font-bold text-xl text-white">{property.priceLabel}</div>
                    <div className="flex items-center gap-3 text-white/80 text-xs mt-1">
                      <span>{property.bhk}</span>
                      <span>•</span>
                      <span>{property.area} {property.areaUnit}</span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span className={`badge ${
                      property.badge === 'Hot Deal' ? 'badge-hot' :
                      property.badge === 'New' ? 'badge-new' :
                      property.featured ? 'badge-featured' : 'badge-sale'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-sans font-semibold text-lg text-text-primary mb-2 group-hover:text-brand-secondary transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-4">
                    <MapPin size={14} className="text-brand-secondary flex-shrink-0" />
                    {property.location}
                  </div>

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

                  <p className="text-xs text-text-muted mb-4 font-mono">Code: {property.code}</p>

                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="btn-secondary flex-1 !py-2.5 !px-4 text-sm justify-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={getWhatsAppUrl(`Hi! I'm interested in the ${property.bhk} ${property.type} in ${property.locality} (Code: ${property.code}) priced at ${property.priceLabel}. Please share more details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shrink-0"
                      aria-label="Enquire via WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {!loading && displayProps.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No properties found matching your selection.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
