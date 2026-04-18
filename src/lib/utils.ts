import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100000) {
    const lac = amount / 100000
    return `₹${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(2)} Lac`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919376786108'
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE || '+91-9376786108'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.morinpropertys.com'
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Morin Property'

export function getWhatsAppUrl(message?: string): string {
  const msg = message || "Hello! I found your website and I'm interested in properties in Vadodara."
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function getCallUrl(): string {
  return `tel:${PHONE_NUMBER.replace(/\s+/g, '')}`
}
