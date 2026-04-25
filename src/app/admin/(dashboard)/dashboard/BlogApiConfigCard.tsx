'use client'

import { useState } from 'react'
import { Key, Globe, Copy, Check, ExternalLink, FileText, Shield } from 'lucide-react'

interface BlogApiConfigCardProps {
  blogApiUrl: string
  blogApiKey: string
  blogCount: number
}

export function BlogApiConfigCard({ blogApiUrl, blogApiKey, blogCount }: BlogApiConfigCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2500)
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2500)
    }
  }

  const maskedKey = blogApiKey
    ? `${blogApiKey.slice(0, 8)}${'•'.repeat(20)}${blogApiKey.slice(-4)}`
    : 'Not configured'

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-[2.5rem] border border-amber-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-amber-200/40 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
              Blog API Configuration
            </h3>
            <p className="text-white/70 text-sm mt-0.5">
              Amtop Blog Agent integration credentials
            </p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-5">
        {/* Blog API URL */}
        <div className="group">
          <label className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
            <Globe size={13} />
            Blog API Endpoint
          </label>
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-amber-200/60 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <code className="flex-1 text-sm font-mono text-teal-900 truncate">
              {blogApiUrl}
            </code>
            <button
              onClick={() => handleCopy(blogApiUrl, 'url')}
              className="shrink-0 p-2 rounded-xl hover:bg-amber-50 transition-colors"
              title="Copy URL"
            >
              {copiedField === 'url' ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-400 group-hover:text-amber-600" />
              )}
            </button>
            <a
              href={blogApiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-2 rounded-xl hover:bg-amber-50 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={16} className="text-gray-400 hover:text-amber-600" />
            </a>
          </div>
        </div>

        {/* Blog API Key */}
        <div className="group">
          <label className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
            <Key size={13} />
            API Key (x-api-key header)
          </label>
          <div className="flex items-center gap-2 bg-white rounded-2xl border border-amber-200/60 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <code className="flex-1 text-sm font-mono text-teal-900 truncate">
              {showKey ? blogApiKey : maskedKey}
            </code>
            <button
              onClick={() => setShowKey(!showKey)}
              className="shrink-0 p-2 rounded-xl hover:bg-amber-50 transition-colors"
              title={showKey ? 'Hide key' : 'Reveal key'}
            >
              <Shield size={16} className={showKey ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'} />
            </button>
            <button
              onClick={() => handleCopy(blogApiKey, 'key')}
              className="shrink-0 p-2 rounded-xl hover:bg-amber-50 transition-colors"
              title="Copy API key"
            >
              {copiedField === 'key' ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-400 group-hover:text-amber-600" />
              )}
            </button>
          </div>
        </div>

        {/* Stats & Usage Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white rounded-2xl border border-amber-200/40 p-4 text-center">
            <p className="text-3xl md:text-4xl font-mono font-bold text-teal-950">{blogCount}</p>
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">
              Published Posts
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-amber-200/40 p-4">
            <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">
              Quick Reference
            </p>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-amber-500 rounded-full" />
                Method: <code className="font-mono text-teal-800 bg-amber-50 px-1 rounded">POST</code>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-amber-500 rounded-full" />
                Auth: <code className="font-mono text-teal-800 bg-amber-50 px-1 rounded">x-api-key</code> header
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-amber-500 rounded-full" />
                Images stored in Supabase
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
