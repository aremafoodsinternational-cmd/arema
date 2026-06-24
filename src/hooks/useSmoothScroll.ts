'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef  = useRef<Lenis | null>(null);
  const pathname  = usePathname();

  // ── Init Lenis once on mount ──────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // ── On every route change: scroll Lenis to top and refresh ScrollTrigger ──
  // This prevents the hero from inheriting stale scroll position when
  // navigating from another page back to home.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Immediately jump to top — no smooth animation, so GSAP measures correctly
    lenis.scrollTo(0, { immediate: true });

    // Give the browser one frame to repaint, then refresh all ScrollTriggers
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return lenisRef;
}
