'use client'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const heroImages = [
  '/images/hero/home -hero/559711.jpg',
  '/images/hero/home -hero/559712.jpg'
]

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'rent'>('buy')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = () => {
    router.push('/properties')
  }

  return (
    <section className="hero-section hero-section--home relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={src}
              alt="Premium Real Estate Vadodara"
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Black overlay for maximum readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className=" relative z-20 text-center w-full max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8"
        >
          🏠 Vadodara&apos;s Trusted Real Estate Partner
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-serif font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.1] mb-6"
        >
          Find Your Perfect
          <br />
          <span className="gold-gradient-text">Home in Vadodara</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden sm:block text-white drop-shadow-md text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Trusted real estate experts helping families buy, sell, and invest
          with confidence across Vadodara&apos;s finest localities.
        </motion.p>

        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card-glass p-4 sm:p-6 max-w-3xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-white/10 rounded-full p-1 max-w-xs mx-auto">
            {(['buy', 'sell', 'rent'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-brand-secondary text-white shadow-cta'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <select className="w-full h-12 px-4 bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary">
                <option value="" className="text-text-primary">Property Type</option>
                <option value="flat" className="text-text-primary">Flat / Apartment</option>
                <option value="house" className="text-text-primary">Independent House</option>
                <option value="plot" className="text-text-primary">Plot</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full h-12 px-4 bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary">
                <option value="" className="text-text-primary">Locality</option>
                <option value="waghodia" className="text-text-primary">Waghodia Road</option>
                <option value="ajwa" className="text-text-primary">Ajwa Road</option>
                <option value="jarod" className="text-text-primary">Jarod</option>
                <option value="subhanpura" className="text-text-primary">Subhanpura</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="w-full h-12 px-4 bg-white/15 border border-white/20 rounded-xl text-white text-sm font-medium appearance-none focus:outline-none focus:border-brand-secondary">
                <option value="" className="text-text-primary">Budget Range</option>
                <option value="20-30" className="text-text-primary">₹20 Lac - ₹30 Lac</option>
                <option value="30-50" className="text-text-primary">₹30 Lac - ₹50 Lac</option>
                <option value="50-75" className="text-text-primary">₹50 Lac - ₹75 Lac</option>
                <option value="75+" className="text-text-primary">₹75 Lac+</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="btn-primary w-full mt-4 !py-3.5 text-base"
          >
            <Search size={18} />
            Search Properties
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center mx-auto">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
