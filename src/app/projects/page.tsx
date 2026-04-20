import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { MapPin, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Signature Projects by Morin Property | Vadodara',
  description: 'Explore signature residential projects by Morin Property in Vadodara. Premium apartments and homes in sought-after localities.',
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/hero/projects.png"
            alt="Signature Projects"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 to-brand-primary/50 z-10" />
        </div>
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Projects' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Our <span className="gold-gradient-text">Projects</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="card-static !rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="relative h-64 md:h-80">
              <Image
                src="/images/gallery-images/10.jpg"
                alt="Sarthak Enclave Premium Apartments"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="badge badge-featured mb-3">Signature Project</span>
                <div className="font-serif font-bold text-2xl md:text-3xl text-white">Sarthak Enclave</div>
                <div className="flex items-center gap-2 text-white/70 mt-2">
                  <MapPin size={14} /> Subhanpura, Vadodara
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {['Prime Location', 'Modern Amenities', 'RERA Compliant', 'Easy Home Loan'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-primary">
                    <CheckCircle2 size={14} className="text-brand-accent flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed mb-8">
                A premium residential project in one of Vadodara&apos;s most prestigious neighbourhoods.
                Sarthak Enclave offers modern 2 BHK and 3 BHK apartments with world-class amenities,
                designed for families who value comfort, convenience, and quality living.
              </p>
              <Link href="/projects/sarthak-enclave" className="btn-primary">
                View Project Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
