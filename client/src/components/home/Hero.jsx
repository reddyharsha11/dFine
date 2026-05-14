import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import { Button } from '../ui/Button'
import { api, getErrorMessage } from '../../utils/api'
import { CLINIC, SERVICES, TIME_SLOTS } from '../../utils/constants'

const words = ['Every', 'Smile', 'Matters.']

export function Hero() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(SERVICES[0].name)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(TIME_SLOTS[0])
  const [busy, setBusy] = useState(false)

  async function onQuickBook(event) {
    event.preventDefault()
    if (!name.trim() || !phone.trim() || !date) {
      toast.error('Please fill your name, phone number, and preferred date.')
      return
    }

    setBusy(true)
    try {
      await api.post('appointments', {
        name: name.trim(),
        phone: phone.trim(),
        email: '',
        service,
        date: date.toISOString(),
        timeSlot: slot,
        message: 'Quick booking submitted from the hero section.',
        wantsWhatsApp: true,
      })
      toast.success('Appointment request received. We will call you shortly.')
      setName('')
      setPhone('')
      setDate(null)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not submit your appointment request.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="relative -mt-16 min-h-screen overflow-hidden bg-surface-dark pt-20 lg:-mt-[92px] lg:pt-[92px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,100,58,0.14),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(189,219,209,0.24),transparent_25%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-surface-dark/90 to-primary/35" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 font-label text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Premier Dental Care In Hyderabad
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[0.92] text-white xs:text-6xl md:text-7xl xl:text-[5.3rem]">
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.18 + index * 0.08,
                  duration: 0.55,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={`mr-3 inline-block ${word === 'Matters.' ? 'text-accent' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Expert dental care by <span className="font-semibold text-white">{CLINIC.doctorName}</span>.
            Trusted by families and professionals across Hyderabad for precision-led treatment,
            gentle communication, and premium comfort.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/book" variant="primary" className="!px-7 !py-3">
              Book Appointment
            </Button>
            <Button as={Link} to="/services" variant="secondary">
              Our Services
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span>4.9 star rating</span>
            <span className="text-white/25">|</span>
            <span>130+ reviews</span>
            <span className="text-white/25">|</span>
            <span>7 days open</span>
            <span className="text-white/25">|</span>
            <span>10am-10pm</span>
          </div>
        </div>

        <div className="relative flex flex-col items-center lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="w-full max-w-sm rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-teal-lg backdrop-blur-xl"
          >
            <p className="font-heading text-base font-semibold text-white">Quick Appointment</p>
            <p className="mt-1 text-sm text-white/65">We will call you back within 30 minutes.</p>
            <form onSubmit={onQuickBook} className="mt-4 space-y-3">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
              />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
              />
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
              >
                {SERVICES.map((item) => (
                  <option key={item.slug} value={item.name} className="text-ink-primary">
                    {item.name}
                  </option>
                ))}
                <option value="Other" className="text-ink-primary">
                  Other
                </option>
              </select>
              <DatePicker
                selected={date}
                onChange={setDate}
                minDate={new Date()}
                placeholderText="Choose a date"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
                wrapperClassName="w-full"
              />
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.slice(0, 6).map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSlot(time)}
                    className={`rounded-lg px-2 py-2 text-[11px] font-semibold ${
                      slot === time ? 'bg-accent text-white' : 'bg-white/10 text-white/85 hover:bg-white/15'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-accent py-3 font-heading font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
              >
                {busy ? 'Sending...' : 'Confirm Booking'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
