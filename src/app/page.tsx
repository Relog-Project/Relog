import { FeaturesSection } from '../features/landing/components/features-section';
import { HeroSection } from '../features/landing/components/hero-section';
import { LandingFooter } from '../components/layout/landing/landing-footer';
import { LandingNav } from '../components/layout/landing/landing-nav';

export default function Page() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <LandingFooter />
    </div>
  );
}
