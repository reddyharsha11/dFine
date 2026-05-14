import { MapPin, Phone } from 'lucide-react'
import { CLINIC, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '../../utils/constants'
import { AnimatedSection } from '../ui/AnimatedSection'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER || CLINIC.whatsappNumber

export function MapSection() {
  return (
    <AnimatedSection className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:items-stretch">
        <iframe
          title="dFine Dental map"
          src={MAPS_EMBED_URL}
          className="min-h-[320px] w-full rounded-2xl border-0 shadow-teal-lg"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="flex flex-col justify-between rounded-2xl bg-surface-soft p-8 shadow-teal-sm">
          <div>
            <h3 className="font-display text-3xl text-primary">{CLINIC.name}</h3>
            <p className="mt-3 flex gap-2 text-sm text-ink-secondary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {CLINIC.address}
            </p>
            <a href={CLINIC.phoneHref} className="mt-4 inline-flex items-center gap-2 font-heading font-bold text-ink-primary">
              <Phone className="h-4 w-4 text-primary" />
              {CLINIC.phone}
            </a>
            <p className="mt-2 text-sm text-ink-muted">{CLINIC.hoursLabel}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Get directions
            </a>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
