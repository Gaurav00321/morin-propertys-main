import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import { PhoneCallFAB } from '@/components/ui/PhoneCallFAB'
import { LeadMagnet } from '@/components/ui/LeadMagnet'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Morin Property — Trusted Real Estate in Vadodara',
    template: '%s | Morin Property',
  },
  description:
    'Morin Property is Vadodara\'s trusted real estate agency. Find verified properties, flats, houses & plots in Waghodia Road, Ajwa Road, Subhanpura & more. 325+ happy families served.',
  keywords: [
    'Vadodara real estate', 'property in Vadodara', 'flats in Vadodara',
    'houses for sale Vadodara', 'Waghodia Road property', 'Ajwa Road flats',
    'Morin Property', 'real estate agent Vadodara', 'home loan Vadodara',
    'buy property Vadodara', 'Gujarat real estate',
  ],
  authors: [{ name: 'Morin Property', url: 'https://www.morinpropertys.com' }],
  creator: 'Morin Property',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.morinpropertys.com',
    siteName: 'Morin Property',
    images: [{
      url: 'https://www.morinpropertys.com/og-image.jpg',
      width: 1200, height: 630,
      alt: 'Morin Property — Trusted Real Estate in Vadodara',
    }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.morinpropertys.com' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A3C5E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Morin Property',
              description: 'Vadodara\'s trusted real estate agency helping families buy, sell, and invest in property.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kubereshwar Rd, Goverdhan Twp, Kendranagar',
                addressLocality: 'Vadodara',
                addressRegion: 'Gujarat',
                postalCode: '390025',
                addressCountry: 'IN',
              },
              telephone: '+91-9376786108',
              email: 'morincontact@gmail.com',
              url: 'https://www.morinpropertys.com',
              priceRange: '₹₹',
              openingHours: 'Mo-Sa 09:00-19:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '325',
              },
            }),
          }}
        />
      </head>
      <body className="bg-brand-light text-text-primary antialiased font-sans">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <WhatsAppFAB />
        <PhoneCallFAB />
        <LeadMagnet />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
