'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Skip entirely on CMS routes
    if (pathname?.startsWith('/cms')) return;

    // Guard: only run once
    if (hasRun.current) return;

    // Only show once per session
    const alreadySeen = sessionStorage.getItem('arema-preloader-done');
    if (alreadySeen) {
      setActive(false);
      return;
    }

    hasRun.current = true;
    setActive(true);

    // Lock scroll safely
    document.body.style.overflow = 'hidden';

    // 5 SECOND ANIMATION TIMELINE
    const tl = gsap.timeline({
      onComplete: () => {
        if (!containerRef.current) return;
        
        // Slide up animation at the end
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            sessionStorage.setItem('arema-preloader-done', '1');
            setActive(false);
          },
        });
      },
    });

    // 1. Fade in logo immediately
    if (logoRef.current) {
      tl.to(logoRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }
    
    // 2. Fill the progress bar precisely over 5 seconds
    if (progressRef.current) {
      tl.to(progressRef.current, { width: '100%', duration: 5.0, ease: 'linear' }, '-=0.2');
    }
    
    // 3. Fade out logo right before it slides up
    if (logoRef.current) {
      tl.to(logoRef.current, { scale: 0.96, opacity: 0, duration: 0.4, ease: 'power2.in' });
    }

    // FAILSAFE: Ensure overflow is ALWAYS restored if component unmounts early
    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      <div className={styles.centerContent}>
        <div ref={logoRef} className={styles.logoWrap}>
          <Image
            src="/images/logo.png"
            alt="Arema Foods"
            width={100}
            height={100}
            priority
            className={styles.logoImg}
          />
        </div>
        <div className={styles.loaderBarContainer}>
          <div ref={progressRef} className={styles.loaderBarProgress} />
        </div>
      </div>
    </div>
  );
}
