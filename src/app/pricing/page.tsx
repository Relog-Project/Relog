import { LandingNav } from '@/src/components/layout/landing/landing-nav';
import { LandingFooter } from '@/src/components/layout/landing/landing-footer';
import { PricingSection } from '@/src/features/pricing/components/pricing-section';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main className="pt-16">
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  );
}
