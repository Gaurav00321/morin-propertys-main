'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Youtube, Send, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/contact.png" 
            alt="Contact Us" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Contact <span className="gold-gradient-text">Us</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Form */}
            <div className="card p-6 md:p-8 !rounded-2xl">
              <h2 className="font-serif font-bold text-2xl mb-6">Send Us an Enquiry</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={48} className="text-brand-accent mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-xl mb-2">Enquiry Sent!</h3>
                  <p className="text-text-secondary">We&apos;ll contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Full Name *</label>
                      <input type="text" className="input" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Phone Number *</label>
                      <input type="tel" className="input" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block">Email Address</label>
                    <input type="email" className="input" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block">I am a</label>
                    <div className="flex flex-wrap gap-2">
                      {['Buyer', 'Seller', 'Investor', 'Other'].map(type => (
                        <label key={type} className="flex items-center gap-2 px-4 py-2 bg-brand-light rounded-full cursor-pointer hover:bg-brand-secondary/10 transition-colors">
                          <input type="radio" name="userType" value={type} className="accent-brand-secondary" />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Property Type</label>
                      <select className="select">
                        <option value="">Select type</option>
                        <option>Flat / Apartment</option>
                        <option>Independent House</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Budget Range</label>
                      <select className="select">
                        <option value="">Select budget</option>
                        <option>₹20 Lac - ₹30 Lac</option>
                        <option>₹30 Lac - ₹50 Lac</option>
                        <option>₹50 Lac - ₹75 Lac</option>
                        <option>₹75 Lac - ₹1 Cr</option>
                        <option>₹1 Cr+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block">Message</label>
                    <textarea className="textarea" placeholder="Tell us what you're looking for..." rows={4} />
                  </div>
                  <button type="submit" className="btn-primary w-full md:w-auto">
                    <Send size={16} /> Send Enquiry
                  </button>
                  <p className="text-xs text-text-muted">Your information is 100% confidential and never shared.</p>
                </form>
              )}
            </div>

            {/* Info Card */}
            <div className="space-y-6">
              <div className="card p-6 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin size={20} className="text-brand-secondary flex-shrink-0 mt-1" />
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Kubereshwar Rd, Goverdhan Township, Kendranagar, Waghodia Road, Vadodara, Gujarat — 390025
                    </p>
                  </div>
                  <a href="tel:+919376786108" className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-primary transition">
                    <Phone size={20} className="text-brand-secondary" />
                    +91-9376786108
                  </a>
                  <a href="mailto:morincontact@gmail.com" className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-primary transition">
                    <Mail size={20} className="text-brand-secondary" />
                    morincontact@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <Clock size={20} className="text-brand-secondary" />
                    <div>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: By appointment</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a href={getCallUrl()} className="btn-navy justify-center !py-3 text-sm">
                  <Phone size={16} /> Call Now
                </a>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center !py-3 text-sm">
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn-secondary justify-center !py-3 text-sm">
                  <Facebook size={16} /> Facebook
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-secondary justify-center !py-3 text-sm">
                  <Youtube size={16} /> YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="h-[350px] md:h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1710!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a59614c2e5%3A0xd6ffe77c7e4b0b12!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            title="Morin Property Office Location"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
