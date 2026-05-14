const items = [
  'Dental Implants',
  'Smile Designing',
  'Root Canal',
  'Invisible Braces',
  'Teeth Whitening',
  'Veneers',
  'Orthodontics',
  'Cosmetic Dentistry',
]

export function ServicesTicker() {
  const track = [...items, ...items].join(' ✦ ')
  return (
    <div className="bg-primary py-3 text-white">
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-6 text-lg font-heading font-semibold tracking-wide group-hover:[animation-play-state:paused]">
          <span>{track}</span>
          <span>{track}</span>
        </div>
      </div>
    </div>
  )
}
