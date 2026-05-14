import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'
import { AnimatedSection } from '../ui/AnimatedSection'

const fallbackGallery = [
  {
    _id: 'fallback-1',
    title: 'Smile Designing',
    imageUrl:
      'https://images.unsplash.com/photo-1606811971618-4486e7c7d8b?w=900&q=80&auto=format&fit=crop',
  },
  {
    _id: 'fallback-2',
    title: 'Modern Operatory',
    imageUrl:
      'https://images.unsplash.com/photo-1588776814546-1ffcef47235e?w=900&q=80&auto=format&fit=crop',
  },
  {
    _id: 'fallback-3',
    title: 'Teeth Alignment',
    imageUrl:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=80&auto=format&fit=crop',
  },
  {
    _id: 'fallback-4',
    title: 'Clinic Ambience',
    imageUrl:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80&auto=format&fit=crop',
  },
]

export function GalleryPreview() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api
      .get('gallery')
      .then((response) => setItems(response.data.data?.slice(0, 4) || []))
      .catch(() => setItems([]))
  }, [])

  const displayItems = useMemo(() => (items.length ? items : fallbackGallery), [items])

  return (
    <AnimatedSection className="bg-surface-soft py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our work</p>
        <h2 className="mt-2 font-display text-4xl text-ink-primary">Real results, real smiles</h2>
        <p className="mt-2 max-w-2xl text-ink-secondary">
          Smile makeovers, treatment spaces, and patient-first interiors from the dFine experience.
        </p>

        <div className="mt-10 grid gap-4 md:h-[420px] md:grid-cols-4 md:grid-rows-2">
          {displayItems.map((item, index) => (
            <figure
              key={item._id}
              className={`group relative min-h-[180px] overflow-hidden rounded-2xl bg-white shadow-teal-sm ${
                index === 0 ? 'md:row-span-2 md:min-h-full' : ''
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title || 'Clinic gallery'}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary shadow">
                {item.title || 'dFine'}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex rounded-full border border-primary/30 px-6 py-3 font-heading font-semibold text-primary hover:bg-primary-pale"
          >
            View full gallery →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
