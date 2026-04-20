'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Youtube, Send, CheckCircle2 } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email, userType, propertyType, budgetRange, message,
          source: 'Contact Page'
        })
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
        // Clear form
        setName(''); setPhone(''); setEmail(''); setMessage('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Live open/closed status based on IST
  const now = new Date()
  const istHour = (now.getUTCHours() + 5 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0)) % 24
  const istDay = now.getUTCDay()
  const isOpen = istDay >= 1 && istDay <= 6 && istHour >= 9 && istHour < 19

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero/contact.png"
            alt="Contact Us"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/50 z-10" />
        </div>

        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Contact <span className="gold-gradient-text">Us</span>
          </h1>
          <p className="text-white/70 text-lg mt-4">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Form */}
            <div className="card-static p-6 md:p-8 !rounded-2xl">
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
                      <input type="text" className="input" placeholder="Your full name" required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Phone Number *</label>
                      <input type="tel" className="input" placeholder="+91 XXXXX XXXXX" required value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block">Email Address</label>
                    <input type="email" className="input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-text-primary mb-1.5 block">I am a</label>
                    <div className="flex flex-wrap gap-2">
                      {['Buyer', 'Seller', 'Investor', 'Other'].map(type => (
                        <label key={type} className="pill-toggle cursor-pointer">
                          <input 
                            type="radio" 
                            name="userType" 
                            value={type} 
                            className="sr-only peer" 
                            checked={userType === type}
                            onChange={() => setUserType(type)}
                          />
                          <span className="peer-checked:bg-brand-secondary peer-checked:text-white peer-checked:border-brand-secondary">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Property Type</label>
                      <select className="select" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                        <option value="">Select type</option>
                        <option>Flat / Apartment</option>
                        <option>Independent House</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1.5 block">Budget Range</label>
                      <select className="select" value={budgetRange} onChange={e => setBudgetRange(e.target.value)}>
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
                    <textarea className="textarea" placeholder="Tell us what you're looking for..." rows={4} value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto">
                    <Send size={16} /> {loading ? 'Sending...' : 'Send Enquiry'}
                  </button>
                  <p className="text-xs text-text-muted">Your information is 100% confidential and never shared.</p>
                </form>
              )}
            </div>

            {/* Info Card */}
            <div className="space-y-6">
              <div className="card-static p-6 !rounded-2xl">
                <h3 className="font-serif font-bold text-xl mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {/* Open Status */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOpen ? 'bg-brand-accent/10 text-brand-accent' : 'bg-red-50 text-red-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-brand-accent animate-pulse' : 'bg-red-400'}`} />
                    {isOpen ? 'Open Now' : 'Closed'}
                  </div>
                  
                  <div className="flex gap-3">
                    <MapPin size={20} className="text-brand-secondary flex-shrink-0 mt-1" />
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Kubereshwar Rd, Goverdhan Township, Kendranagar, Waghodia Road, Vadodara, Gujarat — 390025
                    </p>
                  </div>
                  <a href="tel:+919376786108" className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-secondary transition">
                    <Phone size={20} className="text-brand-secondary" />
                    +91-9376786108
                  </a>
                  <a href="mailto:morincontact@gmail.com" className="flex items-center gap-3 text-text-secondary text-sm hover:text-brand-secondary transition">
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
                <a href={getCallUrl()} className="btn-charcoal justify-center !py-3 text-sm">
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
