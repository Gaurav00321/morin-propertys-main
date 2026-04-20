'use client'
import { motion } from 'framer-motion'
import { MessageSquare, Search, MapPin, Key } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Tell Us What You Need',
    desc: 'Share your budget, locality preference, and BHK requirement. We listen first.',
  },
  {
    icon: Search,
    number: '02',
    title: 'We Curate Options',
    desc: 'Handpicked, verified properties matched to your exact profile and priorities.',
  },
  {
    icon: MapPin,
    number: '03',
    title: 'Site Visits & Guidance',
    desc: 'We accompany you to every visit, answer every question — honestly.',
  },
  {
    icon: Key,
    number: '04',
    title: 'Smooth Possession',
    desc: 'Legal checks, loan coordination, registration, and documentation support.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-brand-light overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="section-eyebrow justify-center">Process</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            How It Works
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Four simple steps to your dream home in Vadodara
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative">
          {/* Connecting Line */}
          <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 bg-border z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-brand-secondary origin-left"
            />
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="text-center"
              >
                {/* Number Circle */}
                <div className="w-[104px] h-[104px] rounded-full bg-white shadow-card mx-auto mb-6 flex items-center justify-center border-2 border-brand-secondary/20 relative">
                  <span className="font-serif font-bold text-3xl text-brand-secondary">{step.number}</span>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                    <step.icon size={14} className="text-brand-secondary" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 relative"
            >
              {/* Vertical Line */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white shadow-card flex items-center justify-center border-2 border-brand-secondary/20 shrink-0 z-10">
                  <span className="font-serif font-bold text-xl text-brand-secondary">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-brand-secondary/20 my-1" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-serif font-bold text-lg text-text-primary mb-1">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
