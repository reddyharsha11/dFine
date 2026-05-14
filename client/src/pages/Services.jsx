import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CLINIC, SERVICES } from '../utils/constants'

const categories = ['All', 'Cosmetic', 'Restorative', 'Orthodontics', 'General']

export default function ServicesPage() {
  const [category, setCategory] = useState('All')
  const filtered = useMemo(
    () => (category === 'All' ? SERVICES : SERVICES.filter((service) => service.category === category)),
    [category]
  )

  return (
    <>
      <Helmet>
        <title>Our Services | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">dFine Dental</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Cosmetic, restorative, orthodontic, and preventive dentistry designed around comfort,
            clarity, and long-term oral health.
          </p>
          <p className="mt-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>{' '}
            / Services
          </p>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-b border-primary/10 bg-white/95 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-heading font-semibold transition ${
                category === item ? 'bg-primary text-white' : 'bg-surface-soft text-ink-secondary hover:bg-primary-pale'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((service) => (
            <motion.article
              layout
              key={service.slug}
              className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-teal-sm transition hover:-translate-y-1 hover:shadow-teal-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent-light px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                  {service.category}
                </span>
                <span className="rounded-full bg-primary-pale px-3 py-1 text-xs font-semibold text-primary">
                  {service.priceFrom}
                </span>
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary">{service.name}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-secondary">{service.long}</p>
              <div className="mt-5 rounded-2xl bg-surface-soft p-4 text-sm text-ink-secondary">
                <p className="font-semibold text-ink-primary">Ideal for</p>
                <p className="mt-1">{service.for[0]}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/services/${service.slug}`}
                  className="rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-pale"
                >
                  Know More
                </Link>
                <Link
                  to={`/book?service=${encodeURIComponent(service.name)}`}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
                >
                  Book This
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </>
  )
}
