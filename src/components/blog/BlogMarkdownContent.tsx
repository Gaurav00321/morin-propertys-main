'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

interface BlogMarkdownContentProps {
  markdown: string
}

export function BlogMarkdownContent({ markdown }: BlogMarkdownContentProps) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mt-10 mb-4 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary mt-8 mb-3 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-brand-primary mt-6 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-sans font-semibold text-brand-primary mt-5 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-text-secondary leading-relaxed mb-4 text-[16px]">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary hover:text-brand-secondary/80 underline underline-offset-4 transition-colors font-medium"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary ml-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary ml-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[16px] leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-secondary pl-4 py-2 my-6 bg-brand-light/60 rounded-r-lg italic text-text-secondary">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-brand-light px-2 py-0.5 rounded text-sm font-mono text-brand-primary border border-border">
                  {children}
                </code>
              )
            }
            return (
              <code className={`${className || ''} text-sm`}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-brand-primary text-white/90 rounded-2xl p-5 my-6 overflow-x-auto text-sm font-mono border border-white/10">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            <span className="block my-6 rounded-2xl overflow-hidden border border-border">
              <Image
                src={src || ''}
                alt={alt || 'Blog image'}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </span>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-border">
              <table className="w-full text-sm text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-brand-light text-brand-primary font-semibold text-xs uppercase tracking-wider">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 border-b border-border">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-b border-border text-text-secondary">{children}</td>
          ),
          hr: () => (
            <hr className="my-8 border-border" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-brand-primary">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-text-secondary">{children}</em>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
