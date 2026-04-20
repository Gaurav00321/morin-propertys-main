'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const tools = [
  {
    icon: Calculator,
    title: 'EMI Calculator',
    desc: 'Calculate your monthly payment in 30 seconds — plan your budget confidently.',
    href: '/tools/emi-calculator',
    isLink: true,
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    desc: 'Latest Vadodara property trends, price movements, and investment tips.',
    href: '/blog',
    isLink: true,
  },
  {
    icon: MessageCircle,
    title: 'Free Consultation',
    desc: 'Talk to our expert, no obligation — get honest, personalised advice.',
    href: '',
    isLink: false,
  },
]

export function ToolsStrip() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-eyebrow justify-center">Resources</p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-[2.75rem]">
            Tools & Resources
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Everything you need to make smart property decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {tool.isLink ? (
                <Link href={tool.href} className="group block h-full">
                  <div className="card h-full p-8 flex flex-col !rounded-2xl border border-transparent hover:border-brand-secondary/20">
                    <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6 group-hover:bg-brand-secondary/20 transition-colors">
                      <tool.icon size={26} className="text-brand-secondary" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-text-primary mb-3 group-hover:text-brand-secondary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                      {tool.desc}
                    </p>
                    <span className="text-brand-secondary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ) : (
                <a
                  href={getWhatsAppUrl("Hello! I found your website and I'm looking for a property in Vadodara. Can we discuss my requirements?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <div className="card h-full p-8 flex flex-col !rounded-2xl border border-transparent hover:border-brand-accent/20">
                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors">
                      <tool.icon size={26} className="text-brand-accent" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-text-primary mb-3 group-hover:text-brand-accent transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                      {tool.desc}
                    </p>
                    <span className="text-brand-accent text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Start Chat <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
