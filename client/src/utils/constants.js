export const CLINIC = {
  name: 'dFine Dental & Health Care',
  shortName: 'dFine',
  tagline: 'Luxury calm. Clinical precision. Modern smile care.',
  doctorName: 'Dr. G. Srujan Kumar',
  doctorTitle: 'Endodontist & Dental Aesthetics Specialist',
  phone: '+91 96663 53426',
  phoneHref: 'tel:+919666353426',
  whatsappNumber: '919666353426',
  email: 'care@dfinedental.com',
  address: '2nd Floor, Arka Jewel, Lanco Hills Road, Khajaguda, Hyderabad',
  hoursLabel: 'Mon-Sun | 10:00 AM - 10:00 PM',
  hours: [
    { day: 'Monday', time: '10:00 AM - 10:00 PM' },
    { day: 'Tuesday', time: '10:00 AM - 10:00 PM' },
    { day: 'Wednesday', time: '10:00 AM - 10:00 PM' },
    { day: 'Thursday', time: '10:00 AM - 10:00 PM' },
    { day: 'Friday', time: '10:00 AM - 10:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 10:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 10:00 PM' },
  ],
}

export const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
]

export const SERVICES = [
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Restorative',
    icon: 'Implant',
    short: 'Permanent tooth replacement with titanium precision.',
    long:
      'Dental implants replace missing tooth roots with biocompatible titanium posts and natural-looking crowns, restoring confidence, bite strength, and facial balance.',
    priceFrom: 'Rs.35,000',
    tagline: 'Stable, aesthetic replacement for missing teeth.',
    for: [
      'Adults missing one or more teeth',
      'Patients seeking a fixed alternative to removable dentures',
      'People wanting better chewing comfort and facial support',
    ],
    steps: [
      'Clinical exam, scans, and digital planning',
      'Implant placement with local anesthesia',
      'Healing and integration with the jawbone',
      'Final crown fitting and maintenance review',
    ],
    expectations: [
      'Treatment is usually planned across multiple visits',
      'Healing windows vary by bone quality and grafting needs',
      'You receive clear home-care and review guidance after placement',
    ],
    faqs: [
      {
        q: 'How long do implants last?',
        a: 'With healthy gums, regular reviews, and good brushing habits, implants can last for many years.',
      },
      {
        q: 'Is implant surgery painful?',
        a: 'Most patients describe it as more comfortable than expected because it is performed under strong local anesthesia with a gentle protocol.',
      },
    ],
  },
  {
    slug: 'smile-designing',
    name: 'Smile Designing',
    category: 'Cosmetic',
    icon: 'Sparkles',
    short: 'Digital smile makeovers crafted to your face.',
    long:
      'Smile designing combines facial analysis, digital planning, and cosmetic dentistry to create a brighter, more balanced smile that still feels like you.',
    priceFrom: 'Rs.18,000',
    tagline: 'A bespoke smile plan shaped around your features.',
    for: [
      'Patients unhappy with spacing, proportions, or uneven edges',
      'People preparing for weddings, photoshoots, or life events',
      'Anyone wanting a guided cosmetic roadmap before treatment',
    ],
    steps: [
      'Consultation with smile goals and references',
      'Photos, scans, and facial proportion planning',
      'Mock-up or staged cosmetic treatment plan',
      'Delivery and refinement of the final result',
    ],
    expectations: [
      'You review the design direction before major treatment begins',
      'Treatment may combine whitening, bonding, veneers, or alignment',
      'The final plan prioritizes natural proportions over artificial brightness',
    ],
    faqs: [
      {
        q: 'Is smile designing only for celebrities?',
        a: 'No. It is a planning-led process that can be scaled from subtle refinements to full cosmetic rehabilitation.',
      },
      {
        q: 'Will my smile look unnatural?',
        a: 'The goal is exactly the opposite: a smile that suits your face, age, and personality.',
      },
    ],
  },
  {
    slug: 'invisible-braces',
    name: 'Invisible Braces',
    category: 'Orthodontics',
    icon: 'Aligners',
    short: 'Clear aligners for a perfect smile, discreetly.',
    long:
      'Invisible braces use a sequence of transparent aligners to move teeth gradually while keeping treatment subtle, comfortable, and easy to fit into busy schedules.',
    priceFrom: 'Rs.65,000',
    tagline: 'Discreet alignment with digital planning and progress tracking.',
    for: [
      'Working professionals who prefer low-visibility treatment',
      'Patients with mild to moderate crowding or spacing',
      'Teens and adults wanting removable orthodontic options',
    ],
    steps: [
      'Digital scan and suitability assessment',
      'Custom aligner series is planned and fabricated',
      'Aligners are changed on schedule with periodic reviews',
      'Refinement and retention phase after active movement',
    ],
    expectations: [
      'Aligners should be worn consistently for best results',
      'Attachments or refinements may be needed in some cases',
      'Retention after treatment is essential to preserve the result',
    ],
    faqs: [
      {
        q: 'Can I remove aligners while eating?',
        a: 'Yes. Remove them for meals and drinks other than water, then clean your teeth before wearing them again.',
      },
      {
        q: 'How often are checkups needed?',
        a: 'Most patients return for planned progress reviews at scheduled intervals rather than very frequent visits.',
      },
    ],
  },
  {
    slug: 'root-canal',
    name: 'Root Canal',
    category: 'Restorative',
    icon: 'ShieldTooth',
    short: 'Pain-aware endodontic treatment with same-day relief focus.',
    long:
      'Root canal treatment removes infection from inside the tooth, relieves pain, and preserves the natural tooth structure instead of extracting it.',
    priceFrom: 'Rs.6,500',
    tagline: 'Save the tooth. Relieve the pain. Keep treatment calm.',
    for: [
      'Teeth with deep decay or nerve infection',
      'Patients with severe sensitivity or swelling',
      'Anyone advised to save a tooth instead of extracting it',
    ],
    steps: [
      'Diagnosis, X-rays, and anesthesia',
      'Cleaning and shaping of infected canals',
      'Disinfection and sealing of the tooth',
      'Final restoration or crown planning',
    ],
    expectations: [
      'Most patients feel pressure rather than pain during treatment',
      'A crown may be recommended afterward for long-term protection',
      'Prompt treatment helps reduce the risk of worsening infection',
    ],
    faqs: [
      {
        q: 'Is root canal painful?',
        a: 'With modern anesthesia and isolation techniques, treatment is usually comparable to having a deep filling done.',
      },
      {
        q: 'Can I go to work after the appointment?',
        a: 'Many patients return to routine activity the same day, depending on pain levels and the complexity of the case.',
      },
    ],
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    icon: 'Sun',
    short: 'Professional whitening for a brighter, polished smile.',
    long:
      'Professional whitening lifts common stains safely under dental supervision and aims for a fresher smile without the uneven look of over-the-counter experiments.',
    priceFrom: 'Rs.8,500',
    tagline: 'Brighter enamel with a controlled, clinic-led protocol.',
    for: [
      'Patients with tea, coffee, or age-related staining',
      'People preparing for an event or photos',
      'Anyone wanting a safer alternative to DIY whitening products',
    ],
    steps: [
      'Shade analysis and suitability check',
      'Gum protection and whitening application',
      'Controlled activation and monitoring',
      'After-care plan for sensitivity and stain prevention',
    ],
    expectations: [
      'Shade improvement varies based on stain type and enamel condition',
      'Some temporary sensitivity can happen',
      'Habits after treatment strongly influence how long results last',
    ],
    faqs: [
      {
        q: 'Is teeth whitening safe?',
        a: 'Yes, when performed under dental supervision with the right concentration and gum protection.',
      },
      {
        q: 'How long do results last?',
        a: 'Results vary by diet and habits, but maintenance visits and stain control can extend them significantly.',
      },
    ],
  },
  {
    slug: 'veneers',
    name: 'Veneers',
    category: 'Cosmetic',
    icon: 'Gem',
    short: 'Porcelain refinement for shape, shade, and symmetry.',
    long:
      'Veneers are thin custom-crafted facings that improve the visible surface of teeth affected by stains, chips, irregular edges, or shape concerns.',
    priceFrom: 'Rs.12,000',
    tagline: 'High-impact cosmetic change with natural-looking detail.',
    for: [
      'Patients with chipped, worn, or uneven front teeth',
      'People seeking long-lasting cosmetic enhancement',
      'Those wanting better proportions without orthodontics alone',
    ],
    steps: [
      'Smile analysis and design planning',
      'Tooth preparation where indicated',
      'Shade matching and veneer fabrication',
      'Trial, bonding, and finishing',
    ],
    expectations: [
      'The design phase is important for natural shape and translucency',
      'Some cases need minimal preparation while others need more structure work',
      'Night protection may be advised if you clench or grind',
    ],
    faqs: [
      {
        q: 'Do veneers look fake?',
        a: 'Not when shape, texture, and shade are planned carefully for your face and age.',
      },
      {
        q: 'Can veneers stain?',
        a: 'Porcelain veneers resist staining well, but surrounding teeth can still change over time.',
      },
    ],
  },
  {
    slug: 'orthodontics',
    name: 'Orthodontics',
    category: 'Orthodontics',
    icon: 'Braces',
    short: 'Braces and bite correction for children, teens, and adults.',
    long:
      'Orthodontics improves crowding, spacing, bite problems, and jaw relationships with treatment options chosen around age, goals, and lifestyle.',
    priceFrom: 'Rs.45,000',
    tagline: 'Structured alignment plans with honest timelines.',
    for: [
      'Children needing early interceptive guidance',
      'Teens and adults with crowding or bite concerns',
      'Patients deciding between braces and aligners',
    ],
    steps: [
      'Records, bite analysis, and treatment discussion',
      'Appliance placement or aligner setup',
      'Scheduled adjustments and progress reviews',
      'Retention plan after active treatment',
    ],
    expectations: [
      'Timelines depend on complexity and consistency',
      'Oral hygiene during treatment is essential',
      'Retention is part of treatment, not an optional extra',
    ],
    faqs: [
      {
        q: 'Are braces only for children?',
        a: 'No. Adults regularly complete orthodontic treatment for function, aesthetics, and bite health.',
      },
      {
        q: 'How do I choose between braces and aligners?',
        a: 'That depends on complexity, discipline with wear, budget, and your cosmetic preference during treatment.',
      },
    ],
  },
  {
    slug: 'general-checkup',
    name: 'General Checkup',
    category: 'General',
    icon: 'Stethoscope',
    short: 'Routine exam, digital records, and a prevention roadmap.',
    long:
      'A general checkup helps catch decay, gum issues, bite wear, and hidden risks early, giving you a practical prevention and treatment plan before problems escalate.',
    priceFrom: 'Rs.800',
    tagline: 'The smartest visit is often the one before something hurts.',
    for: [
      'New patients wanting a baseline oral health review',
      'Families keeping up with preventive dental care',
      'Anyone with sensitivity, bleeding gums, or unexplained discomfort',
    ],
    steps: [
      'History, examination, and symptom discussion',
      'X-rays or images if indicated',
      'Findings explained in plain language',
      'Prevention advice and treatment recommendations',
    ],
    expectations: [
      'You leave with clarity on what needs priority and what can wait',
      'Not every issue needs urgent treatment, and we explain tradeoffs honestly',
      'Regular reviews reduce cost and complexity over time',
    ],
    faqs: [
      {
        q: 'How often should I come for a checkup?',
        a: 'Many patients benefit from 6 to 12 month reviews, though gum health and cavity risk can change that interval.',
      },
      {
        q: 'Do I need X-rays every visit?',
        a: 'Only when clinically useful. Imaging is recommended based on symptoms, history, and findings.',
      },
    ],
  },
]

