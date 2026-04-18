import { Locality } from '@/types/property'

export const localities: Locality[] = [
  {
    slug: 'waghodia-road',
    name: 'Waghodia Road',
    description: 'Great connectivity via NH-48, near IT hubs, growing rapidly. Waghodia Road has emerged as one of Vadodara\'s most sought-after residential corridors with excellent infrastructure development and proximity to major employment hubs.',
    propertyCount: 2,
    image: '/images/waghodia-road.jpg',
  },
  {
    slug: 'ajwa-road',
    name: 'Ajwa Road',
    description: 'Peaceful, green surroundings, excellent infrastructure. Ajwa Road is known for its serene environment and well-planned residential communities, making it a preferred choice for families seeking a balance between nature and urban convenience.',
    propertyCount: 0,
    image: '/images/ajwa-road.jpg',
  },
  {
    slug: 'jarod',
    name: 'Jarod',
    description: 'Affordable housing on State Highway with modern amenities. Jarod offers excellent value for money with spacious independent houses and plots, well-connected to Vadodara city via the State Highway.',
    propertyCount: 1,
    image: '/images/jarod.jpg',
  },
  {
    slug: 'subhanpura',
    name: 'Subhanpura',
    description: 'Premium residential area near key city landmarks. Subhanpura is one of Vadodara\'s most established and prestigious neighbourhoods, known for its prime location and proximity to top schools, hospitals, and commercial centres.',
    propertyCount: 0,
    image: '/images/subhanpura.jpg',
  },
]

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find(l => l.slug === slug)
}
