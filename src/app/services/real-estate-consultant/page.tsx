import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { Briefcase, TrendingUp, HelpCircle, FileText, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, getCallUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Real Estate Consulting | Morin Property Vadodara',
  description: 'Unbiased, expert real estate consulting in Vadodara for investments, selling, and market insights.',
}

export default function ConsultingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page charcoal-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Real Estate Consulting' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Real Estate <span className="gold-gradient-text">Consulting</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="section-eyebrow">Our Service</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6">Expert Advice You Can Trust</h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-4 mb-8">
                <p>Navigating the real estate market requires more than just capital; it needs clear, unbiased local knowledge. With rapidly changing infrastructure and shifting area demands in Vadodara, making the wrong investment can be costly.</p>
                <p>Our consulting services are designed for investors, sellers, and NRIs who need trusted feet on the ground. We provide data-driven insights into Vadodara&apos;s real estate trends, ensuring your decisions are profitable and secure.</p>
              </div>
              <div className="space-y-3 mb-8">
                {['Unbiased Market Insights', 'NRI Investment Guidance', 'Property Valuation', 'Legal Document Advisory'].map(item => (
                  <div key={item} className="flex items-center gap-3 font-medium text-text-primary">
                    <CheckCircle2 size={20} className="text-brand-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image src="/images/gallery-images/13.jpg" alt="Real Estate Consulting" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="section-title text-3xl text-center mb-12">Who We Help</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: TrendingUp, title: 'Investors', desc: 'Identify high-growth corridors and maximize ROI on commercial and residential investments.' },
              { icon: Briefcase, title: 'Property Sellers', desc: 'Get accurate valuations and strategic marketing advice to sell your property faster.' },
              { icon: HelpCircle, title: 'First-time Buyers', desc: 'Navigate builder reputation, hidden costs, and future area development safely.' },
              { icon: FileText, title: 'NRIs & Remote Buyers', desc: 'Manage your Vadodara property investments remotely with complete peace of mind.' },
            ].map(div => (
              <div key={div.title} className="card-static p-6 !rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center mb-4">
                  <div.icon size={20} className="text-brand-secondary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-text-primary">{div.title}</h3>
                <p className="text-text-secondary text-sm">{div.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-center">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-6">Need expert advice?</h2>
          <p className="text-text-secondary mb-8">Book a free 30-minute consulting session with our Vadodara market experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getCallUrl()} className="btn-charcoal"><Phone size={18} /> Schedule Call</a>
            <a href={getWhatsAppUrl("Hi! I'd like to book a consulting session regarding Vadodara real estate.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle size={18} /> WhatsApp Us</a>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
