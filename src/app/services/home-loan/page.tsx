'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { homeLoanFaqs } from '@/data/faqs'
import { ChevronDown, Landmark, Zap, FileText, ArrowRight, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeLoanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loanAmount, setLoanAmount] = useState(3000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const r = interestRate / 12 / 100
  const n = tenure * 12
  const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const totalPayment = emi * n
  const totalInterest = totalPayment - loanAmount

  const formatAmount = (amt: number) => {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lac`
    return `₹${Math.round(amt).toLocaleString('en-IN')}`
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-black min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden isolate">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero/home-loan.png" 
            alt="Home Loan Assistance" 
            fill 
            priority 
            className="object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Services', href: '/services' }, { label: 'Home Loan' }]} />
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mt-6">
            Hassle-Free <span className="gold-gradient-text">Home Loans</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4">We Handle the Paperwork</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="text-text-secondary text-lg leading-relaxed">
            Getting a home loan shouldn&apos;t be complicated. Morin Property&apos;s home loan assistance
            service connects you with leading banks and NBFCs to secure the best possible loan —
            with minimal paperwork, fast approvals, and completely transparent terms.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Landmark, title: '10+ Banking Partners', desc: 'Best rates, guaranteed' },
              { icon: Zap, title: 'Fast Approvals', desc: 'Pre-approval in as little as 48 hours' },
              { icon: FileText, title: 'Full Documentation Support', desc: 'We handle the paperwork for you' },
            ].map(item => (
              <div key={item.title} className="card p-8 text-center !rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-brand-secondary" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Calculator</p>
            <h2 className="section-title text-3xl md:text-4xl">EMI Calculator</h2>
          </div>
          <div className="max-w-3xl mx-auto card !rounded-2xl p-6 md:p-8">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Loan Amount</label>
                  <span className="font-bold text-brand-primary">{formatAmount(loanAmount)}</span>
                </div>
                <input type="range" min={500000} max={50000000} step={100000} value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-brand-secondary" />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>₹5 Lac</span><span>₹5 Cr</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Interest Rate</label>
                  <span className="font-bold text-brand-primary">{interestRate}%</span>
                </div>
                <input type="range" min={6} max={18} step={0.1} value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))}
                  className="w-full accent-brand-secondary" />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>6%</span><span>18%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Loan Tenure</label>
                  <span className="font-bold text-brand-primary">{tenure} Years</span>
                </div>
                <input type="range" min={1} max={30} step={1} value={tenure}
                  onChange={e => setTenure(Number(e.target.value))}
                  className="w-full accent-brand-secondary" />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>1 Year</span><span>30 Years</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              <div className="text-center p-4 bg-brand-secondary/10 rounded-xl">
                <div className="text-sm text-text-secondary mb-1">Monthly EMI</div>
                <div className="font-serif font-bold text-2xl text-brand-secondary">{formatAmount(emi)}</div>
              </div>
              <div className="text-center p-4 bg-brand-light rounded-xl">
                <div className="text-sm text-text-secondary mb-1">Total Interest</div>
                <div className="font-serif font-bold text-xl text-text-primary">{formatAmount(totalInterest)}</div>
              </div>
              <div className="text-center p-4 bg-brand-light rounded-xl">
                <div className="text-sm text-text-secondary mb-1">Total Payment</div>
                <div className="font-serif font-bold text-xl text-text-primary">{formatAmount(totalPayment)}</div>
              </div>
            </div>
            {/* Pie chart visual */}
            <div className="flex items-center justify-center mt-8 gap-8">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="18" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1A3C5E" strokeWidth="18"
                    strokeDasharray={`${(loanAmount / totalPayment) * 251.2} 251.2`} />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#C8922A" strokeWidth="18"
                    strokeDasharray={`${(totalInterest / totalPayment) * 251.2} 251.2`}
                    strokeDashoffset={`${-(loanAmount / totalPayment) * 251.2}`} />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-brand-primary" />
                  Principal: {((loanAmount / totalPayment) * 100).toFixed(0)}%
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-brand-secondary" />
                  Interest: {((totalInterest / totalPayment) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container">
          <div className="max-w-2xl mx-auto card p-8 !rounded-2xl shadow-card-hover border border-border">
            <div className="text-center mb-8">
              <h2 className="section-title text-2xl md:text-3xl mb-2">Check Loan Eligibility</h2>
              <p className="text-text-secondary">Provide a few basic details to check your eligibility in minutes.</p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" className="input" required />
                <input type="tel" placeholder="Phone Number *" className="input" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="select" required>
                  <option value="">Employment Type</option>
                  <option>Salaried</option>
                  <option>Self-Employed / Business</option>
                  <option>Professional</option>
                  <option>NRI</option>
                </select>
                <input type="number" placeholder="Net Monthly Income (₹)" className="input" required />
              </div>
              <button type="button" onClick={() => alert('Eligibility Check Request Sent!')} className="btn-primary w-full justify-center !py-3 bg-brand-secondary hover:bg-brand-secondary/90">
                <Send size={18} /> Request Call Back
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Banking Partners */}
      <section className="py-16 md:py-20 bg-brand-light">
        <div className="section-container text-center">
          <h2 className="section-title text-3xl mb-8">Our Banking Partners</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Bank of Baroda', 'LIC Housing'].map(bank => (
              <div key={bank} className="px-6 py-3 bg-white rounded-xl shadow-card text-text-primary font-semibold text-sm">
                {bank}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container max-w-3xl mx-auto">
          <h2 className="section-title text-3xl md:text-4xl text-center mb-12">Frequently Asked Questions</h2>
          <div className="card !rounded-2xl overflow-hidden">
            {homeLoanFaqs.map((faq, i) => (
              <div key={i} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-light/50 transition"
                >
                  <span className={`font-semibold pr-4 ${openFaq === i ? 'text-brand-primary' : 'text-text-primary'}`}>{faq.question}</span>
                  <ChevronDown size={18} className={`text-brand-secondary flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