export const SERVICE_NAMES = SERVICES.map((service) => service.name).concat(['Other'])

export const HOME_FAQ = [
  {
    q: 'How do I book an appointment?',
    a: 'Use the online booking flow, call us directly, or message us on WhatsApp. We usually confirm requests quickly during business hours.',
  },
  {
    q: 'Is teeth whitening safe?',
    a: 'Yes. Professional whitening is planned around your enamel and sensitivity profile and performed with gum protection.',
  },
  {
    q: 'How long does a dental implant take?',
    a: 'Timelines vary, but many implant cases span a few phases across healing and final crown placement. We explain the exact roadmap before starting.',
  },
  {
    q: 'Do you accept walk-ins?',
    a: 'We try to help with same-day needs when possible, but pre-booking gives you a much smoother experience and better slot choice.',
  },
  {
    q: 'What are your consultation charges?',
    a: 'Consultation charges depend on the nature of the visit. We share this clearly when you call or book.',
  },
  {
    q: 'How painful is a root canal at dFine?',
    a: 'Most patients find it far more comfortable than they expected thanks to modern anesthesia and a calm treatment approach.',
  },
  {
    q: 'Do you offer invisible braces?',
    a: 'Yes. We offer clear aligner-based treatment after checking your suitability with records and bite analysis.',
  },
  {
    q: 'Is parking available at the clinic?',
    a: 'Yes, parking options are available near the building and we can share directions with you on WhatsApp.',
  },
]

