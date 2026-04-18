import { Property } from '@/types/property'

export const properties: Property[] = [
  {
    slug: '5-bhk-independent-house-waghodia-road',
    code: 'SF0043',
    type: 'Independent House',
    title: '5 BHK Independent House',
    location: 'Waghodia Road, Vadodara',
    locality: 'Waghodia Road',
    price: 6600000,
    priceLabel: '₹66 Lac',
    bhk: '5 BHK',
    bedrooms: 5,
    bathrooms: 3,
    area: 1250,
    areaUnit: 'sq.ft.',
    floor: 'Ground + 1',
    facing: 'East',
    age: 'New Construction',
    parking: '2 Car Parking',
    description: 'A spacious and beautifully designed 5 BHK independent house located on Waghodia Road, one of Vadodara\'s fastest-growing residential corridors. This property offers generous living spaces, modern interiors, and excellent connectivity to schools, hospitals, and the NH-48. Perfect for large families looking for a comfortable and well-connected home.',
    highlights: [
      'Spacious 5 BHK with 1250 sq.ft. built-up area',
      'Prime location on Waghodia Road with NH-48 connectivity',
      'Near top schools, hospitals, and IT hubs',
      'Modern construction with quality fittings',
      'East-facing with ample natural light',
      'Dedicated parking for 2 cars',
    ],
    images: [],
    featured: true,
    badge: 'For Sale',
    nearbyPlaces: [
      { name: 'NH-48 Highway', distance: '0.5 km' },
      { name: 'Waghodia Road IT Hub', distance: '2 km' },
      { name: 'SSG Hospital', distance: '5 km' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1710!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzI2LjAiTiA3M8KwMTAnMTUuNiJF!5e0!3m2!1sen!2sin!4v1',
  },
  {
    slug: '2-bhk-flat-waghodia-road',
    code: 'SF0042',
    type: 'Flat / Apartment',
    title: '2 BHK Flat / Apartment',
    location: 'Waghodia Road, Vadodara',
    locality: 'Waghodia Road',
    price: 3055000,
    priceLabel: '₹30.55 Lac',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: 760,
    areaUnit: 'sq.ft.',
    floor: '3rd Floor',
    facing: 'West',
    age: 'Under Construction',
    parking: '1 Car Parking',
    description: 'A well-planned 2 BHK apartment in a modern residential complex on Waghodia Road. This flat offers an efficient layout with quality construction, making it an ideal choice for young families and first-time home buyers. The project features contemporary amenities and is situated in a rapidly developing area with excellent infrastructure.',
    highlights: [
      'Compact yet spacious 2 BHK layout (760 sq.ft.)',
      'Affordable price point for first-time buyers',
      'Modern amenities in the residential complex',
      'Growing neighbourhood with appreciating property values',
      'Close to schools, markets, and public transport',
      'Ready-to-move-in apartment',
    ],
    images: [],
    featured: true,
    badge: 'Hot Deal',
    nearbyPlaces: [
      { name: 'D-Mart Waghodia Road', distance: '1 km' },
      { name: 'Waghodia Bus Stop', distance: '0.3 km' },
      { name: 'Baroda High School', distance: '3 km' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1710!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzI2LjAiTiA3M8KwMTAnMTUuNiJF!5e0!3m2!1sen!2sin!4v1',
  },
  {
    slug: '2-bhk-independent-house-jarod',
    code: 'SD0041',
    type: 'Independent House',
    title: '2 BHK Independent House',
    location: 'Jarod, Vadodara',
    locality: 'Jarod',
    price: 3551000,
    priceLabel: '₹35.51 Lac',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    areaUnit: 'sq.ft.',
    floor: 'Ground Floor',
    facing: 'North',
    age: 'Ready to Move',
    parking: '1 Car Parking',
    description: 'A well-built 2 BHK independent house in Jarod, offering generous space at an affordable price. Located on the State Highway with easy access to city amenities, this property is perfect for families looking for an independent home with modern conveniences. The area is developing rapidly with new infrastructure projects underway.',
    highlights: [
      'Generous 1150 sq.ft. built-up area',
      'Affordable independent house option',
      'Located on State Highway for easy connectivity',
      'Developing area with high appreciation potential',
      'Modern amenities and quality construction',
      'North-facing with good ventilation',
    ],
    images: [],
    featured: true,
    badge: 'For Sale',
    nearbyPlaces: [
      { name: 'State Highway', distance: '0.2 km' },
      { name: 'Jarod Railway Station', distance: '1 km' },
      { name: 'Vadodara City Centre', distance: '15 km' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.2210!3d22.3572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzI2LjAiTiA3M8KwMTAnMTUuNiJF!5e0!3m2!1sen!2sin!4v1',
  },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug)
}

export function getPropertiesByLocality(locality: string): Property[] {
  return properties.filter(p => p.locality.toLowerCase().replace(/\s+/g, '-') === locality.toLowerCase())
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.featured)
}
