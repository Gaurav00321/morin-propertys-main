'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, MapPin, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const heroImages = [
  '/images/hero/home -hero/559711.jpg',
  '/images/hero/home -hero/559712.jpg',
]

const popularLocalities = ['Waghodia Road', 'Subhanpura', 'Ajwa Road', 'Jarod']

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'projects'>('buy')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [propertyType, setPropertyType] = useState('')
  const [locality, setLocality] = useState('')
  const [budget, setBudget] = useState('')
  const [bhk, setBhk] = useState('')
  const [viewerCount, setViewerCount] = useState(8)
  const router = useRouter()

  useEffect(() => {
    setViewerCount(Math.floor(Math.random() * 8) + 5)
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (locality) params.set('locality', locality)
    if (propertyType) params.set('type', propertyType)
    router.push(`/properties${params.toString() ? '?' + params.toString() : ''}`)
  }

  return (
    <section className="hero-section hero-section--home relative overflow-hidden bg-brand-primary">
      {/* Ken Burns Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt="Premium Real Estate Vadodara"
              fill
              priority={index === 0}
              className="object-cover object-center animate-ken-burns"
              sizes="100vw"
            />
          </div>
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 via-brand-primary/40 to-brand-primary/80 z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Headline */}
          <div className="text-center lg:text-left">
            {/* Live Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {viewerCount} people exploring properties right now
            </motion.div>

            {/* Headline — Character Stagger */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.08] mb-6"
            >
              Find Where
              <br />
              <span className="gold-gradient-text">Your Story Begins.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Vadodara&apos;s most trusted real estate partner — 325+ families and counting.
            </motion.p>

            {/* Popular localities */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="hidden lg:flex items-center gap-3 flex-wrap"
            >
              <span className="text-white/40 text-sm">Popular:</span>
              {popularLocalities.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocality(loc)
                    router.push(`/properties?locality=${encodeURIComponent(loc)}`)
                  }}
                  className="text-sm text-white/60 hover:text-brand-secondary px-3 py-1 rounded-full border border-white/10 hover:border-brand-secondary/50 transition-all"
                >
                  {loc}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right: Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="card-glass p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex gap-1 mb-6 bg-white/10 rounded-full p-1">
                {(['buy', 'rent', 'projects'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-brand-secondary text-white shadow-cta'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab === 'projects' ? 'New Projects' : tab}
                  </button>
                ))}
              </div>

              {/* Fields */}
              <div className="space-y-3">
                {/* Property Type */}
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value)}
                    className="w-full h-12 px-4 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary transition-colors"
                  >
                    <option value="" className="text-text-primary">🏠 Property Type</option>
                    <option value="Flat / Apartment" className="text-text-primary">Flat / Apartment</option>
                    <option value="Independent House" className="text-text-primary">Independent House</option>
                    <option value="Plot" className="text-text-primary">Plot</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>

                {/* Locality */}
                <div className="relative">
                  <select
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full h-12 px-4 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary transition-colors"
                  >
                    <option value="" className="text-text-primary">📍 Locality</option>
                    <option value="Waghodia Road" className="text-text-primary">Waghodia Road</option>
                    <option value="Ajwa Road" className="text-text-primary">Ajwa Road</option>
                    <option value="Jarod" className="text-text-primary">Jarod</option>
                    <option value="Subhanpura" className="text-text-primary">Subhanpura</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>

                {/* Budget + BHK Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={e => setBudget(e.target.value)}
                      className="w-full h-12 px-4 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary transition-colors"
                    >
                      <option value="" className="text-text-primary">💰 Budget</option>
                      <option value="20-30" className="text-text-primary">₹20L - ₹30L</option>
                      <option value="30-50" className="text-text-primary">₹30L - ₹50L</option>
                      <option value="50-75" className="text-text-primary">₹50L - ₹75L</option>
                      <option value="75+" className="text-text-primary">₹75L+</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                  </div>
                  <div className="flex gap-1.5">
                    {['2', '3', '4', '5+'].map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBhk(bhk === b ? '' : b)}
                        className={`flex-1 h-12 rounded-xl text-sm font-semibold transition-all ${
                          bhk === b
                            ? 'bg-brand-secondary text-white'
                            : 'bg-white/10 border border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                className="btn-primary w-full mt-5 !py-3.5 text-base"
              >
                <Search size={18} />
                Explore Properties
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest font-medium block mb-3">Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center mx-auto">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
