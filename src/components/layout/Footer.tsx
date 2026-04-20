'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Send, Award } from 'lucide-react'

const credentials = [
  'NAR Certified',
  'CREDAI Member',
  'VPCA Member',
  'eXp Realty Certified',
  'Digital Certified',
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    } catch {
      // silently fail
    }
  }

  return (
    <footer className="bg-brand-primary text-white pb-16 lg:pb-0">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-white">
                Get new property alerts for Vadodara
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Join 325+ families who receive curated listings weekly.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 px-5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:border-brand-secondary w-full md:w-72 transition-colors"
                required
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-brand-secondary text-white font-semibold text-sm hover:bg-brand-secondary/90 transition-all flex items-center gap-2 shrink-0"
              >
                {subscribed ? '✓ Subscribed!' : (
                  <>
                    <Send size={14} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Awards Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {credentials.map(cred => (
              <div key={cred} className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wider">
                <Award size={14} className="text-brand-secondary" />
                {cred}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 golden-grid-texture">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Logo + Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif font-bold text-2xl text-white">
                Morin <span className="text-brand-secondary">Property</span>
              </span>
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed mb-6">
              Vadodara&apos;s most trusted real estate partner. Helping families find their dream homes with honesty, transparency, and care.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-brand-secondary mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Properties', href: '/properties' },
                { label: 'Projects', href: '/projects' },
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/careers' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-[15px] hover:text-brand-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-brand-secondary mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Buying Property', href: '/services/buying-property' },
                { label: 'Real Estate Consulting', href: '/services/real-estate-consultant' },
                { label: 'Home Loan Assistance', href: '/services/home-loan' },
                { label: 'Post Your Property', href: '/post-property' },
                { label: 'EMI Calculator', href: '/tools/emi-calculator' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-[15px] hover:text-brand-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-brand-secondary mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="text-brand-secondary flex-shrink-0 mt-1" />
                <span className="text-white/60 text-[15px] leading-relaxed">
                  Kubereshwar Rd, Goverdhan Township, Kendranagar, Waghodia Road, Vadodara, Gujarat — 390025
                </span>
              </li>
              <li>
                <a href="tel:+919376786108" className="flex items-center gap-3 text-white/60 text-[15px] hover:text-brand-secondary transition-colors">
                  <Phone size={18} className="text-brand-secondary flex-shrink-0" />
                  +91-9376786108
                </a>
              </li>
              <li>
                <a href="mailto:morincontact@gmail.com" className="flex items-center gap-3 text-white/60 text-[15px] hover:text-brand-secondary transition-colors">
                  <Mail size={18} className="text-brand-secondary flex-shrink-0" />
                  morincontact@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-[15px]">
                <Clock size={18} className="text-brand-secondary flex-shrink-0" />
                Mon–Sat: 9 AM – 7 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Morin Property. All Rights Reserved. Built with ❤️ for Vadodara families.
          </p>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
