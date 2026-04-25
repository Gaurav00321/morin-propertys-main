import { NextRequest, NextResponse } from 'next/server'
import { getMongoDb } from '@/lib/mongodb'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { CreateBlogPostPayload, BlogPost } from '@/types/blog'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION = 'blog_posts'
const BLOG_BUCKET = process.env.SUPABASE_BLOG_BUCKET || 'blog-images'

/* ─── helpers ─── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function validateApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key')
  return apiKey === process.env.BLOG_API_KEY
}

function validatePayload(body: unknown): { valid: boolean; error?: string; data?: CreateBlogPostPayload } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' }
  }

  const payload = body as Record<string, unknown>

  if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    return { valid: false, error: 'title is required and must be a non-empty string' }
  }

  if (!payload.content || typeof payload.content !== 'string' || payload.content.trim().length === 0) {
    return { valid: false, error: 'content is required and must be a non-empty string' }
  }

  if (!payload.coverImage || typeof payload.coverImage !== 'string') {
    return { valid: false, error: 'coverImage is required and must be a valid URL string' }
  }

  if (payload.keywords && !Array.isArray(payload.keywords)) {
    return { valid: false, error: 'keywords must be an array of strings' }
  }

  return {
    valid: true,
    data: {
      title: (payload.title as string).trim(),
      content: (payload.content as string).trim(),
      coverImage: (payload.coverImage as string).trim(),
      metaDescription: typeof payload.metaDescription === 'string' ? payload.metaDescription.trim() : undefined,
      keywords: Array.isArray(payload.keywords)
        ? (payload.keywords as string[]).map((k) => String(k).trim())
        : [],
      sourceUrl: typeof payload.sourceUrl === 'string' ? payload.sourceUrl.trim() : undefined,
    },
  }
}

/**
 * Downloads an image from an external URL and uploads it to Supabase Storage.
 * Returns the public URL of the uploaded image.
 */
async function uploadCoverImage(imageUrl: string): Promise<string> {
  // Fetch the image from the external URL
  const response = await fetch(imageUrl, { signal: AbortSignal.timeout(30_000) })

  if (!response.ok) {
    throw new Error(`Failed to download cover image: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const buffer = Buffer.from(await response.arrayBuffer())

  // Determine file extension from content type
  const extMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  }
  const ext = extMap[contentType] || 'jpg'
  const fileName = `blog-covers/${uuidv4()}.${ext}`

  // Upload to Supabase Storage
  const { error } = await supabaseAdmin.storage
    .from(BLOG_BUCKET)
    .upload(fileName, buffer, {
      contentType,
      upsert: false,
      cacheControl: '31536000', // 1 year cache
    })

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`)
  }

  // Get the public URL
  const { data: publicUrlData } = supabaseAdmin.storage
    .from(BLOG_BUCKET)
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}

/* ─── POST /api/blogs ─── */

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    if (!validateApiKey(req)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or missing API key' },
        { status: 401 }
      )
    }

    // 2. Parse & validate body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const validation = validatePayload(body)
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const payload = validation.data

    // 3. Upload cover image to Supabase
    let coverImageUrl: string
    try {
      coverImageUrl = await uploadCoverImage(payload.coverImage)
    } catch (uploadError) {
      console.error('[api/blogs] Image upload failed:', uploadError)
      return NextResponse.json(
        { success: false, error: 'Failed to upload cover image to storage' },
        { status: 502 }
      )
    }

    // 4. Generate unique slug
    const db = await getMongoDb()
    const baseSlug = slugify(payload.title)
    let slug = baseSlug
    let counter = 0

    // Ensure slug uniqueness
    while (await db.collection(COLLECTION).findOne({ slug })) {
      counter++
      slug = `${baseSlug}-${counter}`
    }

    // 5. Insert into MongoDB
    const now = new Date().toISOString()
    const blogPost: Omit<BlogPost, '_id'> = {
      title: payload.title,
      slug,
      content: payload.content,
      coverImage: coverImageUrl,
      metaDescription: payload.metaDescription || payload.title,
      keywords: payload.keywords || [],
      sourceUrl: payload.sourceUrl,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection(COLLECTION).insertOne(blogPost)

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId.toString(),
          slug: blogPost.slug,
          title: blogPost.title,
          coverImage: blogPost.coverImage,
          createdAt: blogPost.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[api/blogs] POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/* ─── GET /api/blogs ─── */

export async function GET() {
  try {
    const db = await getMongoDb()
    const docs = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .project({ content: 0 }) // Exclude full content for listing
      .toArray()

    const posts = docs.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      coverImage: doc.coverImage,
      metaDescription: doc.metaDescription,
      keywords: doc.keywords,
      sourceUrl: doc.sourceUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }))

    return NextResponse.json({ success: true, data: posts, count: posts.length })
  } catch (error) {
    console.error('[api/blogs] GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
