import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { AnimatedSection } from '../ui/AnimatedSection'

export function DoctorSection() {
  return (
    <AnimatedSection className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&auto=format&fit=crop"
            alt="Dr. G. Srujan Kumar"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-teal-lg"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-2 font-label text-xs font-bold text-white shadow-md">
            Endodontist · 10+ yrs
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-primary px-4 py-2 font-label text-xs font-bold text-white shadow-md">
            4.9★ on Google
          </span>
        </div>
        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.3em] text-primary">Meet your doctor</p>
          <h2 className="mt-2 font-display text-4xl text-ink-primary">Dr. G. Srujan Kumar</h2>
          <p className="mt-2 font-heading text-base text-ink-secondary">Endodontist &amp; dental aesthetics specialist</p>
          <div className="mt-4 h-1 w-24 rounded-full bg-accent" />
          <p className="mt-6 text-ink-secondary">
            Known for calm chairside communication and meticulous RCT outcomes. Treatment plans are co-written with
            you — no surprise add-ons, no rushed consent.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['MDS Endodontics', 'Invisalign certified', 'Cosmetic focus'].map((t) => (
              <span key={t} className="rounded-full bg-primary-pale px-3 py-1 text-xs font-semibold text-primary">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button as={Link} to="/book" variant="primary">
              Book with Dr. Kumar →
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
