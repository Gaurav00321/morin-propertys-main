export interface Property {
  slug: string
  code: string
  type: 'Flat / Apartment' | 'Independent House' | 'Plot' | 'Commercial'
  title: string
  location: string
  locality: string
  price: number
  priceLabel: string
  bhk: string
  bedrooms: number
  bathrooms: number
  area: number
  areaUnit: string
  floor?: string
  facing?: string
  age?: string
  parking?: string
  description: string
  highlights: string[]
  images: string[]
  featured: boolean
  badge: 'For Sale' | 'Hot Deal' | 'New' | 'Sold'
  nearbyPlaces?: { name: string; distance: string }[]
  mapEmbedUrl?: string
}

export interface Enquiry {
  name: string
  phone: string
  email?: string
  userType?: 'Buyer' | 'Seller' | 'Investor' | 'Other'
  propertyType?: string
  budgetRange?: string
  message?: string
  propertyCode?: string
  source?: string
}

export interface Project {
  slug: string
  name: string
  location: string
  type: string
  status: 'Available' | 'Under Construction' | 'Sold Out'
  reraNo?: string
  description: string
  highlights: string[]
  unitConfigs: string[]
  amenities: { icon: string; label: string }[]
  images: string[]
  startingPrice?: string
  mapEmbedUrl?: string
  distances?: { place: string; distance: string }[]
}

export interface Testimonial {
  id: number
  name: string
  quote: string
  rating: number
  type?: 'Buyer' | 'Seller' | 'Investor'
  date?: string
}

export interface Locality {
  slug: string
  name: string
  description: string
  propertyCount: number
  image: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  bio?: string
}
