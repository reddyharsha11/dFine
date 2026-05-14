import { Link } from 'react-router-dom'
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { CLINIC, MAPS_DIRECTIONS_URL, SERVICES } from '../../utils/constants'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="border-b border-white/10 bg-gradient-to-r from-primary via-primary-dark to-surface-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-4xl text-white">Ready to Transform Your Smile?</p>
            <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
              Book your appointment today. We are open 7 days a week for consultations, smile
              upgrades, and pain-relief care.
            </p>
          </div>
          <Link
            to="/book"
            className="rounded-full bg-accent px-8 py-3 font-heading font-bold text-white shadow-teal-lg transition hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Book Appointment Now
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl text-primary-light">{CLINIC.shortName}</p>
          <p className="mt-3 text-sm leading-6 text-white/70">{CLINIC.tagline}</p>
          <div className="mt-5 flex gap-3 text-white/80">
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              aria-label="Open Google Maps"
            >
              <MapPin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-full border border-white/20 p-2 opacity-50 transition hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-full border border-white/20 p-2 opacity-50 transition hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            Our Services
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {SERVICES.slice(0, 6).map((service) => (
              <li key={service.slug}>{service.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            Contact Info
          </p>
          <p className="mt-4 text-sm leading-6 text-white/75">{CLINIC.address}</p>
          <a href={CLINIC.phoneHref} className="mt-3 inline-flex items-center gap-2 font-semibold text-white">
            <Phone className="h-4 w-4 text-primary-light" />
            {CLINIC.phone}
          </a>
          <p className="mt-3 text-sm text-white/60">{CLINIC.hoursLabel}</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-center text-xs text-white/50 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2025 dFine Dental & Health Care. All rights reserved.</p>
          <p>Designed with care by Team Kurukshetra.</p>
          <Link to="/admin/login" className="transition hover:text-white/80">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  )
}
