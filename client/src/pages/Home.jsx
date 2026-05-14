import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/home/Hero'
import { TrustBar } from '../components/home/TrustBar'
import { ServicesTicker } from '../components/home/ServicesTicker'
import { ServicesGrid } from '../components/home/ServicesGrid'
import { StatsSection } from '../components/home/StatsSection'
import { WhyUsSection } from '../components/home/WhyUsSection'
import { DoctorSection } from '../components/home/DoctorSection'
import { GalleryPreview } from '../components/home/GalleryPreview'
import { BeforeAfterSection } from '../components/home/BeforeAfterSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { FAQSection } from '../components/home/FAQSection'
import { MapSection } from '../components/home/MapSection'
import { CLINIC } from '../utils/constants'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{CLINIC.name} | Khajaguda, Hyderabad</title>
        <meta
          name="description"
          content="Premium dental care in Hyderabad with online booking, cosmetic dentistry, implants, aligners, whitening, and calm specialist-led treatment."
        />
      </Helmet>
      <Hero />
      <TrustBar />
      <ServicesTicker />
      <ServicesGrid />
      <StatsSection />
      <WhyUsSection />
      <DoctorSection />
      <GalleryPreview />
      <BeforeAfterSection />
      <TestimonialsSection />
      <FAQSection />
      <MapSection />
    </>
  )
}
