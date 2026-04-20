import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { Home, Search, MapPin, Key, MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Buying Property | Morin Property Vadodara',
  description: 'Expert guidance to find your dream home in Vadodara. RERA verified properties, end-to-end support.',
}

export default function BuyingPropertyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page charcoal-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Buying Property' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Buying <span className="gold-gradient-text">Property</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6">Find Your Dream Home with Confidence</h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8">
                <p>Buying a home is one of the most important financial and emotional decisions a family makes. Yet, the process is often filled with opaque pricing, unverified properties, and endless paperwork.</p>
                <p>At Morin Property, we take the stress out of property buying. We don&apos;t just show you houses; we understand your family&apos;s needs, shortlist RERA-verified properties, negotiate the best prices, and handle all the legalities until the keys are in your hand.</p>
              </div>
              <div className="space-y-3 mb-8">
                {['100% RERA Verified Listings', 'Honest & Transparent Pricing', 'End-to-End Legal Support', 'Zero Hidden Charges'].map(item => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary">
                    <CheckCircle2 size={20} className="text-brand-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image src="/images/gallery-images/12.jpg" alt="Buying Property with Morin Property" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="section-title text-3xl text-center mb-12">The Buying Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: MessageCircle, title: '1. Consultation', desc: 'We understand your exact requirements, budget, and preferred localities.' },
              { icon: Search, title: '2. Curated Shortlist', desc: 'We present a handpicked list of properties matching your criteria.' },
              { icon: MapPin, title: '3. Guided Site Visits', desc: 'We accompany you to every property, providing honest feedback.' },
              { icon: Key, title: '4. Legal & Possession', desc: 'We handle negotiations, verification, and registration seamlessly.' },
            ].map(step => (
              <div key={step.title} className="card-static p-6 !rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4">
                  <step.icon size={20} className="text-brand-secondary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-text-primary">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-6">Ready to find your new home?</h2>
          <p className="text-text-secondary mb-8">Let&apos;s sit down and discuss what you&apos;re looking for over a cup of coffee.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal"><Phone size={18} /> Call to Discuss</a>
            <a href={getWhatsAppUrl("Hello! I want to start my property search in Vadodara with Morin Property.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle size={18} /> WhatsApp Us</a>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
