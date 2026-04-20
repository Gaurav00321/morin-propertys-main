'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-teal-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-teal-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-900/20 rotate-3">
             <span className="text-white font-serif text-3xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-serif text-teal-950 font-bold mb-2">Admin Portal</h1>
          <p className="text-gray-500 text-sm">Secure access for Morin Properties</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium border border-red-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-teal-900 uppercase tracking-widest ml-1">Archive ID</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all font-medium text-teal-900"
              placeholder="admin@morinpropertys.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-teal-900 uppercase tracking-widest ml-1">Security Key</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all font-mono"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-teal-950 text-white py-4 rounded-2xl font-bold hover:bg-teal-900 transition-all shadow-xl active:scale-[0.98] mt-4"
          >
            Authenticate Access
          </button>
        </form>
      </div>
    </div>
  )
}
