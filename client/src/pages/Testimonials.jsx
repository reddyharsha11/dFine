import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CLINIC, MAPS_DIRECTIONS_URL, RATING_BREAKDOWN } from '../utils/constants'
import { api } from '../utils/api'

const starFilters = ['All', '5', '4']
const sourceFilters = ['All', 'Google', 'Practo']

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(12)
  const [starFilter, setStarFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')

  useEffect(() => {
    api
      .get('reviews')
      .then((response) => setReviews(response.data.data || []))
      .catch(() => setReviews([]))
  }, [])

  const filtered = useMemo(() => {
    return reviews.filter((review) => {
      const starMatch = starFilter === 'All' || String(review.rating) === starFilter
      const sourceMatch = sourceFilter === 'All' || review.source === sourceFilter
      return starMatch && sourceMatch
    })
  }, [reviews, sourceFilter, starFilter])

  const visible = filtered.slice(0, visibleCount)

  return (
    <>
      <Helmet>
        <title>Reviews | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">Patient Love</p>
          <p className="mt-4 font-display text-7xl text-white md:text-8xl">4.9 / 5</p>
          <p className="mt-2 text-lg text-white/75">Based on 130+ reviews from Google and Practo</p>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {RATING_BREAKDOWN.map((item) => (
              <div key={item.label} className="grid grid-cols-[80px_1fr_48px] items-center gap-3 text-sm">
                <span className="text-right text-white/75">{item.label}</span>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${item.value}%` }} />
                </div>
                <span className="text-left text-white/75">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 rounded-[28px] border border-primary/10 bg-white p-5 shadow-teal-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-ink-primary">Filter reviews</p>
            <p className="text-sm text-ink-secondary">Browse feedback by rating or source.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              {starFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStarFilter(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    starFilter === item ? 'bg-primary text-white' : 'bg-surface-soft text-ink-secondary'
                  }`}
                >
                  {item === 'All' ? 'All stars' : `${item} star`}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {sourceFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSourceFilter(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    sourceFilter === item ? 'bg-accent text-white' : 'bg-accent-light text-accent'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((review) => (
            <article key={review._id} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-teal-sm">
              <p className="text-gold">{'★'.repeat(review.rating)}</p>
              <p className="mt-3 text-sm leading-7 text-ink-secondary">"{review.reviewText}"</p>
              <p className="mt-4 font-semibold text-ink-primary">{review.patientName}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
                <span>{review.source}</span>
                <span>{new Date(review.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </article>
          ))}
        </div>

        {visible.length < filtered.length ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 12)}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white"
            >
              Load More
            </button>
          </div>
        ) : null}
      </section>

      <section className="bg-surface-section py-14 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-4xl text-ink-primary">Had a great experience?</h2>
          <p className="mt-3 text-ink-secondary">
            Your review helps more patients discover specialist-led, comfort-first dental care in
            Khajaguda.
          </p>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-white"
          >
            Leave a Review
          </a>
        </div>
      </section>
    </>
  )
}
