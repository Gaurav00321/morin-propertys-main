'use client'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { getProperties } from '@/data/properties'
import { localities } from '@/data/localities'
import {
  MapPin, Bed, Bath, Maximize, Search, SlidersHorizontal,
  X, MessageCircle, Home, ArrowRight, ChevronDown,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { Property } from '@/types/property'

const propertyTypes = ['All', 'Flat / Apartment', 'Independent House', 'Plot']
const bhkOptions = ['All', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK']
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Area: Largest', value: 'area-desc' },
]

export default function PropertiesPage() {
  const [dbProperties, setDbProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('All')
  const [localityFilter, setLocalityFilter] = useState('All')
  const [bhkFilter, setBhkFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getProperties()
      setDbProperties(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = [...dbProperties]

    if (typeFilter !== 'All') {
      result = result.filter(p => p.type === typeFilter)
    }
    if (localityFilter !== 'All') {
      result = result.filter(p => p.locality === localityFilter)
    }
    if (bhkFilter !== 'All') {
      result = result.filter(p => p.bhk.includes(bhkFilter.replace(' BHK', '')))
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'area-desc':
        result.sort((a, b) => b.area - a.area)
        break
    }

    return result
  }, [dbProperties, typeFilter, localityFilter, bhkFilter, sortBy])

  const hasActiveFilters = typeFilter !== 'All' || localityFilter !== 'All' || bhkFilter !== 'All'

  const clearFilters = () => {
    setTypeFilter('All')
    setLocalityFilter('All')
    setBhkFilter('All')
    setSortBy('newest')
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-black relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero/properties.png"
            alt="Properties in Vadodara"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/50 z-10" />
        </div>
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Properties' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Explore <span className="gold-gradient-text">Properties</span>
          </h1>
          <p className="text-white/70 text-lg mt-4">
            {loading ? '...' : dbProperties.length} verified listings across Vadodara
          </p>
        </div>
      </section>

      {/* Filter + Results */}
      <section className="py-8 md:py-12 bg-brand-light min-h-[60vh]">
        <div className="section-container">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <p className="text-text-secondary text-sm">
              Showing <span className="font-bold text-text-primary">{filtered.length}</span> of {dbProperties.length} properties
              {hasActiveFilters && (
                <button onClick={clearFilters} className="ml-3 text-brand-secondary text-xs font-semibold hover:underline">
                  Clear all filters
                </button>
              )}
            </p>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="select !h-10 !text-xs !pr-10 !pl-3 !rounded-full"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border bg-white hover:border-brand-secondary transition-all"
              >
                <SlidersHorizontal size={14} />
                Filters {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-brand-secondary" />}
              </button>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Sidebar Filters — Desktop */}
            <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:static lg:bg-transparent' : 'hidden lg:block'}`}>
              <div className={`${showFilters ? 'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto lg:static lg:max-w-none lg:p-0' : ''}`}>
                {/* Mobile close */}
                {showFilters && (
                  <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-4 right-4 p-2">
                    <X size={20} />
                  </button>
                )}

                <div className="card-static p-6 !rounded-2xl space-y-6">
                  <h3 className="font-serif font-bold text-lg">Filters</h3>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">Property Type</label>
                    <div className="space-y-1.5">
                      {propertyTypes.map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="type"
                            checked={typeFilter === type}
                            onChange={() => setTypeFilter(type)}
                            className="accent-brand-secondary w-4 h-4"
                          />
                          <span className={`text-sm ${typeFilter === type ? 'text-text-primary font-semibold' : 'text-text-secondary group-hover:text-text-primary'} transition-colors`}>
                            {type === 'All' ? 'All Types' : type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Locality */}
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">Locality</label>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="locality" checked={localityFilter === 'All'} onChange={() => setLocalityFilter('All')} className="accent-brand-secondary w-4 h-4" />
                        <span className={`text-sm ${localityFilter === 'All' ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>All Localities</span>
                      </label>
                      {localities.map(loc => (
                        <label key={loc.slug} className="flex items-center justify-between gap-2 cursor-pointer group">
                          <div className="flex items-center gap-2">
                            <input type="radio" name="locality" checked={localityFilter === loc.name} onChange={() => setLocalityFilter(loc.name)} className="accent-brand-secondary w-4 h-4" />
                            <span className={`text-sm ${localityFilter === loc.name ? 'text-text-primary font-semibold' : 'text-text-secondary group-hover:text-text-primary'} transition-colors`}>
                              {loc.name}
                            </span>
                          </div>
                          <span className="text-xs px-2 py-0.5 bg-brand-light rounded-full text-text-muted font-mono">{loc.propertyCount}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* BHK */}
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">BHK</label>
                    <div className="flex flex-wrap gap-2">
                      {bhkOptions.map(bhk => (
                        <button
                          key={bhk}
                          onClick={() => setBhkFilter(bhk)}
                          className={`pill-toggle text-xs ${bhkFilter === bhk ? 'active' : ''}`}
                        >
                          {bhk === 'All' ? 'All' : bhk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="btn-ghost text-sm w-full justify-center !text-brand-terracotta">
                      <X size={14} /> Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card h-[400px] bg-white animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="card-static p-16 text-center !rounded-2xl">
                  <Search size={48} className="text-text-muted/30 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-xl text-text-primary mb-2">No properties found</h3>
                  <p className="text-text-secondary text-sm mb-6">Try adjusting your filters or browse all listings.</p>
                  <button onClick={clearFilters} className="btn-primary">View All Properties</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((property, i) => (
                    <motion.div
                      key={property.code}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.3) }}
                    >
                      <div className="card group h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                          {property.images && property.images.length > 0 ? (
                            <Image src={property.images[0]} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20" />
                          )}
                          {(!property.images || !property.images.length) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Home size={40} className="text-white/30" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                            <div className="font-mono font-bold text-xl text-white">{property.priceLabel}</div>
                          </div>
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`badge ${property.badge === 'Hot Deal' ? 'badge-hot' : property.badge === 'New' ? 'badge-new' : 'badge-featured'}`}>
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
                          <div className="flex items-center gap-3 text-sm text-text-secondary border-t border-border pt-4 mb-4">
                            <span className="flex items-center gap-1"><Bed size={14} /> {property.bhk}</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}B</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Maximize size={14} /> {property.area}{property.areaUnit}</span>
                          </div>
                          <div className="flex gap-3 mt-auto">
                            <Link href={`/properties/${property.slug}`} className="btn-secondary flex-1 !py-2.5 !px-4 text-sm justify-center">
                              View Details
                            </Link>
                            <a
                              href={getWhatsAppUrl(`Hi! Interested in ${property.title} (${property.code}) — ${property.priceLabel}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shrink-0"
                            >
                              <MessageCircle size={16} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
