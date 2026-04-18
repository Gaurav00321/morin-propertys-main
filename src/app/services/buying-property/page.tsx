'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { buyingFaqs } from '@/data/faqs'
import { ChevronDown, Search, ClipboardCheck, MapPin, Shield, Handshake, Key, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const steps = [
  { icon: Search, title: 'Understanding Your Needs', desc: 'We listen to your budget, preferences, and lifestyle requirements.' },
  { icon: MapPin, title: 'Property Search', desc: 'We shortlist verified properties across Vadodara\'s best localities.' },
  { icon: ClipboardCheck, title: 'Site Visits', desc: 'We accompany you on property tours at your convenience.' },
  { icon: Shield, title: 'Legal Verification', desc: 'We confirm clean titles, RERA compliance, and all documentation.' },
  { icon: Handshake, title: 'Price Negotiation', desc: 'Our experts negotiate the best deal on your behalf.' },
  { icon: Key, title: 'Registration & Possession', desc: 'We guide you through paperwork, registration, and handover.' },
]

export default function BuyingPropertyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/buying-property.png" 
            alt="Buying Property Assistance" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Buying Property' }]} />
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mt-6">
            Find the Perfect Property in <span className="gold-gradient-text">Vadodara</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4 max-w-2xl mx-auto">We Guide Every Step</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="text-text-secondary text-lg leading-relaxed">
            At Morin Property, we understand that buying a home is one of the most significant
            decisions of your life. Our dedicated team of property experts in Vadodara provides
            personalised guidance from the very first search to the day you receive your keys — and beyond.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Our Process</p>
            <h2 className="section-title text-3xl md:text-4xl">Our 6-Step Buying Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="card p-6 !rounded-2xl relative">
                <div className="absolute top-4 right-4 text-4xl font-serif font-bold text-brand-primary/10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-brand-secondary" />
                </div>
                <h3 className="font-serif font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Through Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-8">Why Buy Through Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Access to exclusive off-market properties',
              '100% verified listings, no hidden surprises',
              'No pressure — we close only when you\'re satisfied',
              'Post-possession support (utility connections, society registration)',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-4 bg-brand-light rounded-xl">
                <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                <span className="text-text-primary text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-12">Frequently Asked Questions</h2>
          <div className="card !rounded-2xl overflow-hidden">
            {buyingFaqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-light/50 transition-colors"
                >
                  <span className={`font-semibold pr-4 transition-colors ${openFaq === i ? 'text-brand-primary' : 'text-text-primary'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown size={18} className={`text-brand-secondary transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16 md:py-20 bg-white">
        <div className="section-container">
          <div className="max-w-2xl mx-auto card p-8 !rounded-2xl shadow-card-hover border border-border">
            <div className="text-center mb-8">
              <h2 className="section-title text-2xl md:text-3xl mb-2">Need Expert Assistance?</h2>
              <p className="text-text-secondary">Fill out your details and our property experts will contact you shortly.</p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" autoComplete="name" className="input" required />
                <input type="tel" placeholder="Phone Number *" autoComplete="tel" className="input" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="select" required>
                  <option value="">Preferred Location</option>
                  <option>Waghodia Road</option>
                  <option>Ajwa Road</option>
                  <option>Subhanpura</option>
                  <option>Anywhere in Vadodara</option>
                </select>
                <select className="select" required>
                  <option value="">Budget</option>
                  <option>Under ₹30 Lac</option>
                  <option>₹30 Lac - ₹50 Lac</option>
                  <option>₹50 Lac - ₹80 Lac</option>
                  <option>Above ₹80 Lac</option>
                </select>
              </div>
              <textarea placeholder="Specific Requirements (Optional)" rows={3} className="textarea" />
              <button type="button" onClick={() => alert('Enquiry Sent!')} className="btn-primary w-full justify-center !py-3">
                <Send size={18} /> Request Call Back
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
