import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'
import IntroVideo from './sections/IntroVideo'
import TrustStats from './sections/TrustStats'
import Testimonials from './sections/Testimonials'
import Problems from './sections/Problems'
import Comparison from './sections/Comparison'
import WebinarAgenda from './sections/WebinarAgenda'
import TargetAudience from './sections/TargetAudience'
import DoctorStoryHighlight from './components/common/DoctorStoryHighlight'
import AboutDoctor from './sections/AboutDoctor'
import Bonuses from './sections/Bonuses'
import RegistrationSteps from './sections/RegistrationSteps'
import Pricing from './sections/Pricing'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './components/layout/Footer'
import StickyCTA from './components/layout/StickyCTA'

export default function App() {
  return (
    <div className="webinar-page relative min-h-screen bg-primary-bg text-primary-text">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <IntroVideo />
      <TrustStats />
      <Testimonials />
      <Problems />
      <DoctorStoryHighlight />
      <Comparison />
      <WebinarAgenda />
      <TargetAudience />
      <AboutDoctor />
      <Bonuses />
      <RegistrationSteps />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </div>
  )
}
