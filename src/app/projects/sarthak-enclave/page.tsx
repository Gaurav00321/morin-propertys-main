import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { MapPin, Building2, CheckCircle2, Phone, MessageCircle, Car, Shield, Zap, Trees, Users, Dumbbell } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Sarthak Enclave | Premium Apartments in Subhanpura, Vadodara',
  description: 'Discover Sarthak Enclave by Morin Property — premium 2 BHK & 3 BHK apartments in Subhanpura, Vadodara. Modern amenities, RERA compliant.',
}

const amenities = [
  { icon: Building2, label: 'Lift' },
  { icon: Car, label: 'Parking' },
  { icon: Shield, label: '24/7 Security' },
  { icon: Zap, label: 'Power Backup' },
  { icon: Trees, label: 'Garden' },
  { icon: Users, label: 'Community Hall' },
]

export default function SarthakEnclavePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-images/10.jpg"
            alt="Sarthak Enclave Premium Apartments"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: 'Sarthak Enclave' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-white mt-6">Sarthak Enclave</h1>
          <div className="flex items-center justify-center gap-2 text-white/70 mt-4 text-lg">
            <MapPin size={18} className="text-brand-secondary" /> Subhanpura, Vadodara
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="section-eyebrow">Overview</p>
            <h2 className="section-title text-3xl md:text-4xl mb-6">Project Overview</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Sarthak Enclave is a premium residential project located in Subhanpura, one of Vadodara&apos;s most
              prestigious neighbourhoods. The project offers thoughtfully designed apartments with modern
              amenities, ensuring a comfortable and convenient lifestyle for families.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Prime Location', 'Modern Amenities', 'RERA Compliant', 'Easy Home Loan'].map(item => (
                <div key={item} className="flex items-center gap-2 p-3 bg-brand-light rounded-xl">
                  <CheckCircle2 size={16} className="text-brand-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unit Configs */}
      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12">Floor Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {['2 BHK — Compact Living', '3 BHK — Spacious Family'].map(config => (
              <div key={config} className="card-static p-8 !rounded-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 size={28} className="text-brand-secondary" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{config}</h3>
                <p className="text-text-secondary text-sm">Floor plan available on request</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {amenities.map(amenity => (
              <div key={amenity.label} className="p-6 bg-brand-light rounded-2xl text-center hover:bg-brand-secondary/5 transition-colors">
                <amenity.icon size={28} className="text-brand-secondary mx-auto mb-3" />
                <span className="text-sm font-medium text-text-primary">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <h2 className="section-title text-3xl text-center mb-12">Location</h2>
          <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px] mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691!2d73.18!3d22.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc58e9!2sSubhanpura%2C%20Vadodara!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Sarthak Enclave Location" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { place: 'Vadodara Airport', distance: '12 km' },
              { place: 'Railway Station', distance: '5 km' },
              { place: 'Schools & Colleges', distance: '1-3 km' },
              { place: 'Hospitals', distance: '2-4 km' },
            ].map(d => (
              <div key={d.place} className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin size={14} className="text-brand-secondary flex-shrink-0" />
                <span>{d.place}: {d.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section className="py-16 md:py-24 charcoal-gradient">
        <div className="section-container text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-4">Interested in Sarthak Enclave?</h2>
          <p className="text-white/60 mb-8">Register your interest or contact us for more details</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-white">
              <Phone size={18} /> Call Now
            </a>
            <a href={getWhatsAppUrl("Hi! I'm interested in Sarthak Enclave project in Subhanpura. Please share availability and pricing details.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
