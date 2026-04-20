'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(3000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const r = interestRate / 12 / 100
  const n = tenure * 12
  const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n
  const totalPayment = emi * n
  const totalInterest = totalPayment - loanAmount
  const principalPct = (loanAmount / totalPayment) * 100
  const interestPct = (totalInterest / totalPayment) * 100

  const fmt = (amt: number) => {
    if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`
    if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lac`
    return `₹${Math.round(amt).toLocaleString('en-IN')}`
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page charcoal-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 to-brand-primary/80 z-10" />
        <div className="relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Tools', href: '/tools/emi-calculator' }, { label: 'EMI Calculator' }]} />
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-white mt-6">
            EMI <span className="gold-gradient-text">Calculator</span>
          </h1>
          <p className="text-white/60 text-lg mt-4">Plan your home loan with our free calculator</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container max-w-3xl mx-auto">
          <div className="card-static p-6 md:p-10 !rounded-2xl">
            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Loan Amount</label>
                  <span className="font-mono font-bold text-brand-secondary text-lg">{fmt(loanAmount)}</span>
                </div>
                <input type="range" min={500000} max={50000000} step={100000} value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))} className="w-full h-2" />
                <div className="flex justify-between text-xs text-text-muted mt-1"><span>₹5 Lac</span><span>₹5 Cr</span></div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Interest Rate</label>
                  <span className="font-mono font-bold text-brand-secondary text-lg">{interestRate}%</span>
                </div>
                <input type="range" min={6} max={18} step={0.1} value={interestRate}
                  onChange={e => setInterestRate(Number(e.target.value))} className="w-full h-2" />
                <div className="flex justify-between text-xs text-text-muted mt-1"><span>6%</span><span>18%</span></div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-sm">Loan Tenure</label>
                  <span className="font-mono font-bold text-brand-secondary text-lg">{tenure} Years</span>
                </div>
                <input type="range" min={1} max={30} step={1} value={tenure}
                  onChange={e => setTenure(Number(e.target.value))} className="w-full h-2" />
                <div className="flex justify-between text-xs text-text-muted mt-1"><span>1 Year</span><span>30 Years</span></div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 bg-brand-secondary/10 rounded-2xl">
                  <div className="text-sm text-text-secondary mb-2">Monthly EMI</div>
                  <div className="font-mono font-bold text-3xl text-brand-secondary">{fmt(emi)}</div>
                </div>
                <div className="text-center p-6 bg-brand-light rounded-2xl border border-border/50">
                  <div className="text-sm text-text-secondary mb-2">Total Interest</div>
                  <div className="font-mono font-bold text-2xl text-text-primary">{fmt(totalInterest)}</div>
                </div>
                <div className="text-center p-6 bg-brand-light rounded-2xl border border-border/50">
                  <div className="text-sm text-text-secondary mb-2">Total Payment</div>
                  <div className="font-mono font-bold text-2xl text-text-primary">{fmt(totalPayment)}</div>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center justify-center gap-8">
                <div className="w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1A1A2E" strokeWidth="16"
                      strokeDasharray={`${principalPct / 100 * 251.2} 251.2`} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A84C" strokeWidth="16"
                      strokeDasharray={`${interestPct / 100 * 251.2} 251.2`}
                      strokeDashoffset={`${-principalPct / 100 * 251.2}`} strokeLinecap="round" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="w-4 h-4 rounded bg-brand-primary" /> Principal ({principalPct.toFixed(0)}%)
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="w-4 h-4 rounded bg-brand-secondary" /> Interest ({interestPct.toFixed(0)}%)
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-border">
              <Link href="/services/home-loan" className="btn-primary">
                Get the Best Home Loan Rate <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
