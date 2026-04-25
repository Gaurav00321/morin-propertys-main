import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CTABanner } from '@/components/home/CTABanner'
import { BlogPostsSection } from '@/components/blog/BlogPostsSection'
import { getAllBlogPosts } from '@/data/blogPosts'

export const metadata: Metadata = {
  title: 'Real Estate Blog | Morin Propertys',
  description:
    'Read expert articles on Vadodara real estate — property buying tips, market insights, home loan guidance, and investment strategies from Morin Propertys.',
  keywords: [
    'Vadodara real estate blog',
    'property buying guide',
    'real estate tips',
    'Morin Propertys blog',
    'home loan guide Vadodara',
    'property investment tips',
  ],
  openGraph: {
    title: 'Real Estate Blog | Morin Propertys',
    description:
      'Expert real estate articles, property guides, and market insights for Vadodara homebuyers.',
    url: 'https://morin-propertys-main.vercel.app/blog',
    type: 'website',
  },
}

export default async function BlogListingPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] bg-black flex items-center justify-center overflow-hidden">
        {/* Background gradient & texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/95 to-black" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(201,168,76,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(123,158,135,0.2) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Floating gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-brand-secondary/20 animate-float" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-brand-secondary/15 animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-2/3 w-1 h-1 rounded-full bg-brand-secondary/25 animate-float" style={{ animationDelay: '3s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 pt-20 pb-12">
          <p className="text-brand-secondary font-semibold text-sm uppercase tracking-[0.25em] mb-4 animate-fade-in">
            Knowledge Hub
          </p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 animate-slide-up">
            Our Blog
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Expert insights, property guides, and market updates to help you make informed real estate decisions in Vadodara.
          </p>
          {/* Decorative line */}
          <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-0.5 bg-brand-secondary rounded-full" />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <BlogPostsSection posts={posts} />

      {/* CTA & Footer */}
      <CTABanner />
      <Footer />
    </>
  )
}
