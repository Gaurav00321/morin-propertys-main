import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { CTABanner } from '@/components/home/CTABanner'
import { MapPin, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Signature Projects by Morin Property | Vadodara',
  description: 'Explore signature residential projects by Morin Property in Vadodara. Premium apartments and homes in sought-after localities.',
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/projects.png" 
            alt="Signature Projects" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
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
          <div className="card !rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="h-64 md:h-80 bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
              <div className="text-center text-white">
                <Building2 size={64} className="mx-auto mb-4 opacity-60" />
                <div className="font-serif font-bold text-3xl md:text-4xl">Sarthak Enclave</div>
                <div className="flex items-center justify-center gap-2 text-white drop-shadow-md mt-3">
                  <MapPin size={16} /> Subhanpura, Vadodara
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="badge badge-new">Signature Project</span>
                <span className="badge bg-brand-accent/10 text-brand-accent">Residential</span>
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
