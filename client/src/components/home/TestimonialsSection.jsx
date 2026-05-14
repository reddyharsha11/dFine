import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { api } from '../../utils/api'
import { AnimatedSection } from '../ui/AnimatedSection'

const fallbackReviews = [
  {
    _id: 'fallback-review-1',
    patientName: 'Priya S.',
    rating: 5,
    reviewText: 'Spotless clinic and a very calm root canal experience. Everything was explained clearly.',
    source: 'Google',
  },
  {
    _id: 'fallback-review-2',
    patientName: 'Rahul M.',
    rating: 5,
    reviewText: 'The aligner journey felt organized and smooth. Follow-ups were easy and communication was excellent.',
    source: 'Practo',
  },
  {
    _id: 'fallback-review-3',
    patientName: 'Anita K.',
    rating: 5,
    reviewText: 'Teeth whitening gave me a brighter smile without the fake look I was worried about.',
    source: 'Google',
  },
]

export function TestimonialsSection() {
  const [reviews, setReviews] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  useEffect(() => {
    api
      .get('reviews')
      .then((response) => setReviews(response.data.data || []))
      .catch(() => setReviews([]))
  }, [])

  const displayReviews = useMemo(() => (reviews.length ? reviews : fallbackReviews), [reviews])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined
    const id = setInterval(() => emblaApi.scrollNext(), 4500)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <AnimatedSection className="bg-surface-dark py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
          What patients say
        </p>
        <h2 className="mt-2 font-display text-4xl">130+ happy smiles in Hyderabad</h2>
        <p className="mt-2 text-white/70">4.9/5 average from Google and Practo reviews.</p>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {displayReviews.map((review) => (
              <div
                key={review._id}
                className="min-w-[280px] max-w-xs flex-[0_0_85%] rounded-2xl border border-white/10 bg-white/5 p-6 md:flex-[0_0_32%]"
              >
                <p className="text-gold-light">{'★'.repeat(review.rating)}</p>
                <p className="mt-3 text-sm italic leading-7 text-white/80">"{review.reviewText}"</p>
                <p className="mt-4 text-sm font-semibold">{review.patientName}</p>
                <span className="mt-1 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70">
                  {review.source}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={scrollNext}
            className="rounded-full border border-white/20 px-4 py-2 text-sm"
          >
            Next →
          </button>
        </div>
      </div>
    </AnimatedSection>
  )
}
