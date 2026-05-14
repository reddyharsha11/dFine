import { MessageCircle } from 'lucide-react'
import { CLINIC } from '../../utils/constants'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER || CLINIC.whatsappNumber

export function WhatsAppFAB() {
  const href = `https://wa.me/${WA}?text=${encodeURIComponent(
    'Hi dFine Dental, I would like to book an appointment.'
  )}`

  return (
    <div className="fixed bottom-6 right-6 z-[60] hidden sm:flex flex-col items-center gap-2">
      <span className="pointer-events-none absolute inline-flex h-16 w-16 animate-pulse-ring rounded-full bg-[#25D366]/35" />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        title="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-teal-lg transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat with us on WhatsApp</span>
      </a>
      <span className="rounded-full bg-surface-dark px-3 py-1 text-[11px] font-semibold text-white shadow-teal-sm">
        WhatsApp us
      </span>
    </div>
  )
}
