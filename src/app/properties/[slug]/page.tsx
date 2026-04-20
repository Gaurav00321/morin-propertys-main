import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { getPropertyBySlug, getProperties } from '@/data/properties'
import { MapPin, Bed, Bath, Maximize, Compass, Calendar, Car, Building2, Phone, MessageCircle, Home, ArrowRight, Share2, Shield, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'
import { PropertyEnquiryForm } from '@/components/property/PropertyEnquiryForm'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug)
  if (!property) return {}
  return {
    title: `${property.title} for Sale in ${property.locality} | Morin Property`,
    description: `${property.title} — ${property.priceLabel}. ${property.bhk}, ${property.area} ${property.areaUnit} in ${property.location}. Verified listing by Morin Property Vadodara.`,
  }
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug)
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

  // Find similar properties
  const allProperties = await getProperties()
  const similar = allProperties.filter(p => p.code !== property.code && p.locality === property.locality).slice(0, 3)
  const fallbackSimilar = similar.length > 0 ? similar : allProperties.filter(p => p.code !== property.code).slice(0, 3)

  // Simple EMI estimate
  const emiRate = 8.5 / 12 / 100
  const emiTenure = 20 * 12
  const emiAmount = property.price * 0.8 // 80% loan
  const emi = emiRate > 0 ? (emiAmount * emiRate * Math.pow(1 + emiRate, emiTenure)) / (Math.pow(1 + emiRate, emiTenure) - 1) : 0

  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/70 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[
            { label: 'Properties', href: '/properties' },
            { label: property.title },
          ]} />
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-white mt-6">
            {property.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/70 mt-3">
            <MapPin size={16} className="text-brand-secondary" />
            {property.location}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 lg:col-span-2 lg:row-span-2">
              {property.images.length > 0 ? (
                <Image src={property.images[0]} alt={property.title} fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-text-muted">
                    <Home size={64} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">Property photo coming soon</p>
                    <p className="text-xs text-text-muted mt-1">Contact us for a site visit</p>
                  </div>
                </div>
              )}
            </div>
            {/* Show up to 6 more images in a grid */}
            {(property.images.length > 1 ? property.images.slice(1, 7) : []).map((src, n) => (
              <div key={src} className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden">
                <Image src={src} alt={`${property.title} photo ${n + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          
          {/* If there are more than 7 images, show a horizontal scroller for the rest */}
          {property.images.length > 7 && (
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {property.images.slice(7).map((src, i) => (
                <div key={src} className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                  <Image src={src} alt={`${property.title} photo ${i + 8}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      {property.videos && property.videos.length > 0 && (
        <section className="py-8 bg-brand-primary text-white">
          <div className="section-container">
            <h2 className="font-serif font-bold text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-secondary/20 flex items-center justify-center">
                <Building2 size={20} className="text-brand-secondary" />
              </div>
              Virtual Property Tour
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {property.videos.map((v, i) => (
                <div key={v} className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                    poster={property.images[0]}
                  >
                    <source src={v} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Rest of component stays the same, using properties from the property object */}
      <section className="py-8 md:py-12 bg-brand-light">
        <div className="section-container">
          <div className="lg:grid lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-6">
              <div className="card-static p-6 md:p-8 !rounded-2xl">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono font-bold text-3xl text-brand-secondary">{property.priceLabel}</div>
                    {emi > 0 && (
                      <p className="text-text-muted text-sm mt-1">
                        EMI from <span className="font-mono font-semibold text-text-primary">₹{Math.round(emi).toLocaleString('en-IN')}/mo</span>
                        <Link href="/tools/emi-calculator" className="text-brand-secondary ml-2 text-xs font-semibold hover:underline">Calculate →</Link>
                      </p>
                    )}
                    <h2 className="font-serif font-bold text-xl text-text-primary mt-3">{property.title} for Sale</h2>
                    <div className="flex items-center gap-2 text-text-secondary text-sm mt-2">
                      <MapPin size={14} className="text-brand-secondary" />
                      {property.location}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`badge ${property.badge === 'Hot Deal' ? 'badge-hot' : 'badge-sale'}`}>{property.badge}</span>
                    <span className="badge bg-brand-light text-text-secondary font-mono">Code: {property.code}</span>
                  </div>
                </div>
              </div>

              <div className="card-static p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-6">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map(spec => (
                    <div key={spec.label} className="p-4 bg-brand-light rounded-xl text-center">
                      <spec.icon size={20} className="text-brand-secondary mx-auto mb-2" />
                      <div className="font-bold text-text-primary text-sm font-mono">{spec.value}</div>
                      <div className="text-text-muted text-xs mt-1">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-static p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-4">Description</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{property.description}</p>
                {property.highlights && property.highlights.length > 0 && (
                  <>
                    <h4 className="font-bold text-text-primary mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {property.highlights.map(h => (
                        <li key={h} className="flex items-start gap-2 text-text-secondary text-sm">
                          <CheckCircle2 size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="card-static p-6 md:p-8 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-4">Location & Map</h3>
                <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-brand-light">
                  <iframe
                    src={property.mapEmbedUrl || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1710!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a59614c2e5%3A0xd6ffe77c7e4b0b12!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title={`Map of ${property.location}`}
                  />
                </div>
                {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
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

            <div className="mt-8 lg:mt-0">
              <div className="card-static p-6 !rounded-2xl sticky top-24 space-y-6">
                <h3 className="font-serif font-bold text-xl">Interested in this property?</h3>
                <PropertyEnquiryForm propertyTitle={property.title} propertyCode={property.code} />
                <div className="flex gap-3">
                  <a href={getCallUrl()} className="btn-charcoal flex-1 !py-3 justify-center text-sm"><Phone size={16} /> Call</a>
                  <a href={getWhatsAppUrl(`Hi! I'm interested in ${property.title} (${property.code})`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 !py-3 justify-center text-sm"><MessageCircle size={16} /> WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fallbackSimilar.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="section-container">
            <h2 className="section-title text-2xl md:text-3xl mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fallbackSimilar.map(p => (
                <Link key={p.code} href={`/properties/${p.slug}`} className="card group flex flex-col">
                  <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/10' }}>
                    <Image src={p.images[0] || '/images/hero/properties.png'} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                      <div className="font-mono font-bold text-lg text-white">{p.priceLabel}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-brand-secondary transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-1 text-text-secondary text-sm"><MapPin size={12} className="text-brand-secondary" /> {p.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
