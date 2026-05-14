import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const stats = [
  { end: 4.9, suffix: '★', label: 'Google rating', decimals: 1 },
  { end: 130, suffix: '+', label: 'Happy patients' },
  { end: 10, suffix: '+', label: 'Years experience' },
  { end: 7, suffix: '', label: 'Days open / week' },
]

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <section ref={ref} className="bg-primary py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:border-r md:border-white/15 md:last:border-0">
            <p className="font-display text-5xl">
              {inView ? <CountUp end={s.end} duration={2.2} decimals={s.decimals || 0} suffix={s.suffix} /> : '0'}
            </p>
            <p className="mt-2 font-label text-xs uppercase tracking-[0.2em] text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
