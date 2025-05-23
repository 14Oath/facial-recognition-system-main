import Layout from '../Layout/Layout'
import HeroSection from './Hero'
import FeaturesSection from './Features'
import RegistrationForm from '../Registration/RegistrationForm'
import AboutSection from './About'

export default function Home() {
  return (
     <Layout>
      <HeroSection />
      <FeaturesSection />
      <section id="registration" className="py-16">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-center mb-12 text-3xl font-bold text-primary-dark relative">
            Student Registration
          </h2> */}
          <RegistrationForm />
        </div>
      </section>
      <AboutSection />
    </Layout>
  )
}