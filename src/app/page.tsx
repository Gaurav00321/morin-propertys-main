import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { LocalitiesGrid } from '@/components/home/LocalitiesGrid'
import { ServicesStrip } from '@/components/home/ServicesStrip'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel'
import { ProjectsTeaser } from '@/components/home/ProjectsTeaser'
import { CTABanner } from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsBar />
      <FeaturedProperties />
      <LocalitiesGrid />
      <ServicesStrip />
      <WhyChooseUs />
      <TestimonialsCarousel />
      <ProjectsTeaser />
      <CTABanner />
      <Footer />
    </main>
  )
}
