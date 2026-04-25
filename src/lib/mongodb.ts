import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'morin-property'

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

/**
 * Global cache for the MongoDB client to prevent exhausting connections
 * in serverless/edge environments (Next.js API routes).
 */
interface MongoClientCache {
  client: MongoClient | null
  promise: Promise<MongoClient> | null
}

// Extend globalThis to persist across hot-reloads in dev
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientCache?: MongoClientCache
}

if (!globalWithMongo._mongoClientCache) {
  globalWithMongo._mongoClientCache = { client: null, promise: null }
}

const cache = globalWithMongo._mongoClientCache

/**
 * Returns a connected MongoClient instance (cached / singleton).
 */
async function getMongoClient(): Promise<MongoClient> {
  if (cache.client) {
    return cache.client
  }

  if (!cache.promise) {
    cache.promise = MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 60_000,
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    })
  }

  cache.client = await cache.promise
  return cache.client
}

/**
 * Returns the default Db instance for the Morin Property database.
 */
export async function getMongoDb(): Promise<Db> {
  const client = await getMongoClient()
  return client.db(MONGODB_DB_NAME)
}

export { getMongoClient }
