import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MapPin, Menu, Phone, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { CLINIC } from '../../utils/constants'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelId = useId()
  const isHome = pathname === '/'
  const solid = !isHome || scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="hidden border-b border-white/10 bg-surface-dark text-white/85 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs font-label">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary-light" />
            <span>Open Today 10am-10pm | Khajaguda, Hyderabad</span>
          </div>
          <a href={CLINIC.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
            <Phone className="h-3.5 w-3.5 text-primary-light" />
            {CLINIC.phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid ? 'bg-white/95 shadow-teal-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-end gap-2">
            <span className={`font-display text-3xl font-bold ${solid ? 'text-primary' : 'text-white'}`}>
              dFine
            </span>
            <span
              className={`pb-1 font-heading text-sm font-semibold tracking-[0.2em] uppercase ${
                solid ? 'text-ink-secondary' : 'text-white/80'
              }`}
            >
              Dental
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-heading font-medium transition-all ${
                    solid
                      ? isActive
                        ? 'bg-primary-pale text-primary'
                        : 'text-ink-secondary hover:text-primary'
                      : isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CLINIC.phoneHref}
              className={`text-sm font-heading font-semibold ${solid ? 'text-ink-primary' : 'text-white'}`}
            >
              {CLINIC.phone}
            </a>
            <Button as={Link} to="/book" variant="primary" className="!px-5 !py-2.5 text-sm">
              Book Appointment
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex items-center justify-center rounded-full border p-2 lg:hidden ${
              solid ? 'border-primary/20 text-ink-primary' : 'border-white/30 text-white'
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>

        {open ? (
          <div
            id={panelId}
            className="fixed inset-0 z-40 flex flex-col bg-surface-dark/95 px-6 pb-10 pt-24 text-white backdrop-blur lg:hidden"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">
                Navigation
              </p>
              <div className="mt-4 space-y-2">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="block rounded-2xl border border-white/10 px-4 py-4 font-heading text-lg font-semibold hover:bg-white/10"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-5 space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-white/80">
                <p>{CLINIC.address}</p>
                <a href={CLINIC.phoneHref} className="block font-semibold text-white">
                  {CLINIC.phone}
                </a>
                <Button as={Link} to="/book" variant="primary" className="w-full justify-center">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  )
}
