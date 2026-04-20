import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { StatsBar } from '@/components/home/StatsBar'
import { Eye, Target, Heart, Award, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Morin Property | Vadodara's Trusted Real Estate Agency",
  description: "Learn about Morin Property — Vadodara's most trusted real estate agency with 325+ happy families, NAR & CREDAI certified, offering transparent property buying services.",
}

const credentials = [
  'NAR Certified',
  'CREDAI Member',
  'VPCA Member',
  'eXp Realty Certified',
  'Digital Certified',
]

const galleryEvents = [
  { src: '/images/gallery-images/6.jpg', caption: 'Investor Meet 2024' },
  { src: '/images/gallery-images/7.jpg', caption: 'Exhibition at Navlakhi' },
  { src: '/images/gallery-images/8.jpg', caption: 'At CREDAI Conference' },
  { src: '/images/gallery-images/9.jpg', caption: 'Team Photo' },
  { src: '/images/gallery-images/10.jpg', caption: 'VPCA Leader Visit' },
  { src: '/images/gallery-images/11.jpg', caption: 'Office' },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="hero-section hero-section--page bg-black relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero/about.png"
            alt="About Morin Property"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/50 z-10" />
        </div>

        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'About' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            About <span className="gold-gradient-text">Morin Property</span>
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto">
            Building trust, one family at a time.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/images/gallery-images/6.jpg"
                  alt="The Morin Property team"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl shadow-card-hover p-6 max-w-[180px] border border-border/50">
                <div className="font-mono font-bold text-3xl text-brand-secondary">5+</div>
                <div className="text-text-secondary text-sm mt-1">Years serving Vadodara</div>
              </div>
            </div>

            {/* Text Side */}
            <div>
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                From a Small Consultancy to Vadodara&apos;s <span className="text-brand-secondary">Trusted Partner</span>
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

              {/* Founder Quote */}
              <div className="mt-8 pl-6 border-l-2 border-brand-secondary/30 relative">
                <Quote size={24} className="text-brand-secondary/20 absolute -left-3 -top-1" />
                <p className="text-text-secondary italic text-[15px] leading-relaxed">
                  &ldquo;We don&apos;t just sell properties. We help families find the place where their next chapter begins.&rdquo;
                </p>
                <p className="text-text-primary font-semibold text-sm mt-2">— Morin Property Founder</p>
              </div>
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
              <div key={item.title} className="card-static p-8 text-center !rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} className="text-brand-secondary" />
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
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {credentials.map(cert => (
              <div key={cert} className="flex items-center gap-3 px-6 py-4 bg-brand-light rounded-2xl border border-border/50">
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
            {galleryEvents.map((photo, i) => (
              <div key={photo.caption} className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`relative ${i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'}`}>
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-white text-sm font-medium">{photo.caption}</span>
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
