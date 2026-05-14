import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import { api, getErrorMessage } from '../utils/api'
import { CLINIC, SERVICES, TIME_SLOTS, formatIndianDate } from '../utils/constants'

const step1Schema = z.object({
  service: z.string().min(1, 'Please choose a service'),
})

const step2Schema = z.object({
  date: z.date({ required_error: 'Pick a date' }),
  timeSlot: z.string().min(1, 'Pick a time slot'),
})

const step3Schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.union([z.literal(''), z.string().email('Enter a valid email')]).optional(),
  message: z.string().max(500, 'Please keep your note under 500 characters').optional(),
  wantsWhatsApp: z.boolean().optional(),
})

export default function BookAppointment() {
  const [params] = useSearchParams()
  const preset = params.get('service') || SERVICES[0].name
  const [step, setStep] = useState(1)
  const [picked, setPicked] = useState({ service: preset, date: null, timeSlot: TIME_SLOTS[0] })

  const form1 = useForm({ resolver: zodResolver(step1Schema), defaultValues: { service: preset } })
  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { date: null, timeSlot: TIME_SLOTS[0] },
  })
  const form3 = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: { wantsWhatsApp: true, message: '', email: '' },
  })

  const chosenService = useWatch({ control: form1.control, name: 'service' })
  const chosenDate = useWatch({ control: form2.control, name: 'date' })
  const chosenTime = useWatch({ control: form2.control, name: 'timeSlot' })
  const serviceCards = useMemo(() => SERVICES, [])

  async function submitAll(values) {
    if (!picked.date) {
      toast.error('Please return to step 2 and choose a date.')
      return
    }

    try {
      await api.post('appointments', {
        name: values.name,
        phone: values.phone,
        email: values.email || '',
        service: picked.service,
        date: picked.date.toISOString(),
        timeSlot: picked.timeSlot,
        message: values.message || '',
        wantsWhatsApp: Boolean(values.wantsWhatsApp),
      })
      toast.success('Appointment confirmed. We will call you soon.')
      setStep(4)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment | {CLINIC.shortName}</title>
      </Helmet>

      <section className="bg-surface-dark py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary-light">Book Appointment</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">A smooth 3-step booking flow</h1>
          <p className="mt-3 text-white/70">
            Choose your service, select a date and time, and share your details. We take care of
            the follow-up.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-2 rounded-full bg-white/5 p-1 text-xs font-semibold">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`rounded-full px-3 py-2 ${step >= item ? 'bg-accent text-white' : 'text-white/60'}`}
              >
                Step {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        {step === 1 ? (
          <form
            onSubmit={form1.handleSubmit((values) => {
              setPicked((current) => ({ ...current, service: values.service }))
              setStep(2)
            })}
            className="space-y-5 rounded-[28px] border border-primary/10 bg-white p-6 shadow-teal-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.25em] text-primary">Step 1</p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-ink-primary">Choose Your Service</h2>
              </div>
              <span className="rounded-full bg-accent-light px-4 py-2 text-xs font-bold text-accent">
                {serviceCards.length} available
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {serviceCards.map((service) => (
                <label
                  key={service.slug}
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    chosenService === service.name
                      ? 'border-accent bg-accent-light/40 ring-2 ring-accent/20'
                      : 'border-primary/10 hover:border-primary/30'
                  }`}
                >
                  <input type="radio" value={service.name} className="sr-only" {...form1.register('service')} />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{service.category}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-ink-primary">{service.name}</h3>
                  <p className="mt-2 text-sm text-ink-secondary">{service.short}</p>
                </label>
              ))}
            </div>

            <button type="submit" className="w-full rounded-full bg-accent py-3 font-bold text-white">
              Continue
            </button>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            onSubmit={form2.handleSubmit((values) => {
              setPicked((current) => ({ ...current, date: values.date, timeSlot: values.timeSlot }))
              setStep(3)
            })}
            className="space-y-5 rounded-[28px] border border-primary/10 bg-white p-6 shadow-teal-lg"
          >
            <div>
              <p className="font-label text-xs uppercase tracking-[0.25em] text-primary">Step 2</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink-primary">Pick a Date & Time</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-2xl border border-primary/10 p-3">
                <DatePicker
                  selected={chosenDate}
                  onChange={(value) => form2.setValue('date', value, { shouldValidate: true })}
                  minDate={new Date()}
                  inline
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink-primary">Available time slots</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => form2.setValue('timeSlot', time, { shouldValidate: true })}
                      className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                        chosenTime === time
                          ? 'bg-accent text-white'
                          : 'bg-surface-soft text-ink-primary hover:bg-primary-pale'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {form2.formState.errors.date ? (
                  <p className="mt-3 text-xs text-red-600">{form2.formState.errors.date.message}</p>
                ) : null}
                <input type="hidden" {...form2.register('timeSlot')} />
                {form2.formState.errors.timeSlot ? (
                  <p className="mt-3 text-xs text-red-600">{form2.formState.errors.timeSlot.message}</p>
                ) : null}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" className="flex-1 rounded-full border py-3" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="flex-1 rounded-full bg-accent py-3 font-bold text-white">
                Continue
              </button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <form
            onSubmit={form3.handleSubmit(submitAll)}
            className="space-y-5 rounded-[28px] border border-primary/10 bg-white p-6 shadow-teal-lg"
          >
            <div>
              <p className="font-label text-xs uppercase tracking-[0.25em] text-primary">Step 3</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink-primary">Your Details</h2>
            </div>

            <div className="rounded-2xl bg-surface-soft p-4 text-sm text-ink-secondary">
              <p>
                <strong className="text-ink-primary">Service:</strong> {picked.service}
              </p>
              <p className="mt-1">
                <strong className="text-ink-primary">Date:</strong>{' '}
                {picked.date ? formatIndianDate(picked.date) : '-'}
              </p>
              <p className="mt-1">
                <strong className="text-ink-primary">Time:</strong> {picked.timeSlot}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                placeholder="Full name"
                registration={form3.register('name')}
                error={form3.formState.errors.name?.message}
              />
              <Field
                placeholder="Phone number"
                registration={form3.register('phone')}
                error={form3.formState.errors.phone?.message}
              />
            </div>

            <Field
              placeholder="Email (optional)"
              registration={form3.register('email')}
              error={form3.formState.errors.email?.message}
            />

            <div>
              <textarea
                rows={4}
                placeholder="Special notes (optional)"
                className="w-full rounded-2xl border border-primary/15 px-4 py-3"
                {...form3.register('message')}
              />
              {form3.formState.errors.message ? (
                <p className="mt-1 text-xs text-red-600">{form3.formState.errors.message.message}</p>
              ) : null}
            </div>

            <label className="flex items-center gap-2 text-sm text-ink-secondary">
              <input type="checkbox" {...form3.register('wantsWhatsApp')} />
              Send me reminders on WhatsApp
            </label>

            <div className="flex gap-3">
              <button type="button" className="flex-1 rounded-full border py-3" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="submit" className="flex-1 rounded-full bg-accent py-3 font-bold text-white">
                Confirm Appointment
              </button>
            </div>
          </form>
        ) : null}

        {step === 4 ? (
          <div className="rounded-[28px] border border-primary/15 bg-primary-pale p-10 text-center shadow-teal-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-white">
              ✓
            </div>
            <h2 className="mt-5 font-display text-4xl text-ink-primary">Appointment Confirmed</h2>
            <p className="mt-3 text-ink-secondary">
              Thank you. We will call you at the number you shared to reconfirm availability and
              final timing.
            </p>
          </div>
        ) : null}
      </section>
    </>
  )
}

function Field({ placeholder, registration, error }) {
  return (
    <div>
      <input className="w-full rounded-2xl border border-primary/15 px-4 py-3" placeholder={placeholder} {...registration} />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
