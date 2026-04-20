'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import Link from 'next/link'

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <section
      className="py-20 md:py-28 sage-gradient grain-texture relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-container relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <p className="section-eyebrow justify-center !text-white/80">
            Testimonials
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem] text-white">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Decorative Quote */}
              <Quote size={56} className="text-white/10 mx-auto mb-6" fill="currentColor" />

              {/* Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, j) => (
                  <Star key={j} size={18} className="text-brand-secondary fill-brand-secondary" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8 font-serif italic">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Name & Type */}
              <div className="font-sans font-bold text-white text-lg">
                {testimonials[current].name}
              </div>
              {testimonials[current].type && (
                <div className="text-brand-secondary text-sm font-semibold mt-1 uppercase tracking-wider">
                  {testimonials[current].type}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-16 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-16 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50 w-2.5'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
            Read All 325+ Success Stories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
