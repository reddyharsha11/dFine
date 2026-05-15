import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Lightbox from 'yet-another-react-lightbox'
import { api } from '../utils/api'
import { CLINIC } from '../utils/constants'
import { getDentalGalleryItems } from '../utils/galleryData'

const tabs = [
  { id: 'all', label: 'All', filter: () => true },
  { id: 'before-after', label: 'Before & After', filter: (item) => item.category === 'before-after' },
  { id: 'clinic', label: 'Clinic Interior', filter: (item) => item.category === 'clinic' },
  { id: 'team', label: 'Team', filter: (item) => item.category === 'team' },
]

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [tab, setTab] = useState('all')
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    api
      .get('gallery')
      .then((response) => setItems(response.data.data || []))
      .catch(() => setItems([]))
  }, [])

  const displayItems = useMemo(() => getDentalGalleryItems(items), [items])

  const filtered = useMemo(() => {
    const matcher = tabs.find((item) => item.id === tab)?.filter || (() => true)
    return displayItems.filter(matcher)
  }, [displayItems, tab])

  const slides = useMemo(
    () =>
      filtered.map((item) => ({
        src: item.imageUrl,
        title: item.title,
        description: item.description,
      })),
    [filtered]
  )

  return (
    <>
      <Helmet>
        <title>Gallery | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">Our Work</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Clinic moments and smile stories</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Browse treatment highlights, before-and-after cases, and the warm environment patients
            step into at dFine.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                tab === item.id ? 'bg-primary text-white' : 'bg-surface-soft text-ink-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 py-10 text-center text-ink-secondary">
            <p>No images found in this category.</p>
          </div>
        ) : (
          <div className="mt-8 columns-1 gap-4 md:columns-2 lg:columns-3">
            {filtered.map((item, itemIndex) => (
              <button
                key={item._id}
                type="button"
                className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[24px] border border-primary/10 bg-white text-left shadow-teal-sm"
                onClick={() => {
                  setIndex(itemIndex)
                  setOpen(true)
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Gallery image'}
                    className="w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-surface-dark/0 text-white opacity-0 transition group-hover:bg-surface-dark/35 group-hover:opacity-100">
                    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold">
                      View
                    </span>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">{item.category}</p>
                  <p className="mt-1 font-heading text-base font-bold text-ink-primary">{item.title}</p>
                  {item.description ? (
                    <p className="mt-2 text-sm text-ink-secondary">{item.description}</p>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: current }) => setIndex(current) }}
      />
    </>
  )
}
