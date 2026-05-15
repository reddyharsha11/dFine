export const DENTAL_GALLERY_IMAGES = [
  {
    _id: 'fallback-smile-design',
    category: 'before-after',
    title: 'Smile Design Planning',
    description: 'Close-up cosmetic smile planning and shade refinement.',
    imageUrl: '/gallery/smile-design.svg',
  },
  {
    _id: 'fallback-operatory',
    category: 'clinic',
    title: 'Modern Dental Operatory',
    description: 'A clean treatment room prepared for precise dental care.',
    imageUrl: '/gallery/operatory.svg',
  },
  {
    _id: 'fallback-aligners',
    category: 'before-after',
    title: 'Alignment Consultation',
    description: 'Orthodontic review for aligners and bite correction.',
    imageUrl: '/gallery/aligners.svg',
  },
  {
    _id: 'fallback-treatment',
    category: 'clinic',
    title: 'Gentle Treatment Setup',
    description: 'Dental instruments and chairside setup before a procedure.',
    imageUrl: '/gallery/treatment-setup.svg',
  },
  {
    _id: 'fallback-whitening',
    category: 'before-after',
    title: 'Whitening Review',
    description: 'Aesthetic review for natural-looking whitening results.',
    imageUrl: '/gallery/whitening.svg',
  },
  {
    _id: 'fallback-team',
    category: 'team',
    title: 'Dental Care Team',
    description: 'Clinical support for calm, coordinated patient care.',
    imageUrl: '/gallery/team.svg',
  },
]

export function getDentalGalleryItems(items, limit) {
  const usefulItems = items.filter((item) => item.imageUrl && item.imageUrl.startsWith('/gallery/'))
  const source = usefulItems.length ? usefulItems : DENTAL_GALLERY_IMAGES
  return typeof limit === 'number' ? source.slice(0, limit) : source
}
