import { CLINIC, MAPS_DIRECTIONS_URL } from './constants'
import { DENTAL_GALLERY_IMAGES } from './galleryData'

export const LOCAL_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@dfinedental.local'
export const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Dental@12345'
export const LOCAL_ADMIN_TOKEN_PREFIX = 'local-admin'

export function isLocalAdminToken(token) {
  return String(token || '').startsWith(`${LOCAL_ADMIN_TOKEN_PREFIX}:`)
}

export function createLocalAdminToken() {
  return `${LOCAL_ADMIN_TOKEN_PREFIX}:${Date.now()}`
}

export function isLocalAdminLogin(email, password) {
  return email.trim().toLowerCase() === LOCAL_ADMIN_EMAIL.toLowerCase() && password === LOCAL_ADMIN_PASSWORD
}

export function getFallbackDashboardData() {
  return {
    stats: { pending: 0, completedThisMonth: 0, bookingsThisMonth: 0 },
    appointments: [],
    reviews: [],
    gallery: DENTAL_GALLERY_IMAGES,
    messages: [],
    settings: {
      clinicName: CLINIC.name,
      phone: CLINIC.phone,
      email: CLINIC.email,
      address: CLINIC.address,
      hours: CLINIC.hoursLabel,
      googleMapsUrl: MAPS_DIRECTIONS_URL,
      whatsappNumber: CLINIC.whatsappNumber,
    },
  }
}
