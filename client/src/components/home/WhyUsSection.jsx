import { Microscope, Shield, Award, CalendarCheck } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'

const blocks = [
  {
    title: 'Advanced technology',
    body: 'Digital X-rays, laser-assisted care, and 3D planning when it elevates outcomes.',
    icon: Microscope,
  },
  {
    title: 'Pain-aware treatment',
    body: 'Sedation options, rubber-dam isolation, and pacing that respects your nervous system.',
    icon: Shield,
  },
  {
    title: '10+ years focus',
    body: 'Led by Dr. G. Srujan Kumar — endodontics & aesthetics with transparent consent.',
    icon: Award,
  },
  {
    title: 'Open 7 days',
    body: 'Mon–Sun 10am–10pm with coordinated recall so busy weeks still get a slot.',
    icon: CalendarCheck,
  },
]

export function WhyUsSection() {
  return (
    <AnimatedSection className="bg-surface-section py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary">Why dFine</p>
        <h2 className="mt-2 font-display text-4xl text-ink-primary">Precision that still feels human</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-2xl border-l-4 border-primary bg-white p-6 shadow-teal-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
                <b.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-ink-primary">{b.title}</h3>
                <p className="mt-1 text-sm text-ink-secondary">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
