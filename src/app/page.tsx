import { FeaturesSection } from "../features/landing/components/features-section";
import { HeroSection } from "../features/landing/components/hero-section";
import { LandingFooter } from "../features/landing/components/landing-footer";
import { LandingNav } from "../features/landing/components/landing-nav";

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
