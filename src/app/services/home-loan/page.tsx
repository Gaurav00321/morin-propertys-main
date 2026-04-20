import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { Landmark, FileCheck, IndianRupee, Clock, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Home Loan Assistance | Morin Property Vadodara',
  description: 'Fast, hassle-free home loan processing in Vadodara with Morin Property. 10+ bank partners, best interest rates.',
}

export default function HomeLoanPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page charcoal-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Home Loan Assistance' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Home Loan <span className="gold-gradient-text">Assistance</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6">Financial Support, Simplified</h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8">
                <p>Securing a home loan shouldn&apos;t be the hardest part of buying a house. We partner directly with leading national and private banks to ensure you get the best interest rates with the least amount of friction.</p>
                <p>Our dedicated loan assistance team helps you evaluate your eligibility, compares offerings across 10+ banks, and manages the entire documentation process so you can focus on your new home, not bank queues.</p>
              </div>
              <div className="space-y-3 mb-8">
                {['10+ Banking Partners', 'Lowest Possible Interest Rates', 'Doorstep Document Collection', 'Fast Approvals (48-72 hours)'].map(item => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary">
                    <CheckCircle2 size={20} className="text-brand-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center bg-brand-light rounded-3xl overflow-hidden aspect-[4/3] p-12">
              <div className="text-center space-y-4">
                <Landmark size={64} className="text-brand-secondary mx-auto" />
                <h3 className="font-serif font-bold text-2xl">Trusted Banking Partners</h3>
                <p className="text-text-secondary">SBI, HDFC, ICICI, Axis, Bank of Baroda, and more leading institutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="section-title text-3xl text-center mb-12">How We Help You Get Funded</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: FileCheck, title: 'Eligibility Check', desc: 'We assess your profile to accurately estimate your loan eligibility.' },
              { icon: IndianRupee, title: 'Rate Comparison', desc: 'We compare competing bank offers to secure the lowest interest rate.' },
              { icon: Clock, title: 'Fast Processing', desc: 'Our team handles the heavy lifting to ensure quick 48-hour approvals.' },
              { icon: Landmark, title: 'Disbursement', desc: 'We coordinate with the bank and the builder for seamless final disbursement.' },
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

          <div className="mt-12 text-center">
            <Link href="/tools/emi-calculator" className="btn-secondary">
              Try our EMI Calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-6">Need help securing a loan?</h2>
          <p className="text-text-secondary mb-8">Speak to our financial experts today to check your eligibility instantly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal"><Phone size={18} /> Call Loan Expert</a>
            <a href={getWhatsAppUrl("Hi! I need assistance with a home loan for a property in Vadodara.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle size={18} /> WhatsApp Us</a>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
