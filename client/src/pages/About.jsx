import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  CLINIC,
  PARTNERS,
  TIMELINE,
  VALUE_PILLARS,
} from '../utils/constants'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">About dFine</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Where Precision Meets Compassion</h1>
          <p className="mt-4 text-lg text-white/75">
            We believe modern dentistry should feel calm, clear, and deeply considered from the
            first consultation onward.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 lg:grid lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="font-display text-4xl leading-tight text-primary">
            "We slow down where it matters most: diagnosis, planning, consent, and follow-through."
          </p>
        </div>
        <div className="mt-8 space-y-4 text-ink-secondary lg:mt-0">
          <p>
            {CLINIC.name} serves Khajaguda and surrounding Hyderabad with extended hours, a
            premium atmosphere, and specialist-led care that respects both comfort and outcomes.
          </p>
          <p>
            From invisible aligners to pain-aware endodontics and smile makeovers, our approach is
            rooted in transparent communication and careful execution rather than rushed treatment.
          </p>
          <p>
            We want patients to feel informed, supported, and genuinely looked after at every step.
          </p>
        </div>
      </section>

      <section className="bg-surface-section py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl text-ink-primary">Our Story</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {TIMELINE.map((item) => (
              <div key={item.year} className="rounded-2xl bg-white p-5 shadow-teal-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-accent">{item.year}</p>
                <p className="mt-2 text-sm leading-6 text-ink-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[32px] bg-surface-soft shadow-teal-sm">
            <img
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1000&q=80&auto=format&fit=crop"
              alt={CLINIC.doctorName}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
          <div className="rounded-[32px] border border-primary/10 bg-white p-8 shadow-teal-sm">
            <p className="font-label text-xs uppercase tracking-[0.3em] text-primary">Meet Your Doctor</p>
            <h2 className="mt-3 font-display text-4xl text-ink-primary">{CLINIC.doctorName}</h2>
            <p className="mt-2 text-lg text-ink-secondary">{CLINIC.doctorTitle}</p>
            <div className="mt-5 h-1 w-16 rounded-full bg-accent" />
            <p className="mt-5 leading-7 text-ink-secondary">
              Dr. Srujan Kumar combines restorative precision with aesthetic sensitivity, helping
              patients move from pain relief to lasting confidence. The philosophy is simple:
              explain thoroughly, treat gently, and design results that feel natural.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['MDS Endodontics', 'Invisalign Certified', 'Cosmetic Dentistry Focus'].map((item) => (
                <span key={item} className="rounded-full bg-primary-pale px-4 py-2 text-sm font-semibold text-primary">
                  {item}
                </span>
              ))}
            </div>
            <Link
              to="/book"
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
            >
              Book a visit
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl text-ink-primary">Our Values</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VALUE_PILLARS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-teal-sm">
                <h3 className="font-heading text-lg font-bold text-ink-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-4xl text-ink-primary">Certifications & Partners</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div key={partner} className="rounded-2xl border border-primary/10 bg-white p-5 text-center shadow-teal-sm">
              <p className="font-heading text-sm font-bold text-ink-primary">{partner}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
