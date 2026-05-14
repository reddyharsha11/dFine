const logos = ['Invisalign®', 'Practo', 'Google Reviews', 'ADA Standards', 'CareCredit']

export function TrustBar() {
  return (
    <section className="border-y border-primary/10 bg-white py-6">
      <p className="text-center font-label text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
        Trusted by patients from
      </p>
      <div className="group relative mt-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 group-hover:[animation-play-state:paused]">
          {[...logos, ...logos].map((l, i) => (
            <span key={`${l}-${i}`} className="text-lg font-heading font-bold text-ink-primary/40">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
