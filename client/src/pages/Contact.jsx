import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { api, getErrorMessage } from '../utils/api'
import { CLINIC, HOME_FAQ, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '../utils/constants'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.union([z.literal(''), z.string().email('Please enter a valid email')]).optional(),
  message: z.string().min(10, 'Please share a little more detail'),
})

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { email: '' } })

  async function onSubmit(values) {
    try {
      await api.post('contact', values)
      toast.success('Message sent. We will get back to you shortly.')
      reset()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">Get In Touch</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Contact dFine Dental</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Reach out for appointments, treatment questions, second opinions, or directions to the
            clinic.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-[28px] border border-primary/10 bg-white p-6 shadow-teal-sm"
        >
          <div>
            <p className="font-heading text-2xl font-bold text-ink-primary">Send us a message</p>
            <p className="mt-2 text-sm text-ink-secondary">
              We usually respond within one business day, often much sooner.
            </p>
          </div>
          <Field label="Name" error={errors.name?.message}>
            <input className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3" {...register('name')} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3" {...register('phone')} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3" {...register('email')} />
          </Field>
          <Field label="Message" error={errors.message?.message}>
            <textarea
              rows={5}
              className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3"
              {...register('message')}
            />
          </Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-accent py-3 font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-primary/10 bg-surface-soft p-6">
            <h2 className="font-heading text-2xl font-bold text-ink-primary">{CLINIC.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-secondary">{CLINIC.address}</p>
            <a href={CLINIC.phoneHref} className="mt-4 block font-semibold text-primary">
              {CLINIC.phone}
            </a>
            <p className="mt-2 text-sm text-ink-secondary">{CLINIC.hoursLabel}</p>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Get Directions
            </a>
          </div>

          <iframe
            src={MAPS_EMBED_URL}
            title="dFine Dental map"
            className="h-[320px] w-full rounded-[28px] border-0 shadow-teal-sm"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="bg-surface-section py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl text-ink-primary">Common questions</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {HOME_FAQ.slice(0, 4).map((faq) => (
              <div key={faq.q} className="rounded-2xl bg-white p-5 shadow-teal-sm">
                <h3 className="font-heading text-lg font-bold text-ink-primary">{faq.q}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
