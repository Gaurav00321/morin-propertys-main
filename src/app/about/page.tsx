import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { StatsBar } from '@/components/home/StatsBar'
import { CheckCircle2, Eye, Target, Heart, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Morin Property | Vadodara\'s Trusted Real Estate Agency',
  description: 'Learn about Morin Property — Vadodara\'s most trusted real estate agency with 325+ happy families, NAR & CREDAI certified, offering transparent property buying services.',
}

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/about.png" 
            alt="About Morin Property" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'About' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            About <span className="gold-gradient-text">Morin Property</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4 max-w-2xl mx-auto">
            Building trust, one family at a time.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-eyebrow justify-center">Our Story</p>
            <h2 className="section-title text-3xl md:text-4xl mb-8">
              From a Small Consultancy to Vadodara&apos;s Trusted Partner
            </h2>
            <div className="text-text-secondary text-lg leading-relaxed space-y-6">
              <p>
                Morin Property was founded with a simple but powerful mission: to make property
                buying in Vadodara transparent, simple, and stress-free. Located at Waghodia Road,
                Vadodara, we&apos;ve grown from a small consultancy into one of the city&apos;s most trusted
                real estate agencies — having served over 325 families and successfully closed 179+
                flat sales and 132+ plot transactions.
              </p>
              <p>
                We combine deep local knowledge with professional ethics to help every client —
                whether buying their first home, upgrading to a larger space, or making an
                investment — feel confident and well-supported at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                content: 'Building not just homes, but lifelong trust — where every family feels secure, valued, and truly connected to their future.',
              },
              {
                icon: Target,
                title: 'Our Mission',
                content: 'To guide every family with honesty, a clear process, and genuine care — making property buying simple, stress-free, and truly fulfilling.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                content: 'Honesty, transparency, and placing families first. We deliver legally clear, quality homes with care and support before, during, and after every transaction.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center !rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} className="text-brand-primary" />
                </div>
                <h3 className="font-serif font-bold text-xl text-text-primary mb-4">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Credentials</p>
            <h2 className="section-title text-3xl md:text-4xl">
              Our Certifications & Associations
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['NAR Certified', 'CREDAI Member', 'Digital Certified', 'eXp Realty'].map(cert => (
              <div key={cert} className="flex items-center gap-3 px-6 py-4 bg-brand-light rounded-2xl">
                <Award size={20} className="text-brand-secondary" />
                <span className="font-semibold text-text-primary">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Gallery</p>
            <h2 className="section-title text-3xl md:text-4xl">Our Journey in Pictures</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Investor Meet', 'Exhibition at Navlakhi', 'At CREDAI', 'Team Photo', 'VPCA Leader Visit', 'Office'].map((caption, i) => (
              <div key={caption} className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`bg-gradient-to-br from-brand-primary/30 to-brand-accent/20 ${i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'}`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-white text-sm font-medium">{caption}</span>
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
