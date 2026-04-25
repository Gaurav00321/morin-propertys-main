import { BlogPost } from '@/types/blog'
import { BlogPostCard } from './BlogPostCard'
import { FileText } from 'lucide-react'

interface BlogPostsSectionProps {
  posts: BlogPost[]
}

export function BlogPostsSection({ posts }: BlogPostsSectionProps) {
  if (posts.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-card mb-6">
              <FileText className="text-text-muted" size={32} />
            </div>
            <h3 className="font-serif font-bold text-2xl text-brand-primary mb-2">
              No Articles Yet
            </h3>
            <p className="text-text-muted text-sm max-w-md">
              We&apos;re working on bringing you insightful real estate articles.
              Check back soon for expert tips, market updates, and property guides.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-brand-light" id="blog-posts-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-brand-secondary font-semibold text-sm uppercase tracking-widest mb-2">
            Latest Articles
          </p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-brand-primary">
            Real Estate Insights & Guides
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
