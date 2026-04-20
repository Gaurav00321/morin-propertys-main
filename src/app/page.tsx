import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { LocalitiesGrid } from '@/components/home/LocalitiesGrid'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ServicesStrip } from '@/components/home/ServicesStrip'
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser'
import { CredentialsSection } from '@/components/home/CredentialsSection'
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel'
import { ToolsStrip } from '@/components/home/ToolsStrip'
import { CTABanner } from '@/components/home/CTABanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      
      {/* Section 1: Cinematic Hero */}
      <HeroSection />
      
      {/* Section 2: Trust Stats */}
      <StatsBar />

      {/* Section 3: Featured Properties */}
      <FeaturedProperties />

      {/* Section 4: Locality Explorer */}
      <LocalitiesGrid />

      {/* Section 5: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 6: How It Works */}
      <HowItWorks />

      {/* Section 7: Services Strip */}
      <ServicesStrip />

      {/* Section 8: Project Spotlight */}
      <ProjectsTeaser />

      {/* Section 9: Credentials & Recognition */}
      <CredentialsSection />

      {/* Section 10: Testimonials */}
      <TestimonialsCarousel />

      {/* Section 11: Tools & Resources */}
      <ToolsStrip />

      {/* Section 12: Final CTA */}
      <CTABanner />

      <Footer />
    </main>
  )
}
