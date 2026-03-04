import { FeaturesSection } from '../features/landing/components/features-section';
import { HeroSection } from '../features/landing/components/hero-section';
import { LandingFooter } from '../components/layout/landing/landing-footer';
import { LandingNav } from '../components/layout/landing/landing-nav';
import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

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