export const FAQ_HOME = HOME_FAQ

export const WHY_DFINE = [
  {
    title: 'Advanced Technology',
    body: 'Digital planning, modern imaging, and evidence-led treatment decisions for predictable care.',
  },
  {
    title: 'Pain-Aware Dentistry',
    body: 'Gentle communication, comfort-first protocols, and treatment pacing that respects anxious patients.',
  },
  {
    title: 'Doctor-Led Precision',
    body: 'Every major treatment journey is guided by an experienced specialist with a strong aesthetic eye.',
  },
  {
    title: 'Open 7 Days',
    body: 'Extended daily hours make it easier for professionals, families, and urgent care patients to visit.',
  },
]

export const VALUE_PILLARS = [
  {
    title: 'Trust',
    body: 'We explain findings, options, and tradeoffs clearly before treatment starts.',
  },
  {
    title: 'Precision',
    body: 'Details matter, from diagnosis to margins to after-care instructions.',
  },
  {
    title: 'Comfort',
    body: 'A calmer environment and gentle pacing help reduce treatment anxiety.',
  },
  {
    title: 'Care',
    body: 'We aim for long-term oral health, not just one-time procedural output.',
  },
]

export const PARTNERS = ['Invisalign', 'Practo', 'Google Reviews', 'Digital Smile Planning', 'Laser Hygiene']

export const TIMELINE = [
  { year: '2015', text: 'The patient-first clinical vision for dFine began taking shape.' },
  { year: '2018', text: 'Digital workflows and modern preventive systems became core to care delivery.' },
  { year: '2021', text: 'Cosmetic treatment planning and aligner pathways expanded.' },
  { year: '2024', text: 'The clinic sharpened its premium comfort-plus-precision experience.' },
  { year: '2025', text: 'dFine moved toward a full digital patient journey with online booking and content.' },
]

export const RATING_BREAKDOWN = [
  { label: '5 star', value: 85 },
  { label: '4 star', value: 10 },
  { label: '3 star', value: 3 },
  { label: '2 star', value: 1 },
  { label: '1 star', value: 1 },
]

export const MAPS_DIRECTIONS_URL = 'https://maps.app.goo.gl/e3R4BERXmvJhCsnq9'
export const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=dFine+Dental+Khajaguda+Hyderabad&output=embed'

export function getServiceBySlug(slug) {
  return SERVICES.find((service) => service.slug === slug)
}

export function formatIndianDate(value) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
