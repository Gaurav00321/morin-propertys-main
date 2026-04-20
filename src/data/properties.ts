import { Property } from '@/types/property'
import { supabase } from '@/lib/supabase'

export async function getProperties(): Promise<Property[]> {
  const { data } = await supabase.from('properties').select('*')
  return data ? data.map(mapProperty) : []
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const { data } = await supabase.from('properties').select('*').eq('slug', slug).single()
  return data ? mapProperty(data) : undefined
}

export async function getPropertiesByLocality(locality: string): Promise<Property[]> {
  const { data } = await supabase.from('properties').select('*').ilike('locality', `%${locality}%`)
  return data ? data.map(mapProperty) : []
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data } = await supabase.from('properties').select('*').eq('featured', true)
  return data ? data.map(mapProperty) : []
}

function mapProperty(dbProp: any): Property {
  return {
    slug: dbProp.slug,
    code: dbProp.code,
    type: dbProp.type,
    title: dbProp.title,
    location: dbProp.location,
    locality: dbProp.locality,
    price: dbProp.price,
    priceLabel: dbProp.price_label,
    bhk: dbProp.bhk,
    bedrooms: dbProp.bedrooms,
    bathrooms: dbProp.bathrooms,
    area: dbProp.area,
    areaUnit: dbProp.area_unit,
    floor: dbProp.floor,
    facing: dbProp.facing,
    age: dbProp.age,
    parking: dbProp.parking,
    description: dbProp.description,
    highlights: dbProp.highlights || [],
    images: dbProp.images || [],
    videos: dbProp.videos || [],
    featured: dbProp.featured,
    badge: dbProp.badge,
    nearbyPlaces: dbProp.nearby_places || [],
    mapEmbedUrl: dbProp.map_embed_url
  } as Property
}

