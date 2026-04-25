import { BlogPost } from '@/types/blog'
import { getMongoDb } from '@/lib/mongodb'

const COLLECTION = 'blog_posts'

/**
 * Fetch all blog posts, sorted by newest first.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = await getMongoDb()
    const docs = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      coverImage: doc.coverImage,
      metaDescription: doc.metaDescription || '',
      keywords: doc.keywords || [],
      sourceUrl: doc.sourceUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })) as BlogPost[]
  } catch (error) {
    console.error('[blogPosts] Failed to fetch all blog posts:', error)
    return []
  }
}

/**
 * Fetch a single blog post by its URL slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const db = await getMongoDb()
    const doc = await db.collection(COLLECTION).findOne({ slug })

    if (!doc) return undefined

    return {
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      content: doc.content,
      coverImage: doc.coverImage,
      metaDescription: doc.metaDescription || '',
      keywords: doc.keywords || [],
      sourceUrl: doc.sourceUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    } as BlogPost
  } catch (error) {
    console.error('[blogPosts] Failed to fetch blog post by slug:', error)
    return undefined
  }
}
