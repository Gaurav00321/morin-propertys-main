import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { properties, getPropertyBySlug } from '@/data/properties'
import { MapPin, Bed, Bath, Maximize, Compass, Calendar, Car, Building2, Phone, MessageCircle, Home } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'
import Link from 'next/link'

export async function generateStaticParams() {
  return properties.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug)
  if (!property) return {}
  return {
    title: `${property.title} for Sale in ${property.locality} | Morin Property`,
    description: `${property.title} — ${property.priceLabel}. ${property.bhk}, ${property.area} ${property.areaUnit} in ${property.location}. Verified listing by Morin Property.`,
  }
}

export default function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug)
  if (!property) notFound()

  const specs = [
    { icon: Bed, label: 'Bedrooms', value: `${property.bedrooms}` },
    { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms}` },
    { icon: Maximize, label: 'Area', value: `${property.area} ${property.areaUnit}` },
    { icon: Building2, label: 'Floor', value: property.floor || 'N/A' },
    { icon: Compass, label: 'Facing', value: property.facing || 'N/A' },
    { icon: Calendar, label: 'Age', value: property.age || 'N/A' },
    { icon: Car, label: 'Parking', value: property.parking || 'N/A' },
  ]

  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-brand-primary min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[
            { label: 'Properties', href: '/properties' },
            { label: property.title },
          ]} />
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-white mt-6">
            {property.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-white drop-shadow-md mt-3">
            <MapPin size={16} className="text-brand-secondary" />
            {property.location}
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
              <div className="text-center text-text-muted">
                <Home size={64} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Primary Image</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 flex items-center justify-center">
                  <Home size={24} className="text-text-muted opacity-30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-8 md:py-12 bg-brand-light">
        <div className="section-container">
          <div className="lg:grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left: Details */}
            <div className="space-y-8">
              {/* Price & Header */}
              <div className="card p-6 md:p-8 !rounded-2xl">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-serif font-bold text-3xl text-brand-secondary">{property.priceLabel}</div>
                    <h2 className="font-serif font-bold text-xl text-text-primary mt-2">{property.title} for Sale</h2>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mt-2">
                      <MapPin size={14} className="text-brand-secondary" />
                      {property.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`badge ${property.badge === 'Hot Deal' ? 'badge-hot' : 'badge-sale'}`}>{property.badge}</span>
                    <span className="badge bg-brand-light text-text-secondary">Code: {property.code}</span>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="card p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-6">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map(spec => (
                    <div key={spec.label} className="p-4 bg-brand-light rounded-xl text-center">
                      <spec.icon size={20} className="text-brand-primary mx-auto mb-2" />
                      <div className="font-bold text-text-primary text-sm">{spec.value}</div>
                      <div className="text-text-muted text-xs mt-1">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="card p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-4">Description</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{property.description}</p>
                <h4 className="font-bold text-text-primary mb-3">Key Highlights</h4>
                <ul className="space-y-2">
                  {property.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="card p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-4">Location & Map</h3>
                <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-brand-light">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1710!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a59614c2e5%3A0xd6ffe77c7e4b0b12!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title={`Map of ${property.location}`}
                  />
                </div>
                {property.nearbyPlaces && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {property.nearbyPlaces.map(place => (
                      <div key={place.name} className="flex items-center gap-2 text-sm text-text-secondary">
                        <MapPin size={14} className="text-brand-secondary flex-shrink-0" />
                        <span>{place.name} — {place.distance}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="mt-8 lg:mt-0">
              <div className="card p-6 !rounded-2xl sticky top-24">
                <h3 className="font-serif font-bold text-xl mb-6">Interested in this property?</h3>
                <form className="space-y-4" action="#">
                  <input type="text" placeholder="Your Name *" className="input" required />
                  <input type="tel" placeholder="Phone Number *" className="input" required />
                  <input type="email" placeholder="Email Address" className="input" />
                  <textarea placeholder="Message (optional)" className="textarea" rows={3} />
                  <button type="button" className="btn-primary w-full">Send Enquiry</button>
                </form>
                <div className="flex gap-3 mt-4">
                  <a href={getCallUrl()} className="btn-secondary flex-1 !py-3 justify-center text-sm">
                    <Phone size={16} /> Call
                  </a>
                  <a
                    href={getWhatsAppUrl(`Hi! I'm interested in ${property.title} (${property.code}) — ${property.priceLabel}`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp flex-1 !py-3 justify-center text-sm"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 flex gap-3 lg:hidden z-40">
        <a href={getCallUrl()} className="btn-navy flex-1 !py-3 justify-center text-sm">
          <Phone size={16} /> Call Agent
        </a>
        <a href={getWhatsAppUrl(`Hi! Interested in ${property.code}`)} target="_blank" rel="noopener noreferrer"
          className="btn-whatsapp flex-1 !py-3 justify-center text-sm">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>

      <Footer />
    </main>
  )
}
