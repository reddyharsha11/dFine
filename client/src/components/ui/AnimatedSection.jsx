import { motion } from 'framer-motion'

export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.section>
  )
}
