import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { CLINIC, SERVICES, getServiceBySlug } from '../utils/constants'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-ink-primary">Service not found</h1>
        <p className="mt-3 text-ink-secondary">
          The requested service could not be located. Please return to the services page.
        </p>
        <Link to="/services" className="mt-6 inline-block text-primary underline">
          Back to services
        </Link>
      </div>
    )
  }

  const related = SERVICES.filter((item) => item.slug !== service.slug && item.category === service.category).slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{service.name} | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.6fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm text-white/60">
              <Link to="/" className="hover:text-white">
                Home
              </Link>{' '}
              /{' '}
              <Link to="/services" className="hover:text-white">
                Services
              </Link>{' '}
              / {service.name}
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">{service.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">{service.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <span className="rounded-full bg-white/10 px-4 py-2">{service.category}</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Starting from {service.priceFrom}</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="font-heading text-lg font-semibold text-white">Book This Service</p>
            <p className="mt-2 text-sm text-white/70">
              Speak with the clinic or move into the full booking flow to pick your preferred slot.
            </p>
            <Button
              as={Link}
              to={`/book?service=${encodeURIComponent(service.name)}`}
              variant="primary"
              className="mt-5 w-full justify-center"
            >
              Continue to Booking
            </Button>
            <div className="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-white/70">
              <p className="font-semibold text-white">{CLINIC.phone}</p>
              <p className="mt-1">{CLINIC.hoursLabel}</p>
              <p className="mt-1">{CLINIC.address}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 lg:grid lg:grid-cols-[1.55fr_0.85fr] lg:gap-10">
        <div className="space-y-10">
          <Section title="What is it?">
            <p className="leading-7 text-ink-secondary">{service.long}</p>
          </Section>

          <Section title="How it works">
            <ol className="grid gap-3">
              {service.steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-primary/10 bg-white p-4 shadow-teal-sm">
                  <span className="text-sm font-bold text-accent">Step {index + 1}</span>
                  <p className="mt-1 text-ink-secondary">{step}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Who is it for?">
            <ul className="grid gap-3 md:grid-cols-2">
              {service.for.map((item) => (
                <li key={item} className="rounded-2xl bg-surface-soft p-4 text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="What to expect">
            <ul className="space-y-3">
              {service.expectations.map((item) => (
                <li key={item} className="rounded-2xl border border-primary/10 bg-white p-4 text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Frequently asked questions">
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-teal-sm">
                  <h3 className="font-heading text-lg font-semibold text-ink-primary">{faq.q}</h3>
                  <p className="mt-2 leading-7 text-ink-secondary">{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {related.length ? (
            <Section title="Related services">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    className="rounded-2xl border border-primary/10 bg-white p-5 shadow-teal-sm transition hover:-translate-y-1 hover:shadow-teal-md"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">{item.category}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-ink-primary">{item.name}</h3>
                    <p className="mt-2 text-sm text-ink-secondary">{item.short}</p>
                  </Link>
                ))}
              </div>
            </Section>
          ) : null}
        </div>

        <aside className="mt-10 h-fit rounded-[28px] border border-primary/10 bg-white p-6 shadow-teal-sm lg:sticky lg:top-28 lg:mt-0">
          <h2 className="font-heading text-lg font-bold text-ink-primary">Quick Booking Summary</h2>
          <div className="mt-4 rounded-2xl bg-surface-soft p-4">
            <p className="text-sm font-semibold text-ink-primary">{service.name}</p>
            <p className="mt-1 text-sm text-ink-secondary">{service.tagline}</p>
            <p className="mt-3 text-sm font-semibold text-primary">Starting from {service.priceFrom}</p>
          </div>
          <Button
            as={Link}
            to={`/book?service=${encodeURIComponent(service.name)}`}
            variant="primary"
            className="mt-5 w-full justify-center"
          >
            Book {service.name}
          </Button>
          <a href={CLINIC.phoneHref} className="mt-3 block text-center text-sm font-semibold text-primary">
            Call {CLINIC.phone}
          </a>
        </aside>
      </section>
    </>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold text-ink-primary">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
