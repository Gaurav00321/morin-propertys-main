'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { testimonials } from '@/data/testimonials'
import { Star, ExternalLink } from 'lucide-react'

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<string>('All')
  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.type === filter)

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-brand-primary min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Testimonials' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Client <span className="gold-gradient-text">Reviews</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4">325+ families have trusted us with their most important investment</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          {/* Rating Summary */}
          <div className="card p-8 !rounded-2xl text-center mb-12 max-w-md mx-auto">
            <div className="flex gap-1 justify-center mb-3">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={24} className="text-brand-secondary fill-brand-secondary" />
              ))}
            </div>
            <div className="font-serif font-bold text-4xl text-brand-primary">4.8/5</div>
            <p className="text-text-secondary text-sm mt-1">Based on 325+ reviews</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Buyer', 'Seller', 'Investor'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === tab ? 'bg-brand-primary text-white' : 'bg-white text-text-secondary hover:bg-brand-primary/5'
                }`}
              >
                {tab === 'All' ? 'All Reviews' : `${tab}s`}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(review => (
              <div key={review.id} className="card p-6 !rounded-2xl flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-brand-secondary fill-brand-secondary" />
                  ))}
                </div>
                <p className="text-text-secondary text-[15px] leading-relaxed italic flex-1 mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-bold text-text-primary">{review.name}</div>
                  {review.type && (
                    <div className="text-brand-secondary text-xs font-semibold uppercase tracking-wider mt-1">{review.type}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="https://g.page/morinproperty/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={16} />
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
