import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { ArrowRight, Home, Briefcase, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services | Morin Property Vadodara',
  description: "Explore Morin Property's real estate services: property buying assistance, real estate consulting, and home loan guidance in Vadodara.",
}

const services = [
  {
    icon: Home,
    title: 'Buying Property',
    description: 'Expert guidance to find your dream home within your budget. We handle everything from property search to registration and possession, ensuring a smooth and transparent buying experience.',
    href: '/services/buying-property',
    highlights: ['Verified properties only', 'Legal documentation support', 'Post-possession assistance'],
    image: '/images/gallery-images/12.jpg',
  },
  {
    icon: Briefcase,
    title: 'Real Estate Consulting',
    description: 'Unbiased advice for buying, selling, and investment decisions. Our deep knowledge of the Vadodara market helps you make informed choices that align with your goals.',
    href: '/services/real-estate-consultant',
    highlights: ['Market analysis & insights', 'Investment advisory', 'NRI property consulting'],
    image: '/images/gallery-images/13.jpg',
  },
  {
    icon: Landmark,
    title: 'Home Loan Assistance',
    description: 'Hassle-free loan processing with trusted banking partners. We compare rates across 10+ banks and handle all paperwork for fast approvals.',
    href: '/services/home-loan',
    highlights: ['10+ banking partners', 'Pre-approval in 48 hours', 'Full documentation support'],
    image: '/images/gallery-images/14.jpg',
  },
]

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <section className="hero-section hero-section--page bg-black relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero/services.png"
            alt="Our Services"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/50 z-10" />
        </div>

        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Our <span className="gold-gradient-text">Services</span>
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive real estate services tailored to your needs
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="space-y-8">
            {services.map((service, i) => (
              <div key={service.title} className="card-static !rounded-2xl overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6">
                      <service.icon size={28} className="text-brand-secondary" />
                    </div>
                    <h2 className="font-serif font-bold text-2xl md:text-3xl text-text-primary mb-4">{service.title}</h2>
                    <p className="text-text-secondary leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-8">
                      {service.highlights.map(h => (
                        <li key={h} className="flex items-center gap-2 text-text-primary text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-brand-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="btn-primary w-fit">
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className={`relative h-64 lg:h-auto ${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
