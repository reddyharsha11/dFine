import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FAQ_HOME } from '../../utils/constants'
import { AnimatedSection } from '../ui/AnimatedSection'

export function FAQSection() {
  const [open, setOpen] = useState(0)
  return (
    <AnimatedSection className="bg-surface-soft py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center font-display text-4xl text-ink-primary">Curated questions</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FAQ_HOME.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="rounded-2xl border border-primary/10 bg-white shadow-teal-sm">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span className="font-heading text-sm font-bold text-ink-primary">{item.q}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-pale text-primary">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-primary/10"
                    >
                      <p className="px-4 py-3 text-sm text-ink-secondary">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
