'use client'
import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ArrowLeft, ArrowRight, CheckCircle2, Upload } from 'lucide-react'

const totalSteps = 6

export default function PostPropertyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const next = () => setStep(s => Math.min(s + 1, totalSteps))
  const prev = () => setStep(s => Math.max(s - 1, 1))
  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <main id="main-content" className="min-h-screen">
        <Header />
        <section className="hero-section hero-section--page navy-gradient">
          <div className="hero-overlay !bg-brand-primary/30" />
          <div className=" text-center w-full">
            <h1 className="font-serif font-bold text-4xl text-white">Thank You!</h1>
          </div>
        </section>
        <section className="py-24 bg-brand-light">
          <div className="section-container text-center max-w-lg mx-auto">
            <CheckCircle2 size={64} className="text-brand-accent mx-auto mb-6" />
            <h2 className="font-serif font-bold text-2xl mb-4">Property Submitted Successfully!</h2>
            <p className="text-text-secondary mb-8">Our team will contact you within 24 hours to verify and list your property.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <section className="hero-section hero-section--page bg-brand-primary min-h-[40vh] md:min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className=" relative z-20 text-center w-full px-4">
          <Breadcrumb items={[{ label: 'Post Property' }]} />
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mt-6">
            Sell or Rent Your <span className="gold-gradient-text">Property</span>
          </h1>
          <p className="text-white drop-shadow-md text-lg mt-4">Reach 1000s of Genuine Buyers</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-brand-light">
        <div className="section-container max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-text-muted mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-secondary rounded-full transition-all duration-500"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <div className="card p-6 md:p-8 !rounded-2xl">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Property Basics</h3>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">I want to *</label>
                  <div className="flex gap-3">
                    {['Sell', 'Rent'].map(opt => (
                      <label key={opt} className="flex-1 flex items-center justify-center gap-2 p-3 bg-brand-light rounded-xl cursor-pointer hover:bg-brand-secondary/10 transition border border-transparent has-[:checked]:border-brand-secondary">
                        <input type="radio" name="purpose" value={opt} className="accent-brand-secondary" />
                        <span className="font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Property Type *</label>
                  <select className="select"><option value="">Select</option><option>Flat</option><option>House</option><option>Plot</option><option>Commercial</option></select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-semibold mb-1.5 block">Bedrooms</label><select className="select"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div>
                  <div><label className="text-sm font-semibold mb-1.5 block">Bathrooms</label><select className="select"><option>1</option><option>2</option><option>3</option><option>4+</option></select></div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Location</h3>
                <div><label className="text-sm font-semibold mb-1.5 block">City</label><input className="input" defaultValue="Vadodara" /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Locality *</label><select className="select"><option value="">Select</option><option>Waghodia Road</option><option>Ajwa Road</option><option>Jarod</option><option>Subhanpura</option><option>Other</option></select></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Landmark / Address</label><input className="input" placeholder="Near..." /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">PIN Code</label><input className="input" placeholder="390025" /></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-semibold mb-1.5 block">Total Area (sq.ft.)</label><input className="input" type="number" /></div>
                  <div><label className="text-sm font-semibold mb-1.5 block">Covered Area (sq.ft.)</label><input className="input" type="number" /></div>
                  <div><label className="text-sm font-semibold mb-1.5 block">Floor Number</label><input className="input" type="number" /></div>
                  <div><label className="text-sm font-semibold mb-1.5 block">Total Floors</label><input className="input" type="number" /></div>
                </div>
                <div><label className="text-sm font-semibold mb-1.5 block">Age of Property</label><select className="select"><option>New</option><option>1-3 years</option><option>3-5 years</option><option>5-10 years</option><option>10+ years</option></select></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Facing</label><select className="select"><option>North</option><option>South</option><option>East</option><option>West</option></select></div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Pricing</h3>
                <div><label className="text-sm font-semibold mb-1.5 block">Expected Price (₹) *</label><input className="input" type="number" placeholder="e.g. 3500000" /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Price Negotiable?</label><div className="flex gap-3"><label className="flex items-center gap-2"><input type="radio" name="negotiable" value="yes" className="accent-brand-secondary" /> Yes</label><label className="flex items-center gap-2"><input type="radio" name="negotiable" value="no" className="accent-brand-secondary" /> No</label></div></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Maintenance (₹/month)</label><input className="input" type="number" /></div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Contact Details</h3>
                <div><label className="text-sm font-semibold mb-1.5 block">Owner Name *</label><input className="input" required /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Phone Number *</label><input className="input" type="tel" required /></div>
                <div><label className="text-sm font-semibold mb-1.5 block">Email</label><input className="input" type="email" /></div>
              </div>
            )}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl mb-4">Photos</h3>
                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-brand-secondary/50 transition-colors cursor-pointer">
                  <Upload size={40} className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary font-medium">Drag & drop images here</p>
                  <p className="text-text-muted text-sm mt-1">Max 10 photos, 5MB each</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <button onClick={prev} className="btn-secondary !py-2.5">
                  <ArrowLeft size={16} /> Previous
                </button>
              ) : <div />}
              {step < totalSteps ? (
                <button onClick={next} className="btn-primary !py-2.5">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary !py-2.5">
                  Submit Property <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
