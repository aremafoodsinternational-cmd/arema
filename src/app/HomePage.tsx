'use client';

import HeroSection from '@/components/sections/home/HeroSection';
import FounderSection from '@/components/sections/home/FounderSection';
import GlobalReachSection from '@/components/sections/home/GlobalReachSection';
import WhyAremaSection from '@/components/sections/home/WhyAremaSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import PalakkadSection from '@/components/sections/home/PalakkadSection';
import BlogSection from '@/components/sections/home/BlogSection';
import CTASection from '@/components/sections/home/CTASection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* SECTION 1: HERO */}
      <HeroSection />

      {/* SECTION 2: OUR STORY / FOUNDER */}
      <FounderSection />

      {/* SECTION 3: GLOBAL REACH */}
      <GlobalReachSection />

      {/* SECTION 4: WHY CHOOSE AREMA */}
      <WhyAremaSection />

      {/* SECTION 5: PRODUCTS CAROUSEL */}
      <ProductsSection />

      {/* SECTION 6: THE PALAKKAD ADVANTAGE */}
      <PalakkadSection />

      {/* SECTION 7: INSIGHTS & STORIES / BLOG */}
      <BlogSection />

      {/* SECTION 8: PREMIUM CTA */}
      <CTASection />
    </main>
  );
}
