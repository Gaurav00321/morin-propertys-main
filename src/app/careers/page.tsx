import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Users, TrendingUp, GraduationCap, Clock, Upload, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Join Our Team | Morin Property Vadodara',
  description: "Be part of Vadodara's fastest-growing real estate team. Explore career opportunities at Morin Property.",
}

const roles = [
  { title: 'Real Estate Sales Executive', location: 'Vadodara', type: 'Full-time' },
  { title: 'Property Marketing Associate', location: 'Vadodara', type: 'Full-time' },
  { title: 'Home Loan DSA Partner', location: 'Vadodara', type: 'Commission-based' },
]

const benefits = [
  { icon: TrendingUp, title: 'Uncapped Earnings', desc: 'Performance-based incentives with no ceiling' },
  { icon: GraduationCap, title: 'Training & Certifications', desc: 'Continuous learning and professional development' },
  { icon: Clock, title: 'Flexible Working', desc: 'Work-life balance with flexible schedules' },
  { icon: Users, title: 'Growth Opportunities', desc: 'Fast-track career progression in a growing company' },
]

export default function CareersPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page charcoal-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Careers' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            Join Our <span className="gold-gradient-text">Team</span>
          </h1>
          <p className="text-white/60 text-lg mt-4">Be part of Vadodara&apos;s fastest-growing real estate team</p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-12">Why Join Morin Property?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="card-static p-6 !rounded-2xl text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} className="text-brand-secondary" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{b.title}</h3>
                <p className="text-text-secondary text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-12">Open Positions</h2>
          <div className="space-y-4">
            {roles.map(role => (
              <div key={role.title} className="card-static p-6 !rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-text-primary text-lg">{role.title}</h3>
                  <p className="text-text-secondary text-sm">{role.location} · {role.type}</p>
                </div>
                <a href="#apply" className="btn-primary !py-2.5 text-sm shrink-0">Apply Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-2xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-12">Apply Now</h2>
          <div className="card-static p-6 md:p-8 !rounded-2xl">
            <form className="space-y-4" action="#">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-sm font-semibold mb-1.5 block">Full Name *</label><input className="input" required /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Phone *</label><input className="input" type="tel" required /></div>
              </div>
              <div><label className="text-sm font-semibold mb-1.5 block">Email *</label><input className="input" type="email" required /></div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Role Applying For *</label>
                <select className="select" required>
                  <option value="">Select role</option>
                  {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Upload CV (PDF)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-brand-secondary/50 transition">
                  <Upload size={24} className="text-text-muted mx-auto mb-2" />
                  <p className="text-text-secondary text-sm">Click to upload or drag & drop</p>
                </div>
              </div>
              <button type="button" className="btn-primary w-full">
                <Send size={16} /> Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
