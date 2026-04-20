'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

interface PropertyEnquiryFormProps {
  propertyTitle: string
  propertyCode: string
}

export function PropertyEnquiryForm({ propertyTitle, propertyCode }: PropertyEnquiryFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          source: `Property Detail: ${propertyTitle} (${propertyCode})`,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Failed to submit enquiry:', err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 size={40} className="text-brand-accent mx-auto mb-4" />
        <h4 className="font-serif font-bold text-lg mb-2">Enquiry Sent!</h4>
        <p className="text-text-secondary text-sm">We&apos;ll get back to you shortly regarding this property.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-brand-secondary text-xs font-semibold mt-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your Name *"
        className="input"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number *"
        className="input"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message (optional)"
        className="textarea"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary w-full justify-center"
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
