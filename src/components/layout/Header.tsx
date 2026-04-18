'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Properties',
    href: '/properties',
    children: [
      { label: 'All Properties', href: '/properties' },
      { label: 'Waghodia Road', href: '/properties?locality=Waghodia+Road' },
      { label: 'Ajwa Road', href: '/properties?locality=Ajwa+Road' },
      { label: 'Subhanpura', href: '/properties?locality=Subhanpura' },
      { label: 'Jarod', href: '/properties?locality=Jarod' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Buying Property', href: '/services/buying-property' },
      { label: 'Real Estate Consulting', href: '/services/real-estate-consultant' },
      { label: 'Home Loan Assistance', href: '/services/home-loan' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown(prev => prev === label ? null : label)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-10">
              <div className="flex items-center">
                <span className={`font-serif font-bold text-2xl tracking-tight transition-colors ${
                  scrolled ? 'text-brand-primary' : 'text-white'
                }`}>
                  Morin
                </span>
                <span className={`font-serif font-bold text-2xl tracking-tight transition-colors ${
                  scrolled ? 'text-brand-secondary' : 'text-brand-secondary'
                }`}>
                  {' '}Property
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  {link.children ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-all ${
                        scrolled
                          ? 'text-text-secondary hover:text-brand-primary hover:bg-brand-light'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all ${
                        scrolled
                          ? 'text-text-secondary hover:text-brand-primary hover:bg-brand-light'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-2xl shadow-card-hover py-2 min-w-[220px] border border-border">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-[14px] text-text-secondary hover:text-brand-primary hover:bg-brand-light/50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getCallUrl()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  scrolled
                    ? 'bg-brand-secondary text-white shadow-cta hover:bg-brand-secondary/90'
                    : 'bg-brand-secondary text-white shadow-cta hover:bg-brand-secondary/90'
                }`}
              >
                <Phone size={15} />
                +91-9376786108
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden z-10 p-2 rounded-xl transition-all ${
                mobileOpen || scrolled
                  ? 'text-brand-primary'
                  : 'text-white bg-black/20 backdrop-blur-sm'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto"
            >
              <div className="p-6 pt-24">
                {/* Nav Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      {link.children ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(link.label)}
                            className="w-full flex items-center justify-between py-3 px-4 text-lg font-semibold text-text-primary hover:text-brand-primary rounded-xl hover:bg-brand-light transition-all"
                          >
                            {link.label}
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-2.5 px-4 text-[15px] text-text-secondary hover:text-brand-primary rounded-lg hover:bg-brand-light transition-all"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-3 px-4 text-lg font-semibold text-text-primary hover:text-brand-primary rounded-xl hover:bg-brand-light transition-all"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 pt-6 border-t border-border space-y-3">
                  <a
                    href={getCallUrl()}
                    className="btn-primary w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Kubereshwar Rd, Goverdhan Township,<br />
                    Kendranagar, Waghodia Road,<br />
                    Vadodara, Gujarat — 390025
                  </p>
                  <p className="text-sm text-text-muted mt-3">
                    Mon–Sat: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
