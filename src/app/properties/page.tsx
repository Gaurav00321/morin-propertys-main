'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { properties } from '@/data/properties'
import { MapPin, Bed, Bath, Maximize, Search, SlidersHorizontal, X, Home } from 'lucide-react'
import { motion } from 'framer-motion'

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [propertyType, setPropertyType] = useState('')
  const [locality, setLocality] = useState(searchParams.get('locality') || '')
  const [bhk, setBhk] = useState('')

  useEffect(() => {
    const loc = searchParams.get('locality')
    if (loc) setLocality(loc)
  }, [searchParams])
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...properties]
    if (propertyType) result = result.filter(p => p.type === propertyType)
    if (locality) result = result.filter(p => p.locality === locality)
    if (bhk) result = result.filter(p => p.bhk.startsWith(bhk))
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'area') result.sort((a, b) => b.area - a.area)
    return result
  }, [propertyType, locality, bhk, sortBy])

  const resetFilters = () => {
    setPropertyType('')
    setLocality('')
    setBhk('')
    setSortBy('newest')
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/properties.png" 
            alt="Properties for Sale in Vadodara" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Properties' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Properties for Sale in <span className="gold-gradient-text">Vadodara</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4 max-w-2xl mx-auto">
            Browse verified properties across Vadodara&apos;s finest localities
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-brand-light">
        <div className="section-container">
          <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Filter Sidebar - Desktop */}
            <aside className="hidden lg:block">
              <div className="card p-6 !rounded-2xl sticky top-24">
                <h3 className="font-serif font-bold text-lg mb-6 flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-brand-secondary" />
                  Filters
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">Property Type</label>
                    <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="select">
                      <option value="">All Types</option>
                      <option value="Flat / Apartment">Flat / Apartment</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">Locality</label>
                    <select value={locality} onChange={e => setLocality(e.target.value)} className="select">
                      <option value="">All Localities</option>
                      <option value="Waghodia Road">Waghodia Road</option>
                      <option value="Ajwa Road">Ajwa Road</option>
                      <option value="Jarod">Jarod</option>
                      <option value="Subhanpura">Subhanpura</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-2 block">BHK Config</label>
                    <select value={bhk} onChange={e => setBhk(e.target.value)} className="select">
                      <option value="">All BHK</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={resetFilters} className="btn-secondary flex-1 !py-2 text-sm">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary !py-2 !px-4 text-sm"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="select !w-auto !h-10 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area">Area: Largest</option>
              </select>
            </div>

            {/* Property Grid */}
            <div>
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-text-secondary text-sm">
                  Showing <strong className="text-text-primary">{filtered.length}</strong> properties
                </p>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="select !w-auto !h-10 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Area: Largest</option>
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="card p-12 text-center !rounded-2xl">
                  <Search size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-xl mb-2">No properties found</h3>
                  <p className="text-text-secondary mb-4">The properties will be added in future.</p>
                  <button onClick={resetFilters} className="btn-primary mx-auto">Reset Filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((property, i) => (
                    <motion.div
                      key={property.code}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="card group h-full flex flex-col !rounded-2xl">
                        <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Home size={40} className="text-white/40" />
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className={`badge ${property.badge === 'Hot Deal' ? 'badge-hot' : 'badge-sale'}`}>
                              {property.badge}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="font-serif font-bold text-xl text-brand-primary mb-1">{property.priceLabel}</div>
                          <h3 className="font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">{property.title}</h3>
                          <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-3">
                            <MapPin size={14} className="text-brand-secondary" /> {property.location}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-text-secondary border-t border-border pt-3 mb-4">
                            <span className="flex items-center gap-1"><Bed size={14} /> {property.bhk}</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms} Bath</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Maximize size={14} /> {property.area} {property.areaUnit}</span>
                          </div>
                          <div className="flex gap-3 mt-auto">
                            <Link href={`/properties/${property.slug}`} className="btn-secondary flex-1 !py-2 text-sm justify-center">
                              View Details
                            </Link>
                            <a
                              href={`https://wa.me/919376786108?text=${encodeURIComponent(`Hi! I'm interested in ${property.title} (${property.code})`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="btn-primary flex-1 !py-2 text-sm justify-center"
                            >
                              Enquire Now
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

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading properties...</div>
      </main>
    }>
      <PropertiesContent />
    </Suspense>
  )
}
