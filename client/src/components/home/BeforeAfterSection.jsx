import { useState } from 'react'
import { AnimatedSection } from '../ui/AnimatedSection'

const pairs = [
  {
    before:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80&auto=format&fit=crop',
    after:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&q=80&auto=format&fit=crop',
    label: 'Whitening refresh',
  },
  {
    before:
      'https://images.unsplash.com/photo-1588776814546-1ffcef47235e?w=700&q=80&auto=format&fit=crop',
    after:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=700&q=80&auto=format&fit=crop',
    label: 'Alignment journey',
  },
  {
    before:
      'https://images.unsplash.com/photo-1559591935-cf7c9c4c9b8f?w=700&q=80&auto=format&fit=crop',
    after:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=700&q=80&auto=format&fit=crop',
    label: 'Smile rejuvenation',
  },
]

function Compare({ before, after, label }) {
  const [pct, setPct] = useState(50)
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black shadow-teal-md">
        <img src={after} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
          <img src={before} alt="" className="h-full w-full object-cover" />
        </div>
        <input
          type="range"
          min={5}
          max={95}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="absolute inset-0 z-10 w-full cursor-ew-resize opacity-0"
          aria-label="Drag to compare before and after"
        />
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow"
          style={{ left: `${pct}%` }}
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          After
        </span>
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-ink-primary">{label}</p>
      <p className="text-center text-xs text-ink-muted">Drag the slider across the photo</p>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <AnimatedSection className="bg-surface-section py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center font-display text-4xl text-ink-primary">Smile transformations</h2>
        <p className="mt-2 text-center text-ink-secondary">Drag to compare — illustrative stock pairs.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {pairs.map((p) => (
            <Compare key={p.label} {...p} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
