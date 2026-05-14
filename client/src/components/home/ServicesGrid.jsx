import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlignJustify,
  Gem,
  ScanLine,
  ShieldPlus,
  Sparkles,
  SunMedium,
} from 'lucide-react'
import { SERVICES } from '../../utils/constants'
import { AnimatedSection } from '../ui/AnimatedSection'

const iconMap = {
  Implant: ScanLine,
  Sparkles,
  Aligners: AlignJustify,
  ShieldTooth: ShieldPlus,
  Sun: SunMedium,
  Gem,
  Braces: AlignJustify,
  Stethoscope: ShieldPlus,
}

export function ServicesGrid() {
  return (
    <AnimatedSection className="bg-surface-soft py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our services</p>
          <h2 className="mt-2 font-display text-4xl text-ink-primary">Everything your smile needs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-secondary">
            Boutique hospitality meets clinical rigor, with calm guidance, clear treatment choices,
            and premium restorative and cosmetic care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-teal-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-pale text-primary">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">{service.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-secondary">{service.short}</p>
                <p className="mt-3 text-xs font-semibold text-primary">Starting {service.priceFrom}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-4 font-heading text-sm font-semibold text-primary hover:underline"
                >
                  Learn more →
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
