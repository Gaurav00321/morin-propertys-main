import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { TrendingUp, BarChart3, Users, Globe, FileText, CheckCircle2, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Real Estate Consulting | Expert Property Advice Vadodara',
  description: 'Get unbiased, transparent real estate advice from Morin Property. Investment advisory, property valuation, NRI consulting for Vadodara market.',
}

const consultingServices = [
  { icon: TrendingUp, title: 'Investment Advisory', desc: 'Identify high-growth micro-markets in Vadodara' },
  { icon: BarChart3, title: 'Buy vs. Rent Analysis', desc: 'Tailored financial modelling for your situation' },
  { icon: FileText, title: 'Property Valuation', desc: 'Market-aligned pricing for buyers and sellers' },
  { icon: Users, title: 'Portfolio Review', desc: 'For multi-property investors' },
  { icon: Globe, title: 'NRI Property Consulting', desc: 'Complete remote assistance for Gujarat NRIs' },
]

export default function ConsultantPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/consultant.png" 
            alt="Expert Consulting" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Real Estate Consulting' }]} />
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mt-6">
            Expert Real Estate <span className="gold-gradient-text">Advice</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4">Unbiased, Transparent, Personalised</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="text-text-secondary text-lg leading-relaxed">
            Whether you&apos;re a first-time buyer, a seasoned investor, or a homeowner looking to sell,
            Morin Property&apos;s real estate consulting service gives you the clarity and confidence to make
            the right decisions. We provide honest, data-driven advice based on deep knowledge of the
            Vadodara property market.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">What We Offer</p>
            <h2 className="section-title text-3xl md:text-4xl">Consulting Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingServices.map(service => (
              <div key={service.title} className="card p-6 !rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4">
                  <service.icon size={22} className="text-brand-secondary" />
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-8">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '5+ years of Vadodara real estate market experience',
              '325+ successful client transactions',
              'Relationships with top Vadodara builders',
              'Active CREDAI and NAR member',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-4 bg-brand-light rounded-xl">
                <CheckCircle2 size={18} className="text-brand-accent flex-shrink-0" />
                <span className="text-text-primary text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container">
          <div className="max-w-2xl mx-auto card p-8 !rounded-2xl shadow-card-hover border border-border">
            <div className="text-center mb-8">
              <h2 className="section-title text-2xl md:text-3xl mb-2">Book a Free Consultation</h2>
              <p className="text-text-secondary">Get expert advice — no obligation, no pressure.</p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" autoComplete="name" className="input" required />
                <input type="tel" placeholder="Phone Number *" autoComplete="tel" className="input" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address" autoComplete="email" className="input" />
                <select className="select" required>
                  <option value="">I am looking for...</option>
                  <option>Investment Advisory</option>
                  <option>Buy vs. Rent Analysis</option>
                  <option>Property Valuation</option>
                  <option>NRI Consulting</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea placeholder="Tell us briefly about your situation (Optional)" rows={3} className="textarea" />
              <button type="submit" className="btn-primary w-full justify-center !py-3">
                <Send size={18} /> Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
